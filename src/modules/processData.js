const { registerData } = require('./registerData');
const sendAlarm = require('./sendAlarm');

// Process bracelets data
const processData = async (data) => {
  try {
  } catch (error) {
    console.log(error);
  }
  if (data.Alarm != null) {
    // TODO : send alarm message to SNS
    const res = await sendAlarm(data);
  }

  try {
    data = JSON.parse(data);
    const res = await registerData(data);
    if (res) {
      console.log('Insert went successful!');
      return {
        statusCode: 200,
        message: 'Data successfully registered!',
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = processData;
