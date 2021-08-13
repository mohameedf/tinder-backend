const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken);

const send = (from, to, body) => {
  client.messages
    .create({
      body,
      to,
      from,
    })
    .then((message) => console.log(message.sid))
    .done();
};
