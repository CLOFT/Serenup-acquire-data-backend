const { constants } = require("../config");
const getUsernameByBraceletsId = require("./api-gateway/bracelets");
const getSecureContactsByUsername = require("./api-gateway/userSecureContacts");
const emailService = require("@sendgrid/mail");

emailService.setApiKey(constants.SENDGRID_API_KEY);

// Extract secure contacts emails
const extractContactsEmails = async (secureContacts) =>
    secureContacts.map((c) => c.contactEmail);

// Send alarm message with SNS
const sendAlarm = async (body) => {
    try {
        const username = await getUsernameByBraceletsId(body.serialNumber);

        const secureContacts = await getSecureContactsByUsername(username);

        const link =
            constants.MAPS_SEARCH_LINK + encodeURIComponent(body.position);
        const message = `
<p>Alarm of Fall! You're a secure contact of ${username} </p> 
<p>Tap here to find your friend --> ${link} </p>
    `;

        // Send email alarm

        const email = {
            to: constants.SENDGRID_FROM_EMAIL, // required
            bcc: secureContacts,
            from: constants.SENDGRID_FROM_EMAIL, // verified mail
            subject: "Fall Alarm",
            html: message,
        };

        const response = await emailService.send(email);
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendAlarm;
