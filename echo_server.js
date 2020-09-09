const net = require('net')

const server = net.createServer()

server.listen(8080,() =>{
    console.log('opened server on', server.address());
    console.log(' server is working !!!!');
})
server.on('connection', (client) => {
    const address = `${client.remoteAddress} : remote port is ${client.remotePort}`
    console.log(`connection established !!!`,address);

    console.log('A Client connected')

    // client.write('Hello, from the echo server!\n\n')

    client.on('data', (data) => {
        console.log(data.toString());
      client.write('Hello, from the echo server!\n\n')
      client.write(data)
      client.end()
      client.on('end', () => {
        console.log('Socket connection ended')
      })
      client.on('error', (err) => {
        console.log(err)
      })
    })
  })

// server.on()

// const server = net.createServer((socket) => {
//     socket.end('goodbye\n');
//   }).on('error', (err) => {
//     // Handle errors here.
//     throw err;
//   });
  
//   // Grab an arbitrary unused port.
//   server.listen(() => {
//     console.log('opened server on', server.address());
//   });