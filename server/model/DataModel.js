class DataModel {
  constructor(data) {
    Object.keys(data).forEach((key) => {
      if (!data[key]) throw new Error(`Invalid value for ${key}`);
    });
  }
}
module.exports = DataModel;
