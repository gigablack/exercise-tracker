const userModel = require('./Models/User')

const newUserController = async (req,res)=>{
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
}

module.exports = newUserController