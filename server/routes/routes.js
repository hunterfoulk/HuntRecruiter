const router = require("express").Router();
const cors = require("cors");
const pool = require("../db/db");

const corsOptions = {
  origin: "http://localhost:3000",
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

module.exports = router;
