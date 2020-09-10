const net = require('net')

const server = net.createServer()

let headers = {}

server.listen(8080,() =>{
    'server is running at port 8080'
})

server.on('connection',(client) =>{
    // console.log(client);
    client.on('data', (data) =>{
        // console.log(data.toString());
        console.log("***********************************************************");
        const headers = parseHeaders(data)
        console.log(headers);
    })
})

function parseHeaders(data) {
    data = data.toString().split('\r\n')

    console.log(data);
    
    headers['method-path-protocol'] = data[0]
    data.splice(1)
    // form a new key value pairs basically objects!!
    for(let item of data) {
        if(item.indexOf(':') !== -1 && item.length !== 0) {
        headers[item.slice(0, item.indexOf(':'))] = item.slice(item.indexOf(':') + 1)
        }
    }
    return headers

}