const { db } = require("../../models");
const { common } = require("../../middleware");
const { DATE } = require("sequelize");
const { json } = require("body-parser");
const { table } = require("console");
const sqlString = require("sqlstring");
const moment = require("moment");


exports.getCustomerCategoryList = async (req,res) => {
    res.status(200).send({ status: "200", message: "ok" });
}