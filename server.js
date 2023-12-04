const app = require("./app");
require("dotenv").config();
const connectdb = require("./database");

connectdb();



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})