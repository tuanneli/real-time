const ws = require('ws');

const wss = new ws.WebSocketServer({
    port: 5000
}, () => console.log("Server started on PORT 5000"))

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        console.log("Message: ", message);
        console.log("JSON.Message: ", JSON.parse(JSON.stringify(message)));
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;

            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
})

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}
