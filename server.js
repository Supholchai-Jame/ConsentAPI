const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
var corsOptions = { origin:'*'};
//const {db} = require("./app/models"); //sync database
//db.sequelize.sync();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);
require("dotenv").config()
let port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});