const fs = require('fs');
const bodyParser = require('./bodyParser');

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
     
    for (const middleware of middlewares){
        request = middleware(request)
    }

     path = (request.headers.path);
     console.log('path in routecontroller', path);
    
    if(getRoutes.hasOwnProperty(path)){
        
        getRoutes[path](request,response,client)
        
    }
    if(postRoutes.hasOwnProperty(path)){
        postRoutes[path](request,response,client)
    }

    function status (code){
        console.log(" in the status code ");
        let resp = `HTTP/1.1 ${code} OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: Origin, Content-Type, Accept\r\n`
        const date = new Date()
        resp += `Date: ${date.toUTCString()}\r\n`
        resp += 'Content-Type: *\r\n'
    
        client.write(Buffer.from(resp), function(err) { client.end() })
        // client.end()
    
    }

    function json(body2){
        const body = JSON.stringify(body2);       
        let responseHeaders =
            `HTTP/1.1 200 OK
            Content-Type: ${mimeType[path.slice(path.lastIndexOf('.'))]}
            Connection: keep-alive
            Content-Length: ${body.length}
            Date: ${new Date().toUTCString()}
            \r\n\r\n`
        client.write(Buffer.from(responseHeaders + body), function(err) { client.end() })
        // client.end()
    }    

    function send(controller) {        
        const body = JSON.stringify(controller)        
        let responseHeaders =
            `HTTP/1.1 200 OK
            Content-Type: ${mimeType[path.slice(path.lastIndexOf('.'))]}
            Connection: keep-alive
            Content-Length: ${body.length}
            Date: ${new Date().toUTCString()}
            \r\n\r\n`
        client.write(Buffer.from(responseHeaders + body + '\r\n'), function(err) { client.end() })
        // client.end()
    }
}

module.exports = routeController




function statusHeader(statusCode){
    const httpStatus = {
        '200':'OK',
        '400': 'Bad request',
    }
    let responseHeader = `HTTP/1.1 ${statusCode} ${httpStatus[statusCode]}
    Connection: keep-alive    
    Date: ${new Date()}
    \r\n`
    return responseHeader
}