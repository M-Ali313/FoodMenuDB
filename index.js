const express = require('express')
const mongoose = require('mongoose')

const app = express()


const URLdb = 'mongodb+srv://Ali:Ali1234@cluster0.5t1pkto.mongodb.net/FoodMenuDB?appName=Cluster0'

mongoose.connect(URLdb)
.then((resutl)=> {
        app.listen(3000)
        console.log("Database connect")
    })
    .catch((err)=> console.log("Not connect "))
 
app.get('/', (req, res)=>{
    res.send('Hello node.js')
})