const { Router } = require("express");
const { uploadFile } = require("../controller/uploadController");
const upload = require("../middleware/uploadWare");
const router = Router();

router.post("/file", upload.single("file"), uploadFile);

module.exports = router;
