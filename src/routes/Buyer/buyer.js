const express=require('express');
const jwt=require('njwt');
const queryRunner = require('../../utils/queryRunner');
const { listSellerQuery, catalogQuery } = require('./dto/dto');

const router=express.Router();

router.use((req,res,next)=>{
    
    const token=req.headers?.authorization.split(' ')[1];

    jwt.verify(token, 'Secret_string', (err) => {
        if(err){
            res.status(500).json({error:err.message});
        }else{
            next();
        }
    });
});

router.get('/list-of-sellers',(req,res)=>{
    queryRunner(listSellerQuery)
    .then((data)=>{
        if(data){
            res.status(200).json(data);
        }
    })
    .catch((err)=>{
        res.status(500).json({status:err.message});
    })
})

router.get('/seller-catalog/:seller_id',(req,res)=>{
    const sellerid=req.params.seller_id;
    queryRunner(catalogQuery,[sellerid])
    .then((data)=>{
        if(data){
            res.status(200).json(data);
        }
    })
    .catch((err)=>{
        res.status(500).json({status:err.message});
    });
})

module.exports=router;