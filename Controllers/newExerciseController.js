const userModel = require('./User')
const exerciseModel = require('./Exercise')

const newExerciseController = async (req,res)=>{
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
}

module.exports = newExerciseController