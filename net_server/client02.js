// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>ChatApp</title>
// </head>
// <body class="chat"> 
//     <form id='message-form'> 
//       <input name='message' type="text"placeholder="Message"
//               autofocus autocomplete="off"/> 
//       <button >Send</button> 
//     </form> 

// <script src="/socket.io/socket.io.js"></script> 
// <script> 
// var socket=io() 

// // connection with server 
// socket.on('connect', function(){ 
// console.log('Connected to Server') 

// }); 

// // message listener from server 
// socket.on('newMessage', function(message){ 
// console.log(message); 
// }); 

// // emits message from user side 
// socket.emit('createMessage', { 
// to:'john@ds', 
// text:'what kjkljd'
// }); 

// // when disconnected from server 
// socket.on('disconnect', function(){ 
// console.log('Disconnect from server') 
// }); 
// </script> 
// </body> 
// </html> -->


const net = require('net')
const client = net.connect({port: 8000}, () =>{
    console.log('connected to server!!');
})
client.emit('data', { 
to:'john@ds', 
text:'what kjkljd'
}); 