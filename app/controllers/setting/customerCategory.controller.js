const { db } = require("../../models");
const { common } = require("../../middleware");
const { DATE } = require("sequelize");
const { json } = require("body-parser");
const { table } = require("console");
const sqlString = require("sqlstring");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const Op = db.Sequelize.Op;

exports.getList = async (req,res) => {
    res.status(200).send({ status: "200", message: "ok" });
}