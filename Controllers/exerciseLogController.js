const exerciseModel = require('../Models/Exercise')

const exerciseLogController = async (req,res)=>{
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
}

module.exports = exerciseLogController