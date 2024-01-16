const express=require('express');
const queryRunner = require('../../utils/queryRunner');
const { registerQuery } = require('./dto/dto');

const router=express.Router();

router.get('/',(req,res)=>{
    console.log(req.body);
    const {username,password,userType}=req.body;

    queryRunner(registerQuery,[username,password,userType])
    .then((data)=>{
        if(data){
           res.status(200).json({status:"User registered successfully."});
        }
    })
    .catch((err)=>{
        res.status(500).json({status:err.message});
    });
})

module.exports=router;