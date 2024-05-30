const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config()
let port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});