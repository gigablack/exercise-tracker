const express = require('express')
const router = express.Router()
const userModel = require('../Models/User')
const exerciseModel = require('../Models/Exercise')

router.get('/',(req,res)=>{
    res.send('Hello Express')
})

router.post('/api/excercise/new-user',async (req,res)=>{
    try{
        const username = req.body.username
        if(!username) res.json({error:'username is missing'})
        const user = await userModel.findOne({username})
        if(user){
            res.json(user)
        } else {
            const newUser = new userModel({
                username
            })
            const userRegistered = await newUser.save()
            res.json(userRegistered)
        }
    } catch(err){
        console.log(err)
        res.json({error: 'server error'})
    }
})

router.post('/api/exercise/add',async (req,res)=>{
    try{
        const userId = req.body.userId
        if(!userId) res.json({error:'UserID is missing'})
        const user = await userModel.findById(userId)
        if(user){
            //guardar el ejercicio
            const newExercise = new exerciseModel({
                description: req.body.description,
                duration: req.body.duration,
                date: new Date(req.body.date).getTime(),
                user: userId
            })
            const exercise = await newExercise.save()
            user.exercises.push(exercise._id)
            await userModel.findByIdAndUpdate(userId,user)
            const userUpdated = await userModel.findById(userId).populate('exercises').exec()
            res.json({
                userId: userUpdated._id,
                username: userUpdated.username,
                exercises: userUpdated.exercises
            })
        } else {
            res.json({error:'Invalid UserID'})
        }

    } catch(err){
        console.log(err)
        res.json({error: 'Server Error'})
    }
})

router.get('/api/exercise/log',async (req,res)=>{
    try{
        const userId = req.query.userId
        const from = new Date(req.query.from).getTime()
        const to = new Date(req.query.to).getTime()
        const limit = parseInt(req.query.limit)
        if(userId){
            if(!isNaN(from) && !isNaN(to)){
                const data = await exerciseModel.find()
                    .where('user')
                    .equals(userId)
                    .where('date')
                    .gte(from)
                    .lte(to)
                    .limit(limit || null)
                    .exec()
                if(data.length === 0) return res.json({status: 'There is not exercises in this interval of time'})
                res.json(data)
            } else if(!isNaN(from) && isNaN(to)){
                const data = await exerciseModel.find()
                    .where('user')
                    .equals(userId)
                    .where('date')
                    .gte(from)
                    .limit(limit || null)
                    .exec()
                if(data.length === 0) return res.json({status: 'There is not exercises from this date'})
                res.json(data)
            } else if(isNaN(from) && !isNaN(to)){
                const data = await exerciseModel.find()
                    .where('user')
                    .equals(userId)
                    .where('date')
                    .lte(to)
                    .limit(limit || null)
                    .exec()
                if(data.length === 0) return res.json({status: 'There is not exercises until this date'})
                res.json(data)
            } else {
                const data = await exerciseModel.find()
                    .where('user')
                    .equals(userId)
                    .limit(limit || null)
                    .exec()
                if(data.length === 0) return res.json({status: 'There is not exercises on this user yet'})
                res.json(data)
            }
        } else {
            res.json({error:'userId is missing'})
        }
    } catch(err){
        const errorMessage = /Cast to ObjectId failed for value/
        if(errorMessage.test(err.message)){
            res.json({error:'Invalid userId'})
        } else {
            res.json(err)
        }
    }
})

module.exports = router