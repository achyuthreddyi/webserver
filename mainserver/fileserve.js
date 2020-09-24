const fs = require('fs')

const mimeType = {
    '.html':'text/html',
    '.css': 'text/css',
    '.js':'text/javascript',
    '.json':'application.json',
    '.jpg':'image/jpeg',
    'jpeg':'image/jpeg',
    '.png':'image/png'
}

const servestaticfiles =  (reques,folder ) =>{  
    console.log('Folder',folder);
    console.log("headers first here ", reques['headers'].url); 
    let path = reques['headers'].url 
    let res = ''  
    

    let  responseHeader;  
    
    res += responseHeader
    // return res

    if(path === '/'){
        try {
            body =  fs.readFileSync(`./${folder}/index.html`) 
            responseHeader = `HTTP/1.1 200 OK
                Content-Type : ${mimeType[path.slice(path.lastIndexOf('.'))]}
                Connection : keep-alive
                Content-Length: ${body.toString().length} 
                \r\n\r\n`                   
        } catch {
            body = fs.readFileSync(`./${folder}/404.html`);  
            responseHeader = `HTTP/1.1 404 OK
                Content-Type : ${mimeType[path.slice(path.lastIndexOf('.'))]}
                Connection : keep-alive
                Content-Length: ${body.toString().length} 
                \r\n\r\n`                  
        }        
        let response = Buffer.concat([Buffer.from(responseHeader),body])    
        return response  
    }else{ 
        try {
            let data = fs.readFileSync(`./${folder}/${path}`)        
            
            responseHeader = `HTTP/1.1 200 OK
                Content-Type : ${mimeType[path.slice(path.lastIndexOf('.'))]}
                Connection : keep-alive
                Content-Length: ${data.toString().length} 
                \r\n\r\n`                              
            let response =   Buffer.concat([Buffer.from(responseHeader),data])
            return response 
            
        } catch {
            // console.log('coming here',path,path.slice(path.lastIndexOf('.')) , mimeTypes['.html']);
            if (path.slice(path.lastIndexOf('.')) == '.html' ){
                body = fs.readFileSync(`./${folder}/404.html`);  
                responseHeader = `HTTP/1.1 404 OK                
                    Content-Type : ${mimeType[path.slice(path.lastIndexOf('.'))]}
                    Connection : keep-alive
                    Content-Length: ${body.toString().length} 
                    \r\n\r\n`
            let response = Buffer.concat([Buffer.from(responseHeader),body])    
            return response
            }
            
        }      
                 

    }


















// console.log('headers :::', headers['method-path-protocol'] );
    // const [protocol, path, status ] = headers['method-path-protocol'].split(' ')

    // console.log('type of header::::',(headers.Accept));

    // let type_of_doc = (headers.Accept).trim().slice(0,headers.Accept.indexOf(','))    
    // console.log('type_of_doc:',type_of_doc,typeof(type_of_doc));




    // switch (type_of_doc){
    //     // case 'text/html,':
    //     //     let body
    //     //     if (path === '/'){
              
                
    //     //     }
    //     //     else{
    //     //         try {
    //     //             body =  fs.readFileSync(`./staticfiles/${path}`)                    
    //     //         } catch (error) {
    //     //             body = fs.readFileSync(`./staticfiles/404.html`)                    
    //     //         }
                
    //     //     }
                     
    //     case 'text/css,':
    //         console.log('css file working !!!',path);
    //         const bodycss = fs.readFileSync(`./staticfiles/${path}`)
    //         // console.log('body',res);
    //         res += `Content-Length: ${bodycss.toString().length}\r\n\r\n`
    //         res += bodycss
    //         return res       
    //     default: 
    //     try
    //         {const defaultFile  =  fs.readFileSync(`./staticfiles/${path}`)
    //         console.log('###### ' , defaultFile );
    //         res += `Content-Length: ${defaultFile.length}\r\n\r\n`
    //         res += defaultFile       
    //         return res  } 
    //     catch{
    //         console.log(`${path}`);
    //     }                       
    // } 
  

}
module.exports = servestaticfiles