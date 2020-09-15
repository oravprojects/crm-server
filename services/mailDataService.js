
class MailDataService {

    constructor() {
        this.sgMail = require('@sendgrid/mail');
        this.ApiKey = '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'
        this.sgMail.setApiKey(this.ApiKey);
        this.MESSAGE = "CRM mail Service";
        const fs = require("fs");
        const ics = require('ics');
    }

    readFromFile(file) {
        console.log("starting")
        return new Promise((resolve, reject) => {
          fs.readFile(file, function (err, data) {
            if (err) {
              console.log(err);
              reject(err);
            }
            else {
              resolve(data.toString("base64"));
            }
          });
        });
      }

    mailText(mail, callback) {
        const msg = {
            to: mail.email,
            from: 'info@rt-ed.co.il',
            subject: mail.subject,
            text: mail.message,
            html: mail.message
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

    mailHtmlIntro(mail, callback) {
        pathToAttachment = `../client/assets/event.ics`;
        pathToLogo = `../client/assets/logo.png`;
        pathToTree = `../client/assets/tree.png`;
        pathToProg = `../client/assets/prog_chart.png`;
        pathToVideo = `../client/assets/rt_video.png`;
        pathToAuto = `../client/assets/auto.png`;
        pathToDevOps = `../client/assets/dev_ops.png`;
        pathToEmbLin = `../client/assets/emb_lin.png`;
        pathToEmbSys = `../client/assets/emb_sys.png`;
        pathToFullStack = `../client/assets/full_stack.png`;
        pathToMachineLearning = `../client/assets/machL5.jpg`;
        pathToManQa = `../client/assets/manQA2.jpg`;
        pathToQaAuto = `../client/assets/qa_auto.png`;
        pathToRtEmbed = `../client/assets/rt_emb.png`;

        const promises = [
            this.readFromFile(pathToAttachment),
            this.readFromFile(pathToLogo),
            this.readFromFile(pathToTree),
            this.readFromFile(pathToProg),
            this.readFromFile(pathToVideo),
            this.readFromFile(pathToAuto),
            this.readFromFile(pathToDevOps),
            this.readFromFile(pathToEmbLin),
            this.readFromFile(pathToEmbSys),
            this.readFromFile(pathToFullStack),
            this.readFromFile(pathToMachineLearning),
            this.readFromFile(pathToManQa),
            this.readFromFile(pathToQaAuto),
            this.readFromFile(pathToRtEmbed)
          ];
        
          Promise.all(promises).then(result => {
            console.log("Hello");
            attachment = result[0];
            logo = result[1];
            tree = result[2];
            prog = result[3];
            video = result[4];
            auto = result[5];
            devOps = result[6];
            embLin = result[7];
            embSys = result[8];
            fullStack = result[9];
            machineLearning = result[10];
            manQa = result[11];
            qaAuto = result[12];
            rtEmbed = result[13];
        
        
        const msg = {
            to: mail.email,
            from: 'info@rt-ed.co.il',
            subject: mail.subject,
            text: mail.message,
            html:
                '<p style="text-align:center; margin-top:1vw; margin-bottom:1vw"><img alt="logoImage" title="Logo Image" width="100" height="100" src="cid:logo" /></p> ' +
                '<div dir="rtl" style="text-align:right; font-size:1.5vw; max-width: 800px">' +
                '<p style="font-size:3vw; margin-top:1vw; margin-bottom:1vw"> קצת מידע עלינו:</p>' +
                '<p style="margin-top:1vw; margin-bottom:1vw"><span> Real Time Group מורכבת משלוש חטיבות  - בית תוכנה, מרכז הדרכה, השמה ומיקור חוץ.</span></p>' +
                '<p style="text-align:center; margin-top:1vw; margin-bottom:1vw"><img alt="treeImage" width="100%" title="Tree Image" src="cid:tree" /></p> ' +
                '<div style="text-align:center;">' +
                '<table style="width: 100%;"><tbody> ' +
                '<tr>' +
                '<td style="width:33%"><button style="font-size:1vw; height:auto; width:15vw; margin-right:1.5vw" type="button" onclick="window.location.href=\'http://www.rt-dev.com/\'">www.rt-dev.com</button></td>' +
                '<td style="width:33%"><button style="font-size:1vw; height:auto; width:15vw; margin-right:1.5vw" type="button" onclick="window.location.href=\'http://www.rt-ed.co.il/\'">www.rt-ed.co.il</button></td>' +
                '<td style="width:34%"><button style="font-size:1vw; height:auto; width:15vw; margin-left:1.3vw" type="button" onclick="window.location.href=\'http://www.rt-hr.co.il/\'">www.rt-hr.co.il</button></td>' +
                '</tr>' +
                '</tbody></table>' +
                '</div>' +
                '<p style="font-size:3vw; margin-top:1vw; margin-bottom:1vw">מה אנחנו מציעים? שת"פ בהכשרה והשמה להייטק</p>' +
                '<div style="float: right">' +
                '<table><tbody>' +
                '<tr>' +
                '<td style="color: red; width: 30%; vertical-align: top">הכשרה מעשית      – </td>' +
                '<td>הכשרה ברמה הגבוהה ביותר, להעניק לך את הכלים, הידע והניסיון הנדרשים תוך שימוש בפלטפורמות החדישות ביותר.</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="color: red; vertical-align: top">ליווי והשמה בתחום – </td>' +
                '<td>בסיום ההכשרה, חטיבת ההשמה תלווה אותך עד להשמתך בחטיבת הפיתוח של החברה או אחת מלקוחותיה.</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="color: red; vertical-align: top">הכשרה מסובסדת – </td>' +
                '<td>היות ומטרתנו  משותפת (הכשרה מעשית והשמתך בהייטק) מחירי הקורסים מסובסדים ובנוסף מוענקות מלגות למצטיינים בתהליך המיון.</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="color: red; vertical-align: top">מעל 12 שנות נסיון – </td>' +
                '<td>Rt Group קיימת משנת 2007, מאות בוגרים (מעל 85% מהבוגרים) התקבלו למשרת חלומותיהם בחברות הייטק מובילות בארץ ובעולם.</td>' +
                '</tr>' +
                '</tbody></table>' +
                '</div >' +
                '<br/>' +
                '<br/>' +
                '<div>' +
                '<table><tbody>' +
                '<tr> ' +
                '<td style="width: 70%"><span style="color: red">מבחן מיון</span> – המועמד יעבור מבחן מיון בכדי לוודא את התאמתו למסלול הלימודים הרצוי.</td> ' +
                '<td rowspan="4"><img alt="progChart" title="Prog Chart" src="cid:prog" height="400px"/></td> ' +
                '</tr> ' +
                '<tr> ' +
                '<td><span style="color: red">פגישת ייעוץ</span> – המועמד ייפגש עם יועץ לימודים, אשר יציע לו את המסלול המתאים לו ביותר ע"פ מבחן המיון, הרקע ויכולתו להשתלב בתעשייה.</td> ' +
                '</tr> ' +
                '<tr> ' +
                '<td><span style="color: red">מסלול הכשרה</span> – מסלול לימודים מעשי אשר מטרתו להעניק לך את הידע, הכלים והניסיון הנדרשים בתעשייה.</td> ' +
                '</tr> ' +
                '<tr> ' +
                '<td><span style="color: red">סטאז מעשי</span> – שילוב המועמד בפרויקטים אמיתיים מהתעשייה בחטיבת הפיתוח של החברה או אצל לקוחותיה לצורך לרכישת ניסיון מעשי בתחום.</td> ' +
                '</tr> ' +
                '</tbody></table> ' +
                '</div> ' +
                '<p style="font-size:3vw; text-align:center; margin-top:1vw; margin-bottom:1vw">הקליקו לצפייה בסרטון הכרות 😊</p>' +
                '<p style="text-align:center; margin-top:1vw; margin-bottom:1vw"><a href="https://youtu.be/OR2w6qWJzs4"><img alt="videoImage" title="Video Image" width="100%" src="cid:video" /></a></p>' +
                '<p style="font-size:3vw; text-align:center; margin-top:1vw; margin-bottom:1vw">להלן מסלולי ההכשרה והשמה הקרובים</p>' +
                '<div style="text-align:center;">' +
                '<table><tbody> ' +
                '<tr> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/2l7f130qesk-test.htm"><img alt="RtEmbed" title="RT Embedded" src="cid:rtEmbed" width="60%" /></a></td> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/2l7f130qesk-test.htm"><img alt="EmbedLin" title="Embedded Linux" src="cid:embLin" width="60%" /></a></td> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/5dga3wz3q04-test.htm"><img alt="EmbedSys" title="Embedded Sys" src="cid:embSys" width="60%" /></a></td> ' +
                '</tr> ' +
                '<tr> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/333hncz6mas-test.htm"><img alt="qaAuto" title="qaAuto" src="cid:qaAuto" width="60%" /></a></td> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/45w3qdfecf8-test.htm"><img alt="manQa" title="manQa" src="cid:manQa" width="60%" /></a></td> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/5rv848bqrms-test.htm"><img alt="auto" title="auto" src="cid:auto" width="60%" /></a></td> ' +
                '</tr> ' +
                '<tr> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/3gia1itdw84-test.htm"><img alt="machine" title="machine" src="cid:machineLearning" width="60%" /></a></td> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/4hcpgl9t4kk-test.htm"><img alt="FS" title="FS" src="cid:fullStack" width="60%" /></a></td> ' +
                '<td><a href="http://uclicks.inforumobilemail.com/6ba8oiw7n8k-test.htm"><img alt="devOps" title="devOps" src="cid:devOps" width="60%" /></a></td> ' +
                '</tr> ' +
                '</tbody></table> ' +
                '</div> ' +
                '<p style="font-size:3vw; text-align:center; margin-top:1vw; margin-bottom:1vw">בואו ללמוד ולעבוד איתנו</p>' +
                '<p style="text-align:center; margin-top:1vw; margin-bottom:1vw">' +
                '<a style="background-color: #1c87c9; border: none; color: white; padding: 20px 34px;' +
                'text-align: center; text-decoration: none; display: inline-block;  font-size: 20px;' +
                'margin: 4px 2px; cursor: pointer;" href="http://uclicks.inforumobilemail.com/6ry06le2esk-test.htm">לפרטים נוספים הקליקו למעבר לאתר שלנו</a></p>' +
                '<b>' +
                mail.message +
                '<div>',
            attachments: [
                {
                    content: logo,
                    content_id: "logo",
                    filename: "logo.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: tree,
                    content_id: "tree",
                    filename: "tree.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: prog,
                    content_id: "prog",
                    filename: "prog_chart.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: video,
                    content_id: "video",
                    filename: "rt_video.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: auto,
                    content_id: "auto",
                    filename: "auto.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: devOps,
                    content_id: "devOps",
                    filename: "dev_ops.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: embLin,
                    content_id: "embLin",
                    filename: "emb_lin.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: embSys,
                    content_id: "embSys",
                    filename: "emb_sys.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: fullStack,
                    content_id: "fullStack",
                    filename: "full_stack.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: machineLearning,
                    content_id: "machineLearning",
                    filename: "machL5.jpg",
                    type: "img/jpg",
                    disposition: "inline"
                },
                {
                    content: manQa,
                    content_id: "manQa",
                    filename: "manQA2.jpg",
                    type: "img/jpg",
                    disposition: "inline"
                },
                {
                    content: qaAuto,
                    content_id: "qaAuto",
                    filename: "qa_auto.png",
                    type: "img/png",
                    disposition: "inline"
                },
                {
                    content: rtEmbed,
                    content_id: "rtEmbed",
                    filename: "rt_emb.png",
                    type: "img/png",
                    disposition: "inline"
                }
            ]

        };
        this.sgMail.send(msg)
            .then(() => {
                console.log('mail sent')
                callback(true);
            }).catch((error) => {
                console.log('error', error);
                callback(false);
            });
        });
    }

    mailMeeting(mail, callback) {
        pathToAppointment = `..client/assets/meeting.ics`;
       
        const promises = [
            this.readFromFile(pathToAppointment),
        ];
        
          Promise.all(promises).then(result => {
            appointment = result[0];
        
        
        const msg = {
            to: mail.email,
            from: 'info@rt-ed.co.il',
            subject: mail.subject,
            text: mail.message,
            html: mail.message,
            attachments: [
                {
                    content: appointment,
                    filename: "meeting.ics",
                    type: "text/calendar",
                    disposition: "attachment"
                }
            ]
        };
        this.sgMail.send(msg)
            .then(() => {
                console.log('mail sent')
                callback(true);
            }).catch((error) => {
                console.log('error', error);
                callback(false);
            });
        });
    }

    addCalFile (mail, callback) {
        var year = mail.date.getFullYear();
        var month = mail.date.getMonth() + 1;
        var day = mail.date.getDate();
        var startHour = mail.date.getHours();
        var startMinutes = mail.date.getMinutes();;
    
        var title = mail.subject;
        var description = mail.message;
        var location = mail.location;
        var recipient = mail.recipient;
        var subject = mail.subject
        var html = mail.message;
        var organizer = mail.organizer;
        var organizerEmail = mail.organizerEmail;
    
        console.log("year ==========", year);
        console.log("month ==========", month);
        console.log("day ==========", day);
        console.log("start hour ==========", startHour);
        console.log("start minutes ==========", startMinutes);
        console.log("title ==========", title);
        console.log("description ==========", description);
        console.log("location ==========", location);
        console.log("recipient ==========", recipient);
        console.log("subject ==========", subject);
        console.log("html ==========", html);
        console.log("organizer ==========", organizer);
        console.log("organizer's Email ==========", organizerEmail);
    
    
        const event = {
            start: [year, month, day, startHour, startMinutes],
            startInputType: "local",
            startOutputType: "local",
            duration: { minutes: 30 },
            title: title,
            description: description,
            location: location,
            organizer: { name: organizer, email: organizerEmail }
        }
    
        ics.createEvent(event, (error, value) => {
            if (error) {
                console.log(error)
                return
            }
            fs.writeFile(`uploads/${filename}.ics`, value, function(err) {
          // If an error occurred, show it and return
          if(err) return console.error(err);
          // Successfully wrote to the file!
          console.log(value);
          this.mailMeeting(mail, callback);
        });
        });
    };    
}


module.exports = {
    MailDataService: MailDataService
}
