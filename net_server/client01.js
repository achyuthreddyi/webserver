const net = require('net')
const client = net.connect({port: 8080}, () =>{
    console.log('connected to server!!');
})
 client.on('data',(data) =>{
     console.log(data.toString());
     client.end()
 })

 client.on('end', () =>{
     console.log('disconneted from server !!!');
 })