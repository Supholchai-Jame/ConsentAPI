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
const covertCurrency = (data) => {
  const dataCurrency = Number(data).toLocaleString('th-TH', {style: 'currency',currency: 'THB'}).replace('฿', '');
  return dataCurrency;
};
const covertCurrencyZeroDigit = (data) => {
  const dataCurrency = Number(data).toLocaleString('th-TH', {style: 'currency',currency: 'THB', minimumFractionDigits: 0}).replace('฿', '');
  return dataCurrency;
};
const commonMiddleware = {
  getUID : getUID, getUName : getUName, getEmployeeId : getEmployeeId, apiCurrency : covertCurrency, apiCurrencyZero : covertCurrencyZeroDigit, 
  getRegionName : getRegionName,
};
module.exports = commonMiddleware;