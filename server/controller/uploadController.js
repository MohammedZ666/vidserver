const fs = require("fs");
const Movie = require("../model/Movie");
const Series = require("../model/Series");
const indexFile = require(process.env.INDEX_DIR);

const uploadFile = (req, res, next) => {
  const data = req.body;
  let indexTempFile = { ...indexFile };
  console.log("recieved request", req.body);
  try {
    switch (data.type) {
      case "series":
        data.episodeName = req.file.originalname;
        indexTempFile = addNestedKey(indexFile, [
          "series",
          data.name,
          data.season,
          data.episode,
        ]);
        indexTempFile["series"][data.name][data.season][data.episode] =
          new Series(data);
        break;
      case "movie":
        indexTempFile = addNestedKey(indexFile, ["movies", data.name]);
        indexTempFile["movies"][data.name] = new Movie(data);
        break;
      default:
        throw Error(`undefined type ${data.type}`);
    }
    fs.writeFileSync(
      process.env.INDEX_DIR,
      JSON.stringify(indexTempFile, null, 2)
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
    if (fs.existsSync(data.dir))
      fs.rmdirSync(data.dir, { recursive: true, force: true });
    fs.writeFileSync(process.env.INDEX_DIR, JSON.stringify(indexFile, null, 2));
    next(error);
  }
};

const addNestedKey = (object, keys) => {
  let ref = object;
  for (let i = 0; i < keys.length; i++) {
    if (!ref[keys[i]]) ref[keys[i]] = {};
    ref = ref[keys[i]];
  }
  return object;
};

module.exports = { uploadFile };
