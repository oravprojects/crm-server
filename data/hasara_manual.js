const schedule = require('node-schedule');
const e = require('../data/DataEvents.js');
const { PersonDataService } = require('../services/personDataService');
const { SmsDataService } = require('../services/smsDataService');
const personDataService = new PersonDataService();
const smsDataService = new SmsDataService();
let HASARA_LIST = [];
let i = 1;
// event listeners
e.on('lastfetched', (n) => {
    if (n>0) {
        console.log(n);
        getUnsubscribeList(n);
    } else {
        console.log('HASARA_LIST :',HASARA_LIST.length);
        updateNoCall(HASARA_LIST[0]);
    }
});
e.on('hasara_w', (n) => {
    if (i<HASARA_LIST.length) {
        updateNoCall(HASARA_LIST[i]);
    }
    i++;
    console.log(n,'=',i)
});
/// Check all unsubscribers
function getUnsubscribeList (lastFetchedIdIn) {
    smsDataService.getUnsubscribeList(lastFetchedIdIn,(data) => {
        let unsubscribeList = JSON.parse(data);
        for (let i=0; i<unsubscribeList.Data.List.length; i++) {
            HASARA_LIST.push(unsubscribeList.Data.List[i])
        }
        e.emit('lastfetched',unsubscribeList.Data.LastFetchedId);
    });
}
/// Update data base
function updateNoCall (record) {
    personDataService.updateNoCall(record,(data)=>{
        e.emit('hasara_w',data);
    });
}
// Run job
console.log('Starting getUnsubscribeList!');
HASARA_LIST = [];
i = 1;
getUnsubscribeList(0);



