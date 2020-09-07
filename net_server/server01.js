const net = require('net')
// const server = net.createServer((connection) =>{
//     // console.log(connection);
//     console.log('client created!!');
    
//     connection.on('end', _=> console.log('client disconnected!!') )
//     connection.write('Hello world!\r\n')
//     connection.pipe(connection)
// })
const server = net.createServer()

server.on('connection', (client) =>{
    console.log(client);
    console.log('client created!!!');
})

server.listen(8080, () => console.log('server is listening!!'))