const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const mongoose = require('mongoose')
const router = require('./Routes/routes')

app.set('port',process.env.PORT || 3000)

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true},(err)=>{
    if(err) return console.log('DATABASE ERROR CONNECTION')

    console.log('DATABASE IS CONNECTED')

    app.use(router)

    app.listen(app.get('port'),(err)=>{
        if(err){
            console.log('SERVER ERROR:',err)
            process.exit(1)
        }

        console.log(`Server Listening on http://localhost:${app.get('port')}`)
    })
})

