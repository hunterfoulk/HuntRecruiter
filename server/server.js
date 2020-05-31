const express = require("express");
const port = 5000;
const app = express();

app.use(express.json());

const recruiterRouter = require("./routes/routes");
app.use("/recruiter", recruiterRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
