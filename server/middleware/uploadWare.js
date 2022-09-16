const multer = require("multer");
const fs = require("fs");

const mkdir = (req) => {
  let data = req.body;
  let dir = "";
  switch (data.type) {
    case "series":
      dir = `${process.env.SAVE_DIR}/${data.name}/${data.season}/${data.episode}`;
      break;
    case "movie":
      dir = `${process.env.SAVE_DIR}/${data.name}`;
    default:
      throw Error(`undefined type ${data.type}`);
  }
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  req.body.dir = dir;
  return req;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    req = mkdir(req);
    cb(null, req.body.dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage: storage,
});
