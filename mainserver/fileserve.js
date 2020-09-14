const fs = require('fs')

const servestaticfiles =  (headers ) =>{    
    let res = ''    
    console.log('headers :::', headers['method-path-protocol'] );
    const [protocol, path, status ] = headers['method-path-protocol'].split(' ')

    console.log('type of header::::',(headers.Accept));
    let type_of_doc = (headers.Accept).trim().slice(0,headers.Accept.indexOf(','))
    console.log('type_of_doc:',type_of_doc,typeof(type_of_doc));    
    const responseHeader = 'HTTP/1.1 200 OK\r\n'
    res += responseHeader
    switch (type_of_doc){
        case 'text/html,':
            const body =  fs.readFileSync('./staticfiles/index.html')
            // console.log('body here!!',res);
            res += `Content-Length: ${body.length}\r\n\r\n`
            res += body 
            return res           
        case 'text/css,':
            const bodycss = fs.readFileSync(`./staticfiles/${path}`)
            // console.log('body',res);
            res += `Content-Length: ${bodycss.length}\r\n\r\n`
            res += bodycss 
            return res
        // case '*/*':
        //     res  +=  fs.readFileSync('./staticfiles/index.js')
        //     console.log('body here!!',res);
        //     return res
            


        default :
            console.log('()()()()()()()()()()()()()()()()()',type_of_doc);
            res  +=  fs.readFileSync(`./staticfiles/${path}`)
            console.log('body here!!',res);
            return res            
    }   

}
module.exports = servestaticfiles