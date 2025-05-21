const users = require("../../Models/userSchema")
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
exports.login = async(req,res)=>{
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email:email,password:password})
        if(existingUser){
            const token = jwt.sign({userid : existingUser._id},JWT_SECRET)
            const {password: _,...withoutPassword} = existingUser.toObject() 
            res.status(201).json({data:withoutPassword,token:token})
        }
        else{
            res.status(400).json('User Not Found: Invalid email or password')
        }
    }
    catch(err){
        res.status(401).json('login faild due to',err)
    }
}