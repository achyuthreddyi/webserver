const fs = require('fs')
const net = require('net')
let responseHeader

const servestaticfiles =  (headers ) =>{
    // console.log('from the filerserver');
    // // console.log(headers);
    let res = ''

    console.log((headers.Accept));
    
    const responseHeader = 'HTTP/1.1 200 OK\r\n'
    res += responseHeader
    const body =  fs.readFileSync('./staticfiles/index.html')
    res += `Content-Length: ${body.length}\r\n\r\n`
    res += body
    return res              
     

}

module.exports = servestaticfiles