const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(404).json({ err: err });
  }
  next();
};
module.exports = errorHandler;
