module.exports = (sequelize, Sequelize) => {
    const settingsVehicleBrand = sequelize.define("OSUSR_7PK_CUSTOMERCATEGORY", {
      ID: {type: Sequelize.INTEGER,primaryKey: true, autoIncrement: true },
      ADDCUSTOMERCATEGORYID: {type: Sequelize.BIGINT},
      CONSENTID: {type: Sequelize.BIGINT},
      ISACTIVE: {type: Sequelize.BOOLEAN},
      ISDELETED: {type: Sequelize.BOOLEAN},
      DESCRIPTION: {type: Sequelize.STRING(250)},
      CREATORID: {type: Sequelize.BIGINT},
      CREATORNAME: {type: Sequelize.STRING(250)},
      CREATEDDATE: {type: Sequelize.DATE},
      MODIFIEDID: {type: Sequelize.BIGINT},
      MODIFIEDNAME: {type: Sequelize.STRING(250)},
      MODIFIEDDATE: {type: Sequelize.DATE},
      DELETEDID: {type: Sequelize.BIGINT},
      DELETEDNAME: {type: Sequelize.STRING(250)},
      DELETEDDATE: {type: Sequelize.DATE}
    }, { timestamps: false });
    return settingsVehicleBrand;
};