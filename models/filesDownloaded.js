const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const FilesDownloaded = sequelize.define("FilesDownloaded", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  linkURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = FilesDownloaded;
