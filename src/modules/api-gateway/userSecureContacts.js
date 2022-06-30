const { default: axios } = require('axios');
const { constants } = require('../../config');

// TODO : implement module to get secure contacts from RDS by username
const getSecureContactsByUsername = async (username) => {
  let result = null;
  // GET /user-secure-contacts , parameters : {username}
  try {
    const response = await axios.get(
      constants.API_GATEWAY + `/api/UsersSecureContacts/${username}`
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

module.exports = getSecureContactsByUsername;
