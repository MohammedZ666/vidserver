const express = require("express");
const fs = require("fs");
const errorHandler = require("./middleware/errorHandler");
const uploadRoutes = require("./router/uploadRoutes");
const mediaRoutes = require("./router/mediaRoutes");
const app = express();

app.use(express.static(`${__dirname}/view`));

app.use("/upload", uploadRoutes);
app.use("/media", mediaRoutes);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  if (!fs.existsSync(process.env.SAVE_DIR)) {
    fs.mkdirSync(process.env.SAVE_DIR);
    fs.writeFileSync(
      process.env.INDEX_DIR,
      JSON.stringify({ movies: "", series: "" }, null, 2)
    );
  }
  console.log("Server started at PORT:", process.env.PORT);
});
