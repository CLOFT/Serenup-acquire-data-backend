const { registerData } = require('./registerData');

// Process bracelets data
module.exports.processData = async (data) => {
  if (data.Alarm != null) {
    // TODO : send alarm message to SNS
    // TODO : insert alarm into DB
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
