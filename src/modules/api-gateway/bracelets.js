const { default: axios } = require('axios');
const { constants } = require('../../config');

// Get username by BraceletId
const getUsernameByBraceletId = async (braceletId) => {
  let result = null;
  try {
    const response = await axios(
      constants.API_GATEWAY + `/Bracelets/${braceletId}`
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

module.exports = getUsernameByBraceletId;
