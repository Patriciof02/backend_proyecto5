const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            }
        }
    },
    pass:{
        type:String,
        require: true,
    },
    mail:{
        type:String,
        require: true,
        unique: true,
        index: true,
        validate: {
            validator: function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            }
        }

    },
    phone:{
        type: String,
        required:false
    },
    adress:{
        type: String,
        require: false,
    },
    premium:{
        type: Boolean,
        require:false,
        default:false
    },
    dob:{
        type: String,
        require:false
    },

},{
    timestamps:true
})

const User = mongoose.model('User',UserSchema)
module.exports = User