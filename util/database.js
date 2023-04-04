// interface UserAttributes {
//   id: number;
//   name: string;
//   email: string;
// }

// interface UserInstance extends Model<UserAttributes>, UserAttributes {}

// // Define User model
// const User = sequelize.define<UserInstance>('User', {
//   id: {
//     type: DataTypes.INTEGER.UNSIGNED,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
// }, {
//   tableName: 'users',
//   timestamps: true,
//   underscored: true,
// });

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Bhazi:accUp2pXejVm7DGR@cluster0.oludblc.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
