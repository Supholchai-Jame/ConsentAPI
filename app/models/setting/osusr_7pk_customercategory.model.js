module.exports = (sequelize, Sequelize) => {
    const settingsVehicleBrand = sequelize.define("OSUSR_7PK_CUSTOMERCATEGORY", {
      ID: {type: Sequelize.INTEGER,primaryKey: true, autoIncrement: true },
    }, { timestamps: false });
    return settingsVehicleBrand;
};