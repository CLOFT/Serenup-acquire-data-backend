// Module to register an alarm into relational DB
const { constants } = require('../../config');
const { default: axios } = require('axios');

// POST /alarms
const registerAlarm = async (alarmBody) => {
  let result = null;
  try {
    const response = await axios(constants.API_GATEWAY + '/api/Alarms', {
      method: 'POST',
      data: alarmBody,
    });
    result = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

module.exports = registerAlarm;
