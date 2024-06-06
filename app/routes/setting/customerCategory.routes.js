const { authJwt, rateLimit } = require("../../middleware");
const { query, body, validationResult, param } = require('express-validator');
const controllers = require("../../controllers/setting/customerCategory.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
      next();
    });
    const validateQuery = (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) { return next(); }
      res.status(500).send({ status: "500", message: "พบปัญหาบางประการ กรุณาติดต่อเจ้าหน้าที่" });
    };
    const validateList = [ query('isDeleted').notEmpty().isBoolean(), query('page').notEmpty().isInt(), ];
    const validateId = [ query('id').notEmpty().isInt(), ];
    app.get("/api/vehicle/history");
  };