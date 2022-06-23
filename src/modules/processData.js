const { registerData } = require("./registerData");

// Process bracelets data
module.exports.processData = async (data) => {
  if (data.Alarm != null) {
    // TODO : send alarm message to SNS
    // TODO : insert alarm into DB
  }

  data = JSON.parse(data);
  const res = await registerData(data);
  if (res) console.log("Insert went successful!");
};
