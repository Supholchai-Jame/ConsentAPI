const { db } = require("../../app/models");
const axios = require('axios');
const moment = require("moment");
const getUID = (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const users = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  return users["id"];
};
const getUName = async (req,id)=>{
  const token = req.headers["authorization"].replace("Bearer ", "");
  const url = "http://trgapi.thairunggroup.co.th/api/user/detail?id=" + id;
  const config = { headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'} };
  try {
    const response = await axios.get(url,config)
    return "คุณ" + response.data['firstnameTh'] + " " + response.data['lastnameTh']
  } catch (error) {
    console.error(error);
  }
}
const getEmployeeId = async (req,id)=>{
  const token = req.headers["authorization"].replace("Bearer ", "");
  const url = "http://trgapi.thairunggroup.co.th/api/user/detail?id=" + id;
  const config = { headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'} };
  try {
    const response = await axios.get(url,config)
    return response.data['employeeid']
  } catch (error) {
    console.error(error);
  }
}
const getRegionName = async (req,id)=>{
  const token = req.headers["authorization"].replace("Bearer ", "");
  const url = "http://trgapi.thairunggroup.co.th/api/region/name?id=" + id;
  const config = { headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'} };
  try {
    const response = await axios.get(url,config)
    return response.data['regionName'];
  } catch (error) {
    console.error(error);
  }
}
const getProvinceName = async (ID)=>{
  const id =  [...ID.split(',').map(Number)];
  var condition = { id: {[Op_.in]:id}};
  const handleError = () => {
    res.status(500).send({ status: "500", message: "Some error occurred while retrieve data." });
  }
  return await Province.findAll({attributes: ["id", "provinceNameTh"], where: condition})
    .then((data) => {
      if(data.length>0){
        const jsonData = data;
        const Data = [];
        for (var i in jsonData) {
          Data[i] = {
            provinceName: jsonData[i].provinceNameTh,
          };
        }
        return Data;
      } else {
        handleError();
      }
    })
    .catch(() => {
      handleError();
    });
}
const covertCurrency = (data) => {
  const dataCurrency = Number(data).toLocaleString('th-TH', {style: 'currency',currency: 'THB'}).replace('฿', '');
  return dataCurrency;
};
const covertCurrencyZeroDigit = (data) => {
  const dataCurrency = Number(data).toLocaleString('th-TH', {style: 'currency',currency: 'THB', minimumFractionDigits: 0}).replace('฿', '');
  return dataCurrency;
};
const getPlateNumber = async (id)=>{
  const handleError = () => {
    res.status(500).send({
      status: "500",
      message: "พบปัญหาบางประการ กรุณาติดต่อผู้ดูแลระบบ",
    });
  };
  try {
    const plateNumberData = await db.sequelize.query(
      "SELECT V.ID, V.CHASSISNUMBER, V.PLATENUMBER, TP.PLATENUMBER AS PLATENUMBER2, VRP.REMARK, V.TEMPORARYPLATEID, V.CLASS, V.BRAND, V.MODEL, V.TYPE, V.SERIES, V.COLOR, "+
        "V.MILEGES, V.OWNERFLEET, V.CURRENTFLEET, V.PARKING, V.OPERATIONSTATUS, V.SERVICENAME, V.INCIDENTNUMBER, V.CUSTOMERNAME, V.CONTRACTNUMBER, V.CONTRACTSTART, V.CONTRACTEND "+
        "FROM OSUSR_4UL_VEHICLE V LEFT JOIN OSUSR_4UL_TEMPORARYPLATEHISTORY2 TPH ON TPH.ID = V.TEMPORARYPLATEID AND TPH.ISEND = False "+
        "LEFT JOIN OSUSR_4UL_TEMPORARYPLATE2 TP ON TP.ID = TPH.TEMPORARYPLATEID LEFT JOIN OSUSR_4UL_VEHICLEREMARKPLATENUMBER VRP ON VRP.VEHICLEID = V.ID "+
        "WHERE V.ID = "+ id +" ORDER BY ID DESC",{ type: db.Sequelize.QueryTypes.SELECT }
      ).then((data)=>{
        const jsonData = data;
        var plateNumbers = "";
        if(jsonData[0]["TEMPORARYPLATEID"]==''){
          if(jsonData[0]["REMARK"]==''){
            plateNumbers = "("  + jsonData[i]["REMARK"] + ")";
          } else{
            if(jsonData[0]["PLATENUMBER2"]==null){
              plateNumbers = "(รอดำเนินการ)";
            } else {
              plateNumbers = jsonData[0]["PLATENUMBER2"] + "(ป้ายแดง)";
            }
          }
        } else {
          if(jsonData[0]["PLATENUMBER"]==''){
            if(jsonData[0]["PLATENUMBER2"]==null){
              plateNumbers = "(รอดำเนินการ)";
            } else {
              plateNumbers = jsonData[0]["PLATENUMBER2"] + "(ป้ายแดง)";
            }
          } else {
            plateNumbers = jsonData[0]["PLATENUMBER"];
          }
        }
        if(data.length>0){
          return plateNumbers;
        } else {
          const plateNumbers =[{plateNumbers:"-"}];
          return plateNumbers;
        };
      }).catch(() => {
        handleError();
      });
      return plateNumberData
  } catch (error) {
    console.error(error);
  }
}
const getVehiclePicture = async ()=>{
  spauth.getAuth(url, {
      username: username,
      password: password,
    })
    .then((options) => {
      const folderPath = '/sites/Outsystems/Shared Documents/01-TVP/02-VEHICLE PHOTO';
      const imageName = '00-1.jpg';
      const apiUrl = `${url}/_api/web/GetFileByServerRelativePath(decodedurl='${folderPath}/${imageName}')/$value`;
      axios.get(apiUrl, options)
      .then((response) => {
        console.log('Image retrieved successfully');
        const imageUrl = `${url}/_layouts/15/getpreview.ashx?path=/sites/Outsystems/Shared Documents/01-TVP/02-VEHICLE PHOTO/${imageName}`;
        console.log(imageUrl);

        return response.data
      })
      .catch((err) => {
        console.error('Error retrieving image', err);
      });
    })
    .catch((err) => {
      console.error('Error authenticating with SharePoint', err);
    });
}
const getOrganizationInfo = async (id)=>{
  const url = "https://openapi.dbd.go.th/api/v1/juristic_person/" + id;
  try {
    const response = await axios.get(url);

    return response['data'];
  } catch (error) {
    console.error(error);
  }
}
const getRunningNo = async (process, prefix, isMonth, companyBu) => {
  const year = moment().year();
  const yr = moment().format('YY');
  const month = moment().format('MM');
  const varMonth = "";
  if(isMonth === true) {
      varMonth = " AND MONTH = '" + month + "' "
  };
  const handleError = () => {
    res.status(500).send({ status: "500", message: "เกิดข้อผิดพลาดบางประการ กรุณาติดต่อผู้ดูแลระบบ" });
  }
  const runningData = await db.sequelize
    .query("SELECT ID, PREFIX, RUNNINGNO FROM OSUSR_4UL_MASTERRUNNINGNUMBER " +
      "WHERE PROCESS = '" + process + "' AND YEAR = " + year + " AND COMPANYBU = '" + companyBu + "' " + varMonth + " ORDER BY RUNNINGNO DESC" ,{ type: db.Sequelize.QueryTypes.SELECT })
      .then((data) => {
        const runningNo0 = Number(data[0].RUNNINGNO)?Number(data[0].RUNNINGNO + 1):"-";
        const runningList = {
          "runningNo" : runningNo0,
          "runningNumber" : data[0].PREFIX + yr + "-" + String(runningNo0).padStart(5, '0'),
        };
        return runningList
      })
      .catch(() => {
        const runningNo0 = 1;
        const runningList = {
          "runningNo" : runningNo0,
          "runningNumber" : prefix + yr + "-" + String(runningNo0).padStart(5, '0'),
        };
        return runningList//"Not Found"
      });
    return runningData
}
const commonMiddleware = {
  getUID : getUID, getUName : getUName, getEmployeeId : getEmployeeId, apiCurrency : covertCurrency, apiCurrencyZero : covertCurrencyZeroDigit, 
  getRegionName : getRegionName, getProvinceName : getProvinceName, getPlateNumber : getPlateNumber, getVehiclePicture : getVehiclePicture, getRunningNo : getRunningNo,
};
module.exports = commonMiddleware;