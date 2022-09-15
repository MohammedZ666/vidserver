const DataModel = require("./DataModel");
class Movie extends DataModel {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.dir = data.name;
  }
}
module.exports = Movie;
