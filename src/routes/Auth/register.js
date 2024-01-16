const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
    res.send("I am register api");
})

module.exports=router;