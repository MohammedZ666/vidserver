const fs = require("fs");
const Movie = require("../model/Movie");
const Series = require("../model/Series");
const indexFile = require(process.env.INDEX_DIR);

const uploadFile = (req, res, next) => {
  const data = req.body;
  const indexTempFile = { ...indexFile };
  try {
    switch (data.type) {
      case "series":
        data.episodeName = file.originalname;
        indexTempFile["series"][data.name][data.season][data.episode] =
          new Series(data);
        break;
      case "movie":
        indexTempFile["movie"][data.name] = new Movie(data);
        break;
      default:
        throw Error(`undefined type ${data.type}`);
    }
    fs.writeFileSync(
      process.env.INDEX_DIR,
      JSON.stringify(indexTempFile, null, 2)
    );
  } catch (error) {
    if (fs.existsSync(data.dir)) fs.unlinkSync(data.dir);
    fs.writeFileSync(process.env.INDEX_DIR, JSON.stringify(indexFile, null, 2));
    next(error);
  }
};
module.exports = { uploadFile };
