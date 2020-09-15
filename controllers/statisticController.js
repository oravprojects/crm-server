//const { Persons } = require('../models/persons');
const { StatisticDataService }  = require('../services/statisticDataService');
const { OfficeGenDataService }  = require('../services/officeGenDataService');

class StatisticController {
    constructor() {
        this.MESSAGE = "qq";
        this.statisticDataService = new StatisticDataService();
        this.officeGenDataService = new OfficeGenDataService();
    }

    leadsJobMaster(req, res) {
        const { body: { interval } } = req;
        console.log("JobMasterLeads",interval);
        this.statisticDataService.leadsJobMaster(interval.intEnd,interval.intStart,(lid)=>{
            return res.json(lid);
        });
    }

    leadsReport(req, res) {
        const { body: { interval } } = req;
        console.log("leadsReport",interval);
        this.statisticDataService.leadsReport(interval.intEnd,interval.intStart,(lid)=>{
            this.officeGenDataService.createLeadsReport(lid, () => {
                return res.json(lid);
            });
        });
    }


    reportInterval(req, res) {
        const { body: { dates } } = req;
        console.log("readProductGroup",dates);
        this.statisticDataService.leads2DatesTable(dates.startDateTime,dates.endDateTime,(lid_table)=>{
            this.statisticDataService.leadsTotal2Dates(dates.startDateTime,dates.endDateTime,(lid_total)=>{
                this.statisticDataService.leadsSRC2Dates(dates.startDateTime,dates.endDateTime,'PPC',(lid_ppc)=>{
                    this.statisticDataService.leadsSRC2Dates(dates.startDateTime,dates.endDateTime,'SNL',(lid_snl)=>{
                        this.statisticDataService.leadsSRC2Dates(dates.startDateTime,dates.endDateTime,'SEO',(lid_seo)=>{
                            this.statisticDataService.app2DatesTable(dates.startDateTime,dates.endDateTime,(app_table)=>{
                                this.statisticDataService.app2DatesStatus(dates.startDateTime,dates.endDateTime,(app_status)=>{
                                    this.statisticDataService.app2DatesUser(dates.startDateTime,dates.endDateTime,(app_user)=>{
                                        this.statisticDataService.app2DatesSource(dates.startDateTime,dates.endDateTime,(app_source)=>{
                                            this.statisticDataService.con2DatesTable(dates.startDateTime,dates.endDateTime,(con_table)=>{
                                                this.statisticDataService.con2DatesUser(dates.startDateTime,dates.endDateTime,(con_user)=>{
                                                    this.statisticDataService.con2DatesSource(dates.startDateTime,dates.endDateTime,(con_source)=>{
                                                        this.statisticDataService.not2DatesTable(dates.startDateTime,dates.endDateTime,(not_table)=>{
                                                            this.statisticDataService.not2DatesSource(dates.startDateTime,dates.endDateTime,(not_source)=>{
                                                                this.statisticDataService.tas2DatesTable(dates.startDateTime,dates.endDateTime,(tas_table)=>{
                                                                    this.statisticDataService.tas2DatesUser(dates.startDateTime,dates.endDateTime,(tas_user)=>{
                                                                        return res.json( 
                                                                            {
                                                                                lid:{
                                                                                    lid_table:lid_table,
                                                                                    lid_total:lid_total,
                                                                                    lid_ppc:lid_ppc,
                                                                                    lid_snl:lid_snl,
                                                                                    lid_seo:lid_seo,
                                                                                },
                                                                                app:{
                                                                                    app_table:app_table,
                                                                                    app_status:app_status,
                                                                                    app_user:app_user,
                                                                                    app_source:app_source,
                                                                                },
                                                                                con:{
                                                                                    con_table:con_table,
                                                                                    con_user:con_user,
                                                                                    con_source:con_source,
                                                                                },
                                                                                not:{
                                                                                    not_table:not_table,
                                                                                    not_source:not_source,
                                                                                },
                                                                                tas:{
                                                                                    tas_table:tas_table,
                                                                                    tas_user:tas_user,
                                                                                },
                                                                            }
                                                                        );
        
                                                                    });
                                                                });   
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    }); 
                                });
                            });
                        });
                    });
                });
            });
        });
    }

}

module.exports = {
    statisticController: new StatisticController ()
}


