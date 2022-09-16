const DataModel = require("./DataModel");
class Series extends DataModel {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.season = data.season;
    this.episode = data.episode;
    this.episodeName = data.episodeName;
    this.dir = `${data.name}/${data.season}/${data.episode}`;
  }
}
module.exports = Series;
