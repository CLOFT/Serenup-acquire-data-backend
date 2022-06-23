// Send alarm message to SNS
module.exports.sendAlarm = async (body) => {
  // TODO : send alarm message to SNS
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
};
