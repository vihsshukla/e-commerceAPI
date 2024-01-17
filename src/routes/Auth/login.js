const express=require('express');
const jwt=require('njwt');
const queryRunner = require('../../utils/queryRunner');
const { loginQuery } = require('./dto/dto');

const router=express.Router();

router.use((req,res,next)=>{
    const {username,password}=req.body;
    queryRunner(loginQuery,[username])
    .then((data)=>{
        if(data.length===0){
            res.status(400).json({status:"User does not exists."});
        }
        else if(data[0]?.password===password){
            next();
        }else{
            res.status(400).json({status:"Password Authentication Failed."});
        }
    })
    .catch((err)=>{
        res.status(500).json({status:err.message});
        next(err.message);
    })
})

router.post('/',(req,res)=>{
    try{
        const token=jwt.create(req.body,'Secret_string');
        token.setExpiration(new Date().getTime() + 60*5*1000);
        res.json({token:token.compact()});
    }catch(err){
        res.status(500).json({status:err.message});
    }
    
})

module.exports=router;