const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.SAVE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
module.exports = multer({
  storage: storage,
});
