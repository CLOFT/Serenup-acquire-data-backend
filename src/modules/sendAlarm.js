const { constants } = require("../config");
const getUsernameByBraceletsId = require("./bracelets");

// Send alarm message to SNS
module.exports.sendAlarm = async (body) => {
  const username = await getUsernameByBraceletsId(body.braceletId);

  // TODO : get secure contacts by username
  const secureContacts = null;
  /* body : 
        {
            BraceletId : "guid",
            Type : "FALL || LOW_BATTERY",
            Value : "int" (only for Battery at the moment),
            SecureContacts : [  // array with contacts' email
                {
                    email : "email",
                },
                ...
            ]
        }   
    */

  // TODO : send alarm message to SNS

};
