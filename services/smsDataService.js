class SmsDataService {

    constructor() {
        this.builder = require('xmlbuilder');
        this.utf8 = require('utf8');
        this.username='rt-ed';
        this.pass='kitty13';
        this.token='81E10EBB-89BD-4338-9ABB-E2CE3EB56366'
        this.sender='0503309318';
        this.url = 'https://uapi.inforu.co.il/SendMessageXml.ashx?InforuXML=';
        this.unsubscribeURL = 'https://capi.inforu.co.il/api/v2/Contact/GetUnsubscribeList?view=';
    }

    getUnsubscribeList(lastFetchedId,callback) {
        let dt      = new Date();
        let mm      = ''+(dt.getMonth() + 1);
        if (mm.length==1) mm ='0'+mm;
        let dd      = ''+dt.getDate();
        if (dd.length==1) dd ='0'+dd;
        let yyyy    = dt.getFullYear();
        let today   = yyyy + '/' + mm + '/' + dd;
        let unsubscribeRequestJSON = 
        {        
            "Auth": {
                "Username": "rt-ed", 
                "Token": "81E10EBB-89BD-4338-9ABB-E2CE3EB56366"
            },
            "Data": { 
                "FromDate": "2018/01/01", 
                "ToDate": today, 
                "Type": "Phone", 
                "LastFetchedId": lastFetchedId 
            } 
        }
        let unsubscribeRequestJSONtext = JSON.stringify(unsubscribeRequestJSON);
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let req = new XMLHttpRequest();
        req.open("POST", 'https://capi.inforu.co.il/api/v2/Contact/GetUnsubscribeList', true); 
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status >= 200 && req.status <= 300) { 
                    console.log('SMS getUnsubscribeList OK ');
                    callback(req.responseText);
                } else {
                    console.log('SMS getUnsubscribeList Status:' ,req.status);
                    callback(req.status);
                }
            }
        }
        req.send(unsubscribeRequestJSONtext);
    }

    smsText(sms, callback) {
        let message = this.utf8.encode(sms.message);
        let xml = this.builder.create('Inforu') 
            .ele('User')
                .ele('Username')
                    .txt(this.username)
                .up()
                .ele('Password')
                    .txt(this.pass)
                .up()
            .up()
            .ele('Content')
                .att('Type', 'sms')
                .ele('Message')
                    .txt(message)
                .up()
            .up()
            .ele('Recipients')
                .ele('PhoneNumber')
                    .txt(sms.phone_1)
                .up()
            .up()
            .ele('Settings')
                .ele('Sender')
                    .txt(this.sender)
        .end({ pretty: true});
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let req = new XMLHttpRequest();
        req.open("POST", this.url+xml, true); 
        req.setRequestHeader("Content-Type", "application/application/x-www-form-urlencoded; UTF-8");
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status >= 200 && req.status <= 300) { 
                    console.log('SMS Service:',req.responseText);
                    callback(req.responseText);
                } else {
                    console.log(req.status);
                    callback('SMS Service:',req.status);
                }
            }
        }
        req.send(null);
    }
}

module.exports = {
    SmsDataService: SmsDataService
}