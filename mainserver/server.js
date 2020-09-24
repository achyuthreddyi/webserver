const net = require('net');
const { on } = require('process');

const servestaticfiles = require('./fileserve')
const PORT = 8080;
let headers = {}

const serverFun = {
    createServer : createServer,
}

function createServer(PORT){   
    
    const server = net.createServer()
    server.on('connection',(client) =>{
        
        client.on('error', (err) =>{  
            console.log(err);
            console.log('error in connection !!!' );
            client.write(`HTTP/1.1 500 server internal error`)
            client.close()        
        })
        client.on('data',(data) =>{
            let parsedRequest = parseRequest(data)
            console.log('parsedRequest', parsedRequest);
            servestaticfiles(parsedRequest)
            console.log(res);
            client.write(res)
            client.end()
        })
        client.on('end',() =>{
            console.log('client has sent the fin packets');
        }) 
        client.on('close',()=>{
            console.log('client left or terminated the connection!!!');
        })     
})
server.listen(PORT,() =>{console.log("server working on ",PORT)})
}
 
function parseRequest (data){

    let request = {}
    let [headerData, bodyData] = data.toString().split('\r\n\r\n')
    // var headers = {}

    headerData = headerData.split('\r\n')

    let method_path_protocol = headerData[0].split(' ')
    if(method_path_protocol.length >3){
        let err_response = 'HTTP/1.1 400 Bad Request'
        return err_response
    }

    headers['method'] = method_path_protocol[0]
    headers['url'] = method_path_protocol[1]
    headers['http-version'] = method_path_protocol[2]

    parseUrl(headers)

    headerData = headerData.slice(1)

    for(let item of headerData){
        if(item.includes(':')){
            let headerKey = item.slice(0, item.indexOf(':'))
            if(headerKey.includes(' ')){
                let err_response = 'HTTP/1.1 400 Bad Request'
                return err_response
                // return 
            }else{
                headers[item.slice(0,item.indexOf(':'))] = item.slice(item.indexOf(':') + 2)
            }
        }
    }
    request.headers = headers

    if(headers.method !== 'GET' && headers.method !== 'POST') {
        let err_response = 'HTTP/1.1 501 Not Implemented'
        return err_response
      }
      if(headers.method === 'POST' && headers['Content-Length'] === undefined) {
        let err_response = 'HTTP/1.1 400 Bad Request'
        return err_response
      }
    request.body = bodyData
    return request 
}

function parseUrl(headers){
    if(!headers.url.includes('&')){
        headers.path = headers.url
    } else{
        let path = headers.url.slice(0, headers.url.indexOf('?'))
        let queryString = headers.url.slice(headers.url.indexOf('?')+ 1 ).split('&')
        let params = {}
        for (let query of queryString){
            params[query.slice(0,query.indexOf('='))] = query.slice(query.indexOf('=') +1)
        }
        headers.path = path
        headers.queryStrings = params
    }
}



serverFun.createServer(PORT);