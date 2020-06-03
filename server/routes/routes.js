const router = require("express").Router();
const cors = require("cors");
const pool = require("../db/db");
const nodemailer = require("nodemailer");
const Busboy = require("busboy");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

router.use(cors(corsOptions), (req, res, next) => {
  console.log(req.method, req.url);

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});

router.route("/").get(async (req, res) => {
  res.send("home-route");
});

router.route("/jobs").get(async (req, res) => {
  try {
    const getJobs = await pool.query("SELECT * FROM jobs");

    res.json(getJobs.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.route("/jobs").post(async (req, res) => {
  try {
    const { company } = req.body;
    const { title } = req.body;
    const { description } = req.body;
    const { city } = req.body;

    const newJobs = await pool.query(
      "INSERT INTO jobs (company,title,description,city) VALUES($1,$2,$3,$4) RETURNING *",
      [company, title, description, city]
    );
    res.status(200).json(newJobs.rows);
    console.table("posted to database", newJobs.rows);
  } catch (error) {
    console.error(error.message);
  }
});
// var busboy = new Busboy({ headers: req.headers });
// const file = req.file.resume;
// console.log("resume body", file);

// busboy.on("finish", function () {
//   console.log("Upload finished");

//   console.log("resume", file);
// });
// req.pipe(busboy);

router.route("/email").post(upload.single("resume"), async (req, res, next) => {
  try {
    const { fullname } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const resume = req.file;

    if (!resume) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(resume);

    let mailOptions = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: "test",
      text: "test test test",
      attachments: [
        {
          path: "C:/Users/hunte/Desktop/testresume.pdf",
          contentType: "application/pdf",
          content: data,
        },
      ],

      html: `
      <table style="max-width: 700px; width: 100%;">
        <tr>
          <td>
          <h1 style="text-align: center; font-family: Arial; border-bottom: 1px solid black; padding-bottom: 10px; margin-bottom: 20px;">
           Contact Information
          </td>
        </tr>
       
        <tr>
          <td style="font-family: Arial; padding-top: 20px;">
            <span style="font-weight: bold">Name: </span>
            <span>${fullname}</span>
          </td>
        </tr>
        <tr>
          <td style="font-family: Arial; padding-top: 10px;">
            <span style="font-weight: bold">Email: </span>
            <span>${email}</span>
          </td>
        </tr>
         <tr>
          <td style="font-family: Arial; padding-top: 10px;">
            <span style="font-weight: bold">Phone Number #: </span>
            <span>${phone}</span>
          </td>
         
        </tr>
       
        <tr>
        </tr>
      </table>
    `,
    };

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.PROD_EMAIL,
        pass: process.env.PROD_PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        console.log("ID -> ", info.messageId);
        console.log("Sender -> ", email);
        console.log("Receiver -> ", info.envelope.to);
        res.status(200).send("Email Sent", resume, email, fullname);
      } else {
        console.log(error);
        res.status(400).end();
      }
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
