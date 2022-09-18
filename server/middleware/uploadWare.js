const multer = require("multer");
const fs = require("fs");

const mkdir = (req, file) => {
  let data = req.body;
  let dir = `${process.env.SAVE_DIR}/${data.name}`;
  switch (data.type) {
    case "series":
      dir += `/${data.season}/${data.episode}/${file.originalname}`;
      break;
    case "movie":
      dir += `/${file.originalname}`;
      break;
    default:
      throw Error(`undefined type => ${data.type}`);
  }
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  req.body.dir = dir;
  return req;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    req = mkdir(req, file);
    cb(null, req.body.dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage: storage,
});
