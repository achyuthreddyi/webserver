
const  bodyParser = (req) =>{
    console.log('coming here!!@#$@#$');
    const contentType = req['Content-Type']
    if(!req.body){
        return undefined
    }
    console.log('before', req.body);
    switch (contentType){
        case 'application/json':
            req.body = JSON.parse(req.body.toString())
        case 'test/plain':
            req.body = req.body.toString()
    }
    return req

}

module.exports =  bodyParser 