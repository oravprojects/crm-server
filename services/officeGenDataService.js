class OfficeGenDataService {
    constructor() {
        this.moment = require("moment");
        this.officegen = require('officegen');
        this.fs = require('fs');
        this.path = require('path');
        this._file_dirname = '../client/files/';
    }

        
    createLeadsReport(report, callback) {
      
      //console.log(report);
      //console.log(courses);
      //console.log(courses.length);
      // Create an empty Word object:
      let xlsx = this.officegen('xlsx')
      // Officegen calling this function after finishing to generate the docx document:
      xlsx.on('finalize', function(written) {
          console.log('Finish to create a Microsoft Word document.');
          callback(written);
      })
      // Officegen calling this function to report errors:
      xlsx.on('error', function(err) {
          console.log(err)
      })
      // Report content
      let sheet = xlsx.makeNewSheet()
      sheet.name = 'Officegen Excel'

      for (let i=0; i<report.length; i++) {
        let j=0
        sheet.data[i] = []
        console.log(report[i])
        for (let key in report[i] ) {
          console.log(report[i][key],i,j);
          if (report[i][key] !== null) sheet.data[i][j] = report[i][key]
          else sheet.data[i][j] ='';
          j++;
        }
       
      }


      // Let's generate the Word document into a file:
      //console.log(contract);
      let path_urs = this.path.join(__dirname, this._file_dirname);
      if (!this.fs.existsSync(path_urs+"lead_report")){
        this.fs.mkdirSync(path_urs+"lead_report");
      }
      path_urs = this.path.join(__dirname, this._file_dirname,"lead_report",'/');
      let file_name = path_urs+'lead_report.xlsx';
      console.log('Write Report:', file_name);
      let out = this.fs.createWriteStream(file_name);
      out.on('error', function(err) {
          console.log(err)
      })
      // Async call to generate the output file:
      xlsx.generate(out);
  }



    createContract(contract, courses, callback) {
        let tableFontSize = '22';
        console.log(contract);
        //console.log(courses);
        //console.log(courses.length);
        // Create an empty Word object:
        let docx = this.officegen('docx')
        // Officegen calling this function after finishing to generate the docx document:
        docx.on('finalize', function(written) {
            console.log('Finish to create a Microsoft Word document.');
            callback(written);
        })
        // Officegen calling this function to report errors:
        docx.on('error', function(err) {
            console.log(err)
        })
        // Contract content
        let pObj = docx.createP({ align: 'left' })
        pObj.addText('תאריך:'+this.moment(contract.create_date).format("DD/MM/YYYY"), { rtl: true , bold: true })
        pObj = docx.createP({ align: 'center' })
        pObj.addText('טופס רישום', { rtl: true , bold: true , underline: true })
        pObj = docx.createP({ align: 'center' })
        pObj.addText('הסכם זה נכתב בלשון זכר מטעמי נוחות בלבד אך מיועד לנשים וגברים כאחד.', { rtl: true })
        let table_1 = [
          [{
            val: "נייד",
            opts: {
              rtl: true,
              cellColWidth: 30,
              sz: tableFontSize,
            }
          },{
            val: contract.phone_1,
            opts: {
              rtl: true,
              cellColWidth: 50,
              sz: tableFontSize,
            }
          },{
            val: "תעודת זהות:",
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          },{
            val: contract.country_id,
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          },{
            val: "שם התלמיד:",
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          },{
            val: contract.first_name+' '+contract.last_name,
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          }],
          [{
            val: "מייל" ,
            opts: {
              rtl: true,
              cellColWidth: 30,
              sz: tableFontSize,
            }
          },{
            val: contract.email,
            opts: {
              rtl: true,
              cellColWidth: 50,
              sz: tableFontSize,
            }
          },{
            val: "כתובת:",
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          },{
            val: contract.address,
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          },{
            val: "טלפון נוסף:",
            opts: {
              rtl: true,
              cellColWidth: 4261,
              sz: tableFontSize,
            }
          },{
            val: ' ',
            opts: {
              rtl: true,
              sz: tableFontSize,
              cellColWidth: 4261,
            }
          }],
        ]
        let tableStyle_1 = {
          tableColWidth: 4261,
          tableFontFamily: "Calibri",
          tableAlign: "center",
          rtl: true,
        }
        pObj = docx.createTable (table_1, tableStyle_1);
        pObj = docx.createP();
        //pObj.addLineBreak();
        pObj = docx.createP({ rtl: true });
        pObj.addText('אני הח"מ (להלן: "התלמיד"), נרשמתי ללימודים בחטיבת ההדרכה בחברת RT Embedded linux solutions   ח.פ. 515210441  (להלן: "בית הספר" ו/או "rt-ed" ו/או "החברה"), ובחתימתי בשולי הסכם זה ו/או באמצעות אישור חלופי בדוא"ל הריני להביע את הבנתי והסכמתי, לתנאי ההתקשרות המפורטים בו, מתחייב בזה כלפיכם:', { rtl: true })
        // #1
        pObj = docx.createListOfNumbers ({ rtl: true  });
        pObj.addText('להשתתף בקורסים המפורטים מטה שיערכו על ידיכם מיום ', { 
          rtl: true 
        })
        pObj.addText(this.moment(contract.start_date).format("DD/MM/YYYY"), { 
          rtl: true 
        })
        pObj.addText('(להלן: "התאריך הקובע").', { rtl: true })
        // #2
        pObj = docx.createListOfNumbers ({ rtl: true,y:0  });
        pObj.addText('לשלם לכם שכר לימוד בסך ', { rtl: true })
        pObj.addText(''+contract.amount+'', { rtl: true })
        pObj.addText(' ₪ בגין כל הקורסים המפורטים בסעיף 16.', { rtl: true })
        // #3
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('במועד הרישום ישלם התלמיד סכום שלא יפחת מ- 10% רישום מעלות שכר הלימוד, יתרת התשלום תועבר לכל המאוחר תוך שבועיים ממועד ההרשמה, ולא יאוחר משבוע לפני מועד תחילת הלימודים בקורס/ים. איחור בתשלום יישא ריבית.', { rtl: true });
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('באחריות התלמיד להסדיר את תשלומי הקורס/ים בהתאם למפורט לעיל. תנאי השתתפות בפועל בקורס הינו פירעון כל התשלומים, במלואם ובמועדם.', { rtl: true });
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('במידה והקורס אותו אלמד ימומן ע"י גורם שלישי כלשהו, אהיה, אני הח"מ ערב אישית לפירעון ההתחייבות זו עד לסיום לימודיי.', { rtl: true });
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('בית הספר רשאי להפסיק את לימודי התלמיד בכל עת, אם אחד או יותר מהתשלומים לא יפרעו ו/או התלמיד לא הסדיר את התשלום לקורס/ים בזמן שהוקצב לו ע"י בית הספר, וזאת לאחר התראה של 7 ימים ולתלמיד לא תהיה כל טענה ו/או דרישה כלפי בית הספר.', { rtl: true });
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('לקיים את נוהלי בית הספר, לשמור על ציודו וניקיונו ובמקרה שאגרום נזק לביה"ס, אשא בכל ההוצאות שתהיינה כרוכות בתיקון הנזק או בחידוש והחלפת הציוד שניזוק הכל לפי העניין.', { 
          rtl: true 
        });
        // #8
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('בית הספר רשאי להחליט שלא לפתוח קורס, על בית הספר יהיה להודיע לתלמיד על אי פתיחת הקורס עד 3 ימים לפני תחילת הקורס, במקרה של ביטול קורס ע"י בית הספר יוחזרו לי כל הכספים ששילמתי עבור הקורס.', { 
          rtl: true, 
          b:true 
        });
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('ידוע לי כי בית הספר יהיה רשאי להעביר את מיקום הקורס לסניף ו/או בי"ס הנמצא במרחק של לא יותר מ-50 ק"מ מהסניף בו נרשמתי, ולא תהיה לי כל טענה בגין כך.', { 
          rtl: true, 
          b:true 
        });
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('ביטול קורס/ים: במידה וארצה לבטל את השתתפותי בקורס ו/או אפסיק את לימודיי במשך תקופת אחד הקורסים, בין אם השתתפתי בשיעורים או בחלקם ובין אם לאו מכל סיבה שהיא, לא אהיה זכאי להחזר כספי כלשהו, בגין מחיר הקורס, בין אם ששולם ובין אם לאו, למעט ההחזרים כמפורט להלן:', { 
          rtl: true, 
          b:true 
        });
        // Level 2 
        // #1
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('תוך 14 ימים מיום חתימה על הסכם זה, ובלבד שיהיו לפחות 7 ימי עבודה לפני פתיחת הקורס . במקרה זה יוחזרו לי כל הכספים למעט דמי ביטול בסך  100  ש"ח ₪ לכל קורס בנפרד.', { rtl: true });
        // #2
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('ממועד זה ועד יום לפני פתיחת הקורס, אהיה חייב בתשלום 20% ממחיר המחירון.', { rtl: true });
        // #3
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('לאחר מכן התלמיד לא יהיה זכאי לקבל כל החזר כספי או זיכוי, גם אם יבטל את השתתפותו בקורס מכל סיבה שהיא, והתלמיד יחויב בתשלום שכר הלימוד במלואו, כל זאת, בין היתר,  לאור העובדה (הידועה לי) שארגון הקורס כרוך בהוצאות מרובות (וקבועות) המכוסות ע"י שכר הלימוד.', { 
          rtl: true ,
        });
        // #4
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('במידה וארשם במהלך ה-7 ימים לפני פתיחת הקורס ואילך, תינתן לי האפשרות לבטל בכתב בלבד את הרשמתי תוך 24 שעות ממועד הרישום בעלות של 20% ממחיר המחירון.', { rtl: true });
        // #5
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('במידה וארשם לקורס שהחל ידוע לי כי אין באפשרותי לקבל החזר כספי, במידה ואחליט לבטל את השתתפותי בקורס מכל סיבה שהיא.', { rtl: true });
        // #11
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('כל בקשת ביטול קורס תעשה ותוגש "בכתב בלבד" ותאריך קבלתה יהיה התאריך הקובע לצורך בקשת הביטול. הובהר לי שאי הופעה לשיעורים ו/או הודעה בע"פ ו/או הודעה טלפונית ו/או הודעה למרצה/מורה הקורס ו/או כל התנהגות אחרת, אינה נחשבת ולא תיחשב כהודעה על הפסקת הלימודים, ורק בהודעה בכתב שנמסרה במזכירות החברה או נשלחה בדואר רשום ו/או הפקס ו/או במייל, והתלמיד ווידא מול המזכירות כי קיבלה את הודעת הביטול כהלכה ושההודעה קריאה ומובנת, תיחשב כהודעה על הפסקת הלימודים. התלמיד מוותר בזה מראש על כל טענה הנוגעת למועד הביטול, שלא נעשה בכתב בהתאם להוראות סעיף זה.', { 
          rtl: true, 
          b:true 
        });
        // #12
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('שהנהלת בית הספר תהיה רשאית להכניס שינויים במועדי פתיחת הלימודים, במערכת השעות ו/או בתוכנית הלימודים, כל זאת מבלי לפגוע ביעילות הלימודים בהתאם לתוכנית הלימודים של הקורס.', { 
          rtl: true, 
        });
        // #13
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('שיתכן כי הנהלת בית הספר תשתמש בשמי ו/או תמונתי לצרכי פרסום בלבד, ככל ותלמיד אינו מעונין בכך, יש לעדכן בכתב את בית הספר.', { 
          rtl: true, 
        });
        /* Sign
        pObj = docx.createP ({ rtl: true });
        pObj.addText('חתימת התלמיד: ___________                            RT Embedded linux solution  : ___________ ', { 
          rtl: true, 
        });
        pObj.addLineBreak();
         New Count */
        // #1
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('שהקורס אינו מותאם במיוחד ללקות למידה מכל סוג שהיא, ואם הנני בעל לקות כזו, עלי להעביר אישור אבחון רשמי עד 48 שעות מהרישום, אחרת לא אוכל לקבל התייחסות ללקות. התייחסות המכללה תכלול את ההקלות במבחנים ע"פ הגדרות משרד החינוך ולא תהיה לי כל טענה בעניין זה.', { 
          rtl: true,
        });
        // #2
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('הנני מצהיר שידוע לי כי עצם הרישום לקורס אינו מבטיח את הצלחתי וזכאותי לקבלת תעודה.', { 
          rtl: true, 
          b:true 
        });
        // #3
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('במידה וממוצע הציונים, יהיה פחות  מ- 70, אהיה זכאי לקורס חוזר באותו קורס ללא תשלום למעט דמי רישום בסך 980 ש"ח לקורס, וזאת בתנאי שהשתתפתי לפחות ב- 90% משיעורי הקורס הגשתי את כל עבודות החובה במועדן וניגשתי לבחינת הסיום במועד. למימוש זכות זו יהיה עלי  להגיע אל משרדי בית הספר ולהגיש בקשה בכתב, הבקשה תוגש לכל תוך שנה מיום סיום הקורס.', { 
          rtl: true, 
        });
        // #4
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('אני  מתחייב להגיע לכל מבדק או מבחן במהלך הקורס וידוע לי כי זהו תנאי בסיסי לקורס חוזר.', { 
          rtl: true, 
        });
        // #5
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('אין אפשרות לעבור ממקצוע למקצוע בלימוד חוזר או להעביר הזכות לאדם אחר.', { 
          rtl: true, 
        });
        // #6
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('במידה ואכשל בקורס (ממוצע ציונים נמוך מ-55) גם בקורס חוזר אותו אלמד, אהיה זכאי לקורס חוזר נוסף ללא כל עלות, זה בתנאי שעמדתי בתנאי הזכאות לקורס חוזר כמפורט בהסכם זה בשני הקורסים.', { 
          rtl: true, 
          b:true 
        });
        // #7
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('אני נרשם בזאת לקורסים לפי המפורט בסעיף 16 להלן ומצהיר כי:', { 
          rtl: true, 
          b:true 
        });
        // #8
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('לא תהיה לי כל דרישה לעבור ללמוד בקורס במועד אחר ו/או לקורס אחר על סמך רישום זה.', { 
          rtl: true, 
        });
        // #9
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('ידוע לי כי הקורס אליו נרשמתי מתאים לציבור הכללי ואינו מותאם למגזר ספציפי כלשהו.', { 
          rtl: true, 
        });
        // #10
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('הנני מצהיר שקיבלתי את תקנון הלימודים בבית הספר ואני מתחייב לפעול לפיו.', { 
          rtl: true, 
        });
        // #11
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('במידה ונרשמתי למסלול המורכב מכמה קורסים, ידוע לי כי במידה ואבטל מקצוע אחד או יותר, אחויב בתשלום עבור כל מקצוע בנפרד עפ"י מחיר המחירון המופיע ע"ג הסכם זה.', { 
          rtl: true, 
        });
        // #12
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('במידה ונרשמתי למסלול, ידוע לי כי אוכל להקפיא את לימודי באישור מראש ובכתב, ובכל מקרה לא באמצע קורס. במידה ואושרה לי הקפאה, אוכל לנצל זכאותי ללמוד בקורסים הנותרים במסלול במשך השנתיים הבאות. מעבר לכך לא תהיינה לי דרישות נוספות כלפי בית הספר.', { 
          rtl: true, 
        });
        // #13
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('תלמיד המבקש להשאיל כרטיס פיתוח (Evaluation Board) יכול לעשות זאת תוך הפקדת פיקדון בסך 800 ₪. עם החזרת כטיס הפיתוח במצב תקין, יוחזרו דמי הפיקדון במלואם. במידה ונגרם נזק לכרטיס הפיתוח דמי הפיקדון לא יוחזרו לסטודנט.', { 
          rtl: true, 
        });
        // #14
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('עזרה בהשמה- החברה מספקת שירותים ברמה גבוהה, לחברה קשרים ענפים עם חברות רבות בתעשיית ההייטק. חברות אלו נסמכות עלינו בכל הקשור למציאת אנשי מקצוע איכותיים בתחומים רבים. החברה מתחייבת למתן עזרה בהשמה לכלל התלמידים אשר יעמדו בדרישות הבאות (דרישות אלו אינן מהוות תנאי להמשך השתתפות בקורס אלא להשמה בלבד):', { 
          rtl: true, 
        });
        // level 2
        // #1
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('נוכחות בשיעורים - על התלמידים חלה חובת נוכחות של 85% מכל השיעורים ומכל הרצאה אשר תקבע במסגרת הקורס.', { rtl: true });
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('מבחנים ומטלות – על התלמיד לעבור בהצלחה (ממוצע 87 ומעלה) את כל הבחינות ולהגיש את כל המטלות שיוגדרו במהלך הקורס.', { rtl: true });
        // #15
        pObj = docx.createListOfNumbers ({ rtl: true });
        pObj.addText('ידוע לי כי במידה ואתקל בקשיים לימודיים במהלך תקופת הלימודים, בית ספר rt-ed  ינסה לעזור ככל   האפשר ועפ"י שיקול דעתו המקצועי:', { 
          rtl: true, 
        });
        // level 2
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('ע"י שיעורי עזר ותגבור נוספים – ללא תשלום נוסף.', { rtl: true });
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('לתלמידים מתקשים שיעורי עזר ייחודים – חינם.', { rtl: true });
        pObj = docx.createNestedOrderedList({
          "level":2,
          rtl: true
        })
        pObj.addText('הכוונה לתרגול בתכונות מחשב ייעודיות, במידת הצורך – חינם. ', { rtl: true });
        // #16
        pObj = docx.createListOfNumbers ({ rtl: true  });
        pObj.addText('מועד פתיחת הקורס הראשון הינו ', { 
          rtl: true 
        })
        pObj.addText(this.moment(contract.start_date).format("DD/MM/YYYY"), { 
          rtl: true 
        })
        pObj.addText('הקורסים אליהם נרשם התלמיד: ', { rtl: true })
        //***** Courses List */
        let table_2 = [
          [{
            val: "מס",
            opts: {
              rtl: true,
              cellColWidth: 30,
              sz: tableFontSize,
            }
          },{
            val: "קוד הקורס",
            opts: {
              rtl: true,
              sz: tableFontSize,
              align: "right",
            }
          },{
            val: "שם הקורס",
            opts: {
              rtl: true,
              sz: tableFontSize,
              cellColWidth: 4261,
              align: "right",
            }
          },{
            val: "מחיר מחירון",
            opts: {
              rtl: true,
              sz: tableFontSize,
              align: "center",
              cellColWidth: 42,
            }
          }],
        ];
        for (let i=0; i<courses.length; i++) {
          let row = [{
            val: i+1,
            opts: {
              align: "center",
            }
          },{
            val: courses[i].product_id,
            opts: {
              rtl: true,
              cellColWidth: 30,
              sz: tableFontSize,
              align: "center",
            }
          },{
            val: courses[i].description,
            opts: {
              rtl: true,
              sz: tableFontSize,
              cellColWidth: 4261,
              align: "right",
            }
          },{
            val: courses[i].amount,
            opts: {
              rtl: true,
              sz: tableFontSize,
              align: "center",
              cellColWidth: 42,
            }
          }]
          table_2.push(row);
        }
        let tableStyle_2 = {
          tableFontFamily: "Calibri",
          tableAlign: "center",
          borders: true, // default is false. if true, default border size is 4
          borderSize: 2, // To use this option, the 'borders' must set as true, default is 4
          rtl: true,
        }
        pObj = docx.createTable (table_2, tableStyle_2);
        // Sign
        pObj = docx.createP();
        pObj = docx.createP ({ rtl: true });
        pObj.addText('חתימת התלמיד: ___________                            RT Embedded linux solution  : ___________ ', { 
          rtl: true, 
        });
        // PIRSUMIM
        docx.putPageBreak();
        pObj = docx.createP({ 
          rtl: true,
          align: 'center' });
        pObj.addText('תקנון תלמידים חדשים', { 
          rtl: true , 
          bold: true , 
          underline: true 
        });
        pObj = docx.createP({ 
          align: 'center' ,
          rtl: true
        });
        pObj.addText('הסכם זה נכתב בלשון זכר מטעמי נוחות בלבד אך מיועד לנשים וגברים כאחד.', { rtl: true });
        //
        pObj = docx.createP({ rtl: true });
        pObj.addText('קצת עלינו......', { 
          rtl: true , 
          bold: true})
        pObj = docx.createP({ rtl: true });
        pObj.addText('חברת Real Time  הינה בית תוכנה ומרכז הדרכה המספקת שירותי הדרכה, פיתוח וייעוץ מקצה לקצה למגוון לקוחות בארץ ובחו"ל.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('לחברה ניסיון רב בפיתוח, ייעוץ והדרכה במערכות משובצות מחשב, מערכות תקשורת ובמתן פתרונות טכנולוגיים בנושאים הנ"ל:', { rtl: true })
        //LIST
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('RT / Embedded Applications.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('Networking Applications.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('BSP/ Low Level Programming / Board Bring Up.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('Linux User/Kernel/Embedded Applications', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('HW/SW Development Tests / Manufacturing Tests.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('QA and Automation Tests', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('Full Stack WEB application based on client side:Angular/React, server side:NodeJS', { 
          rtl: true, 
        });

        pObj = docx.createP({ rtl: true });
        pObj.addText('מודל העבודה הייחודי של החברה מבטיח התעדכנות מתמדת בטכנולוגיות חדישות ,בעוד פעילות הפיתוח והייעוץ מספקות את הניסיון המעשי והמשוב מהשטח .', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('מידע נוסף על פעילות החברה ניתן למצוא ב   https://rt-ed.co.il', { rtl: true })
        pObj = docx.createP({ 
          rtl: true ,
          bold: true
        });
        pObj.addText('תחילה אנו נשמח לנצל הזדמנות זו על מנת לברך אותך על הצטרפותך למערך ההכשרה והלימוד בחברת real time group.', { rtl: true })
        pObj = docx.createP({ 
          rtl: true ,
          bold: true
        });
        pObj.addText('אנו נשמח לפרט בפניך את כללי ההרשמה וההתנהגות אצלנו.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('הרשמה למסלול', { rtl: true })
        // List
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('לפני ההרשמה למסלול ו/או קורסים במסלול המבוקש, הסטודנט יקרא בעיון את תכני הקורס יוודא כי הוא אכן עומד בדרישות הקדם למסלול ו/או הקורס הרצוי במסלול.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('החברה עשויה לקבל תלמידים אשר תנאי קבלתם גבוליים וזאת על סמך הערכה מקצועית של ההנהלה. במקרה זה חלה חובת השלמת הידע החסר על התלמיד.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('יתכנו שינויים במועדי ותכני הקורס / המסלול, לרבות מועדי הפתיחה ושעות הלימוד.', { 
          rtl: true, 
        });

        pObj = docx.createP({ rtl: true });
        pObj.addText('אמינות', { rtl: true , bold: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('הלימודים במרכז ההדרכה כמו גם העבודה במגזר ההייטק והמחשוב מחייבים מידה רבה של אמון הדדי בין התלמידים לבין סגל מרכז ההדרכה. אנו מייחסים חשיבות רבה לטוהר המידות וליושר האישי של התלמידים. כל עבודה, תרגיל, מבחן או פרויקט יתבצעו ע"י חניך אחד בלבד, אלא אם נאמר במפורש אחרת. אנו רואים בחומרה רבה העתקת ו/או ניסיון העתקת תרגילים, עבודות, פרויקטים ומבחנים.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('גבייה', { rtl: true, bold: true })
        // List
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('במידה ושיק חוזר ייגבה מהסטודנט דמי טיפול על סך 50 ₪, וזאת בנוסף לסכום השיק החוזר.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('במידה ויש צורך להעביר את הטיפול למחלקה המשפטית ו/או לעורך דין חיצוני, הסטודנט יישא בעלויות שכר הטרחה והוצאות משפטיות נוספות, אם יהיו.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('תלמיד אשר הפסיק את תשלומיו במהלך המסלול ללא קבלת אישור ההנהלה, יחויב  בעמלה של 10% לשנה בתוספת הוצאות עלויות המשפט, אם יהיו.', { 
          rtl: true, 
        });
        // Paragraph
        pObj = docx.createP({ rtl: true });
        pObj.addText('כללי התנהגות בכיתת הלימוד', { 
          rtl: true,
          bold: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('מרכז ההדרכה דורש מכל הסטודנטים להתנהג בסובלנות ובנימוס אדם לזולתו, לנהוג בכבוד הדדי, להקפיד על שמירת הרכוש הפרטי והכללי במוסד, לנקוט בשפה נאותה ולבטא יושר אישי ואקדמי בפעילות הלימודים והחברתית.', { rtl: true })
        // List of Dots
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אנו מבקשים להגיע מספר דקות לפני תחילת יום הלימודים בכדי למנוע הפרעות', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('נא להקפיד על זמני השיעור וההפסקות.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין להכניס שתיה ומזון לכיתה.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('נא לכבות טלפונים ניידים לפני תחילת השיעור.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('הנכם מתבקשים לכבד את מרכז ההדרכה - נוכחות תלמידים במתחם מרכז ההדרכה בלבוש הולם בלבד.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין לשנות את כבילת המחשבים והציוד ההיקפי.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין להתקין תוכנות אלא באישור המרצה ובנוכחותו.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין להעתיק תוכנות או קבצים ממחשבי מרכז ההדרכה.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('במקרה של תקלה במחשבים, יש לעדכן את המרצה או את צוות מרכז ההדרכה.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין להוציא ציוד מכיתת הלימוד.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין להשאיר תיקים וחפצים יקרי ערך ללא השגחה, המכללה לא תהיה אחראית', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('בכל נזק שייגרם כתוצאה מגניבה או אבדה.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('בסוף כל יום לימודים, הסטודנט ייקח עמו את הספרות וחומרי העזר הניתנים בקורס. במקרה של אובדן הספרות, לא תינתן ספרות חילופית אלא בתשלום נוסף.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('אין לבצע כל פעילות מסחרית בשטח מרכז ההדרכה, לרבות חלוקת חומר פרסומי.', { 
          rtl: true, 
        });
        pObj = docx.createListOfDots ({ rtl: true });
        pObj.addText('חל איסור מוחלט על עישון בכיתות או במסדרונות הבניין!', { 
          rtl: true, 
        });
        //Paragraph
        pObj = docx.createP({ rtl: true });
        pObj.addText('הטרדה מינית', { rtl: true, bold: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('בתאריך ה-20 לספטמבר 1998 , נכנס לתקפו החוק למניעת הטרדה מינית.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('מטרת החוק היא לאסור הטרדה מינית כדי להגן על כבודו של אדם, על חירותו ועל פרטיותו וכדי לקדם שוויון בין המינים. בחוק נקבע כי הטרדה מינית והתנכלות על רקע מיני, הם מעשים אסורים. בנוסף להיותם עילה לתביעה אזרחית מכוח החוק, הם גם מעשים פליליים ועילה לתביעה בנזיקין.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('החוק חל על כולנו ואנו דורשים מכל עובד ותלמיד לפעול על פי החוק ועל פי רוחו. חלק מאמצעים אלה הם פרסום תקנון שנוסחו נקבע בחוק והנועד להבהיר את עיקר הוראות החוק ותקנותיו, מינוי אחראי/ת לטיפול בתלונות, נקיטת פעולות הסברה והמצאת עותקי החוק ותקנותיו לכל תלמיד המעוניין בכך.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('אנו מעמידים לעיונכם תקנון שהינו מחייב על פי החוק.', { rtl: true })
        //Paragraph
        pObj = docx.createP({ rtl: true });
        pObj.addText('הגשת ולת"ם', { rtl: true, bold: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('מרכז ההדרכה יסייע לתלמידיו בכתיבת בקשות לדחיית/קיצור שירות מילואים (ולת"ם). תלמיד המעוניין בסיוע בכתיבת ולת"ם, מוזמן לפנות למנהלת המכללה.', { rtl: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('אנחנו כאן לשירותך, נשמח לשמש מענה לכל דבר ועניין בנוגע ללימודייך ו/או השמתך לעבודה בהמשך.', { rtl: true })

        pObj = docx.createP({ rtl: true });
        pObj = docx.createP({ rtl: true });
        pObj.addText('ברוך הבא למשפחתנו!', { rtl: true, bold: true })
        pObj = docx.createP({ rtl: true });
        pObj.addText('צוות rt-ed', { rtl: true, bold: true })

        // Let's generate the Word document into a file:
        //console.log(contract);
        let path_urs = this.path.join(__dirname, this._file_dirname);
        if (!this.fs.existsSync(path_urs+contract.country_id)){
          this.fs.mkdirSync(path_urs+contract.country_id);
        }
        path_urs = this.path.join(__dirname, this._file_dirname,contract.country_id,'/');
        let file_name = path_urs+'contr_'+contract.country_id+'.docx';
        console.log('Write Contract:', file_name);
        let out = this.fs.createWriteStream(file_name);
        out.on('error', function(err) {
            console.log(err)
        })
        // Async call to generate the output file:
        docx.generate(out);
    }
}
module.exports = {
    OfficeGenDataService: OfficeGenDataService
}
