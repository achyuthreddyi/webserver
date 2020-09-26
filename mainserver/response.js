function status (code){
    console.log(" in the status code ");
    let resp = `HTTP/1.1 ${code} OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: Origin, Content-Type, Accept\r\n`
    const date = new Date()
    resp += `Date: ${date.toUTCString()}\r\n`
    resp += 'Content-Type: *\r\n'

  this.resp = resp
  return this
}
const code = 200

function send (body,client) {
    let resp = `HTTP/1.1 ${code} OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: Origin, Content-Type, Accept\r\n`
    console.log("coming here OPOPOPOP");
    body = JSON.stringify(body)
    console.log('body in the response file',body);
    this.resp += `Content-Length: ${body.length}\r\n\r\n`
    this.resp += body
    console.log('resp', this.resp);
    client.write(resp)
    // return  this.resp
}
const response = {
    send : send,
    status : status
}

module.exports = response