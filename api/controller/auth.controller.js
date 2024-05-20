import User from "../model/auth.model.js"
import bcryptjs from 'bcryptjs'
export const signup=async(req,res,next)=>{
    try{
const {username,password,email}=req.body
if(!username||!password||!email||username==="",email==='',password===''){
return res.status(403).send({
    status: 'Forbidden',
    message:'kis bat ki jaldi hai sari requirement fill karo'})
}
const pass=bcryptjs.hashSync(password,10)
const rest=await User.create({username,email,password:pass})


return res.status(201).send({
    status:'success',
    message:'user created',
    data:rest
})
    }catch(err){
        return res.status(500).json({
            status:'error',
            message:err.message
        })
    }
}