const { constants } = require('../config');
const getUsernameByBraceletsId = require('./api-gateway/bracelets');
const {
  getSecureContactsByUsername,
} = require('./api-gateway/userSecureContacts');
const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'eu-west-1' });

// Extract secure contacts emails
const extractContactsEmails = async (secureContacts) =>
  secureContacts.map((c) => c.contactEmail);

// Send alarm message with SNS
const sendAlarm = async (body) => {
  try {
    const username = await getUsernameByBraceletsId(body.braceletId);

    const secureContacts = await getSecureContactsByUsername(username);

    const link = constants.MAPS_SEARCH_LINK + encodeURIComponent(body.position);
    const message = `
    Alarm of Fall! You're a secure contact of ${username} 
    Tap here to find your friend --> ${link}
    `;

    // Create SNS body
    var params = {
      Message: message /* required */,
      Subject: 'Fall Alarm',
      TopicArn: constants.TOPIC_ARN,
    };

    // Send email alarm
    const response = await sns.publish(params).promise();
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendAlarm;
