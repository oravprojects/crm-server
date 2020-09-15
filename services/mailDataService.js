class MailDataService {

    constructor() {
        this.sgMail = require('@sendgrid/mail');
        this.ApiKey = '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'
        this.sgMail.setApiKey(this.ApiKey);
        this.MESSAGE = "CRM mail Service";
        
    }
    mailText(mail, callback) {
        const msg = {
          to: mail.email,
          from: 'info@rt-ed.co.il',
          subject: mail.subject,
          text: mail.message,
          html: mail.message,
        };
        this.sgMail.send(msg)
        .then(() => {
            console.log('mail sent')
            callback(true);
        }).catch((error) => {
            console.log('error', error);
            callback(false);
        });
    }
}
module.exports = {
    MailDataService: MailDataService
}
