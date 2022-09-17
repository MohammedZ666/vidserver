const { get_index, get_file } = require("../controller/mediaController");
const { Router } = require("express");
const router = Router();

router.get("/index", get_index);
router.get("/file", get_file);

module.exports = router;
