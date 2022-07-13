// Module to register an alarm into relational DB
const { constants } = require('../../config');
const { default: axios } = require('axios');

// POST /alarms
const registerAlarm = async (alarmBody) => {
  let result = null;
  const data = await extractAlarm(alarmBody);
  console.log('Alarms data: ', data);
  try {
    const response = await axios.post(
      constants.API_GATEWAY + '/api/Alarms',
      data
    );
    result = response.data;
  } catch (error) {
    console.log(error.data.errors);
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
    Time: new Date(body.time),
  };
};

module.exports = registerAlarm;
