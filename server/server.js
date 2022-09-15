const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({
  storage: storage,
});
const PORT = 5000;

const app = express();

app.use(express.static(`${__dirname}/view`));

//app.get("/", (req, res) => res.sendFile(`${__dirname}/view/index.html`));

app.post("/submit-file", uploads.single("file"), (req, res) => {
  console.log(req.body);
  res.status(200).redirect("/");
});

app.listen(PORT, () => console.log("Server started at PORT:", PORT));
