const app = require('./server')

const  bodyParser  = require('./bodyParser')
// const {  }

app.use(bodyParser)


app.createServer(5000)
app.serveDefaultStatic()

app.addGetRoute("/tasks",(req,res) =>{
    // res.status(200)
    // res.status(200).send("achyuth")    
    // res.send("achyuth")
    
    res.json({achyuth : "reddy"})
})

app.addGetRoute("/json",(req,res) =>{
    console.log("working");
    res.status(200)
})