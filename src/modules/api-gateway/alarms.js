// Module to register an alarm into relational DB
const { constants } = require('../../config');
const { default: axios } = require('axios');

// POST /alarms
const registerAlarm = async (alarmBody) => {
  let result = null;
  const data = await extractAlarm(alarmBody);
  try {
    const response = await axios(constants.API_GATEWAY + '/api/Alarms', {
      method: 'POST',
      data: data,
    });
    result = response.data;
  } catch (error) {
    console.log(error.data.errors);
  } finally {
    return result;
  }
};

// prepare body
const extractAlarm = async (body) => {
  return {
    BraceletId: body.serialNumber,
    Type: body.type,
    Value: body.value,
    Timestamp: body.time,
  };
};

module.exports = registerAlarm;
