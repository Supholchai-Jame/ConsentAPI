const { authJwt, rateLimit } = require("../../middleware");
const { query, body, validationResult, param } = require('express-validator');
const customerCategory = require("../../controllers/setting/customerCategory.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
      next();
    });
    app.get("/api/setting/customerCategory/list",[authJwt.verifyToken],customerCategory.getCustomerCategoryList);
  };