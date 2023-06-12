const mongoose = require("mongoose");
const mong_URI = "mongodb://localhost:27017/inote";

const connectToMongo = () => {
  mongoose.connect(mong_URI)
    .then(console.log("Connected successfully to mongo db."));
};

module.exports = connectToMongo;
