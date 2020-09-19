const fs = require('fs')

const servestaticfiles =  (headers, ) =>{    
    let res = ''    
    console.log('headers :::', headers['method-path-protocol'] );
    const [protocol, path, status ] = headers['method-path-protocol'].split(' ')

    console.log('type of header::::',(headers.Accept));
    let type_of_doc = (headers.Accept).trim().slice(0,headers.Accept.indexOf(','))
    
    console.log('type_of_doc:',type_of_doc,typeof(type_of_doc));

    const responseHeader = 'HTTP/1.1 200 OK\r\n'
    
    res += responseHeader
    // return res
    switch (type_of_doc){
        case 'text/html,':
            const body =  fs.readFileSync('./staticfiles/index.html')
            // console.log('body here!!',res);
            res += `Content-Length: ${body.toString().length}\r\n\r\n`
            res += body
            return res           
        case 'text/css,':
            console.log('css file working !!!',path);
            const bodycss = fs.readFileSync(`./staticfiles/${path}`)
            // console.log('body',res);
            res += `Content-Length: ${bodycss.toString().length}\r\n\r\n`
            res += bodycss
            return res       
        default: 
            const defaultFile  =  fs.readFileSync('./staticfiles/index.js')
            console.log('###### ' , defaultFile );
            res += `Content-Length: ${defaultFile.length}\r\n\r\n`
            res += defaultFile       
            return res                           
    } 
  

}
module.exports = servestaticfiles