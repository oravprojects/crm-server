const CronJob = require('cron').CronJob;
//const { crudController } = require('../controllers/crudController');


let job_1 = new CronJob('* * * 0-5', () => {
    console.log('Hiiii');
   // crudController.sendMessageAppointmentToday();
}, null, true, 'Asia/Jerusalem');

job_1.start();