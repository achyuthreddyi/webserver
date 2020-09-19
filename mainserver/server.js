const net = require('net')

const server = net.createServer()
const servestaticfiles = require('./fileserve')

let headers = {}

server.listen(8080,() =>{
    'server is running at port 8081'
})

server.on('connection',(client) =>{
    // console.log("CLIENT ON CONNECTION !!!!",client);
    client.on('data', (data) =>{
        // console.log(data.toString());
        // console.log("***********************************************************");
        const headers = parseHeaders(data)
        console.log('******HEADERS******',headers);
        
        //try to return which element 
        const res = servestaticfiles(headers)
        // console.log('response' , res );
        client.write(res
            // , () =>{
            // client.end()}
            )
      
    })
})

function parseHeaders(data) {
    data = data.toString().split('\r\n')

    // console.log(data);
    
    headers['method-path-protocol'] = data[0]
    // data = data.slice(1)
    data.shift()
    // console.log('data after splicing !!');
    // console.log(data);
    // form a new key value pairs basically objects!!
    for(let item of data) {
        if(item.indexOf(':') !== -1 && item.length !== 0) {
        headers[(item.slice(0, item.indexOf(':')))] = item.slice(item.indexOf(':') + 1)
        }
    }
    return headers

}