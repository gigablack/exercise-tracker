const express = require('express')
const router = express.Router()
const newUserController = require('../Controllers/newUserController')
const newExerciseController = require('../Controllers/newExerciseController')
const exerciseLogController = require('../Controllers/exerciseLogController')
const path = require('path')

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../index.html'))
})

router.post('/api/excercise/new-user',newUserController)

router.post('/api/exercise/add',newExerciseController)

router.get('/api/exercise/log',exerciseLogController)

module.exports = router