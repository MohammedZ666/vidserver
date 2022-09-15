const uploadFile = (req, res) => {
  console.log(req.body, req.file);
};
module.exports = { uploadFile };
