// Module to register an alarm into relational DB
const { constants } = require('../../config');
const { default: axios } = require('axios');
const moment = require('moment');
// POST /alarms
const registerAlarm = async (alarmBody) => {
  let result = null;
  const data = await extractAlarm(alarmBody);
  try {
    const response = await axios.post(
      constants.API_GATEWAY + '/api/Alarms',
      data
    );
    result = response.data;
  } catch (error) {
    console.log('Error');
    console.log(error);
  } finally {
    return result;
  }
};

// prepare body
const extractAlarm = async (body) => {
  let value;
  if (body.alarm == 'LOW_BATTERY') value = body.battery;
  return {
    BraceletId: body.serialNumber,
    Type: body.alarm,
    Value: value ?? null,
    Time: `${moment(parseInt(body.time)).utc(true).format()}`,
  };
};

module.exports = registerAlarm;
