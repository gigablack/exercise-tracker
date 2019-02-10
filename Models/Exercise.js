const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.Types.ObjectId

const exerciseSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    date: {
        type: Date,
        default: new Date().getTime()
    },
    user: { type: ObjectID, ref: 'User'}
})

module.exports = mongoose.model('Exercise',exerciseSchema)