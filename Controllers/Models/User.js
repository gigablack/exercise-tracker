const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.Types.ObjectId

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    exercises:[{type: ObjectID,ref: 'Exercise'}]
})

module.exports = mongoose.model('User',userSchema)