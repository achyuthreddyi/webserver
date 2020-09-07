// const express = require('express')
// const socketIO = require('socket.io')
// const http = require('http')
// const port = process.env.PORT || 3000
// let app = express()
// let server = http.createServer(app)
// let io = socketIO(server)


// io.on('connection', (socket)=>{
//     console.log('New user connected');
//     socket.emit('newMessage', { 
//         from:'jen@mds', 
//         text:'hepppp', 
//         createdAt:123 
//       });
//       socket.on('createMessage', (newMessage)=>{ 
//         console.log('newMessage', newMessage); 
//       }); 
//       socket.on('disconnect', ()=>{ 
//         console.log('disconnected from user'); 
//       });    
//   });


// server.listen(port)

// const express=require('express'); 
// const socketIO=require('socket.io'); 
// const http=require('http') 
// const port=process.env.PORT||3000 
// var app=express(); 
// var io=socketIO(server); 

// // make connection with user from server side 
// io.on('connection', (socket)=>{ 
// console.log('New user connected'); 
// //emit message from server to user 
// socket.emit('newMessage', { 
// 	from:'jen@mds', 
// 	text:'hepppp', 
// 	createdAt:123 
// }); 

// // listen for message from user 
// socket.on('createMessage', (newMessage)=>{ 
// 	console.log('newMessage', newMessage); 
// }); 

// // when server disconnects from user 
// socket.on('disconnect', ()=>{ 
// 	console.log('disconnected from user'); 
// }); 
// }); 

// server.listen(port); 

const net = require('net')
const server = net.createServer()

server.listen(8000, console.log('i am listening!!'))

server.on('connection',(client) =>{
    console.log('client connected !!!');
    client.on('data', (data) =>{
        client.write('hello from the server')
        client.write(data)
        client.end()
        client.on('end',() =>{
            console.log('socket connection ended');
        })
        client.on('error', err =>{
            console.log(err);
        })
    })
})
