const express = require("express");
const app = express();
const ErrorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");

//Route Exports
const user = require("./routes/userroutes");


app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Route working"
    })
})



//Routes
app.use("/api/v1", user);



app.use(ErrorMiddleware);

module.exports = app;