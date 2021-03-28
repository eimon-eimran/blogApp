const jwt = require('jsonwebtoken')

const USERMODEL = require('../models/userModel')

const signin = async (req,res) => {
    
    const {email, password} =  req.body
    try {
        const existingUser = await USERMODEL.findOne({email})
        if(!existingUser) return res.status(404).json({ message : "No Such User, Please Sign In or Try Again"})
        const token = jwt.sign({email : existingUser.email, id: existingUser._id}, 'test', {expiresIn : '1hr'})
        res.status(200).json({result : existingUser, token})

    } catch (error) {
        res.status(500).json({message : 'Something went wrong'})
    }
}

const signup = async (req,res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body
    try{
        
        const existingUser = await USERMODEL.findOne({email})
        if(existingUser) return res.status(400).json({ message : "User Already Exists"})
        if(password !== confirmPassword) return res.status(404).json({message : 'Password Mismatched' })
        
        const result = await USERMODEL.create({email, password, name : `${firstName} ${lastName}`})    
        const token = jwt.sign({email : result.email, id: result._id}, 'test', {expiresIn : '1hr'})
        res.status(200).json({result , token})
    }
    catch(error){
        res.status(404).json({message : 'SOmething went wrong'})
    }

}

module.exports = {signin, signup}