const express = require("express");
const uploadRoutes = require("./router/uploadRoutes");
const app = express();

app.use(express.static(`${__dirname}/view`));

app.use("/upload", uploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(process.env.SAVE_DIR);
  console.log("Server started at PORT:", process.env.PORT);
});
