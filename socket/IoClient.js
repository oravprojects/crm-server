const { StudentKnexDataService } = require('../services/studentKnexDataService');

class IoClient {
    constructor(io) {
        this.io = io;
        this.studentKnexDataService = new StudentKnexDataService();
        //this.e = require('../data/DataEvents.js');
        //this.e.on('test', n => console.log(n));
    }
    startClient() {
        console.log("Io Client started");
        this.io.on('connection', (socket) => {
            console.log('Socket user connected');

            socket.on('messages_history', (data) => {
                console.log("from client: ",data);
                this.studentKnexDataService.messagesHistoryByTicket(data,(history)=>{
                    this.io.sockets.emit('messages_history', history);
                });
            });

            socket.on('ticket-history', (data) => {
                this.studentKnexDataService.ticketHistoryByStudent(data,(history)=>{
                    this.io.sockets.emit('ticket-history', history);
                });
            });

            socket.on('new-message', (data) => {
                data.sock = socket.id;
                this.studentKnexDataService.messageNew(data,(id)=>{
                    if (id.length !==0) data._id = id[0];
                    this.io.sockets.emit('new-message', data);
                });
            });

            socket.on('get-history', (data) => {
                console.log("from client: ",data,socket.id);
                this.studentKnexDataService.messagesHistory(data,(history)=>{
                    this.io.sockets.emit('get-history', history);
                });
            });

        });
    }
}

module.exports = {
    IoClient: IoClient
}