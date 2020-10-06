class WhatsAppService {
    constructor (){
        console.log("hello from whatsapp constructor");
    }
    

    whatsAppMessage(whatsApp, callback) {
        const accountSid = 'AC8f1b58407645f4df360b8aaafe556cca';
        const authToken = '8ce9263b19b34f9dc7ba3758d49a35df';
        const client = require('twilio')(accountSid, authToken);
        
        console.log("send messsage to "+whatsApp.phone_1)
        client.messages
    .create({
        from: 'whatsapp:+12057828801',
        body: whatsApp.message,
        statusCallback: 'http://postb.in/1234abcd',
        to: 'whatsapp:' + whatsApp.phone_1
    })
    .then(message => console.log(message),
    callback(true))
    .catch((error) => {
        console.log('error', error);
        callback(false);
    });
    };
}

module.exports = {
    WhatsAppService: WhatsAppService
}