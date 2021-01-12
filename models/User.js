const mongoose = require('mongoose')
const bcript = require('bcrypt')

let SaltNum = 10
const UserSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:[true,'  username is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        lowercase: true,
        trim:true,
        
    }, 
    

    password:{
        type:String,
        required:[true,'password is required'],
    }
   }, {timestamps:true})

   

UserSchema.pre('save', function savePass(next){
  let user = this
  if(!user.isModified('password')){ return next()
}
  return bcript.genSalt(SaltNum, (err, salt)=>{
      if(err) return next(err)
      return bcript.hash(user.password, salt, (hasher, hash)=>{
          if (hasher) return next(hasher)
         user.password=hash
         return next()
      })
  })
})

UserSchema.methods.comparePass= function comparePass(ourPass, callback){
  bcript.compare(ourPass, this.password, (err, isMatch)=>{
      if (err) return callback(err)
      return callback(null, isMatch)
  })
}




module.exports = UserSchema
