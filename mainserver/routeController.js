const fs = require('fs')
// const response = require('./response')

const mimeType = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'application/javascript',
    '.json' : 'application/json',
    '.txt' : 'text/plain',
    '.jpg' : 'image/jpeg',
    '.jpeg' : 'image/jpeg',
    '.png' : 'image/png'
  }


const routeController = async (request, getRoutes, postRoutes,middlewares,client) =>{

    const response = {
    send : send,
    json : json,
    status : status
     }

     path = (request.headers.path);
     console.log('path in routecontroller', path);
    
    if(getRoutes.hasOwnProperty(path)){
        console.log('coming or not coming !!!');
        getRoutes[path](request,response,client)
        // console.log('abc' , abc );
    }

    function status (code){
        console.log(" in the status code ");
        let resp = `HTTP/1.1 ${code} OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: Origin, Content-Type, Accept\r\n`
        const date = new Date()
        resp += `Date: ${date.toUTCString()}\r\n`
        resp += 'Content-Type: *\r\n'
    
        client.write(Buffer.from(resp))
      return this
    }

    function json(body2){
        console.log("in json method!!",body2);
        const body = JSON.stringify(body2)
        let responseHeaders =
        `HTTP/1.1 200 OK
        Content-Type: ${mimeType[path.slice(path.lastIndexOf('.'))]}
        Connection: keep-alive
        Content-Length: ${body.length}
        Date: ${new Date().toUTCString()}
        \r\n\r\n`
        client.write(Buffer.from(responseHeaders + body))
    }    

    function send(body1) {
        // console.log("body in send method",body1);
        body1 = JSON.stringify(body1)
        const body = body1
        let responseHeaders =
            `HTTP/1.1 200 OK
            Content-Type: ${mimeType[path.slice(path.lastIndexOf('.'))]}
            Connection: keep-alive
            Content-Length: ${body.length}
            Date: ${new Date().toUTCString()}
            \r\n\r\n`

    
    client.write(Buffer.from(responseHeaders + body))
      }
}

module.exports = routeController