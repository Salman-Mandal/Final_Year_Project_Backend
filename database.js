const mongoose = require("mongoose");
require("dotenv").config();


function connectdb() {
    const uri = process.env.MONGODB_URI;

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.once("open", () => {
        console.log("Database Connected Successfully");
    });
}

module.exports = connectdb;