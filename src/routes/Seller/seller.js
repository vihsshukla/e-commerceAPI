const express=require('express');
const jwt=require('njwt');
const { getSellerIDQuery, createCatalogQuery, createProductQuery, ordersQuery } = require('./dto/dto');
const queryRunner = require('../../utils/queryRunner');

const router=express.Router();

router.use((req,res,next)=>{
    
    const token=req.headers?.authorization.split(' ')[1];

    jwt.verify(token, 'Secret_string', (err, jwtVerified) => {
        if(err){
            res.status(500).json({error:err.message});
        }else{
            req.body.username=jwtVerified.body.username;
            console.log(jwtVerified.body.username);
            next();
        }
    });
});

router.post('/create-catalog',(req,res,next)=>{
        const username=req.body.username;
        queryRunner(getSellerIDQuery,[username])
        .then((data)=>{
            if(data.length){
                req.body.sellerid=data[0]?.id;
                next();
            }
        })
        .catch((err)=>{
            res.status(500).json({status:err.message});
        })
    },(req,res,next)=>{
        const {sellerid,catalogName}=req.body;
        queryRunner(createCatalogQuery,[catalogName,sellerid])
        .then((data)=>{
            console.log(data);
            req.body.catalogid=data[0]?.id;
            next();
        })
        .catch((err)=>{
            res.status(500).json({status:err.message});
        })
    },(req,res)=>{
        const {catalogid,items}=req.body;
        for(const item of items){
            queryRunner(createProductQuery,[item.name,item.price,catalogid])
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                res.status(500).json({status:err.message});
            })
        }
        res.status(200).json({Status:"Catalog created successfully."});
    }
)

router.get('/orders',(req,res,next)=>{
        const username=req.body.username;
        queryRunner(getSellerIDQuery,[username])
        .then((data)=>{
            if(data.length){
                req.body.sellerid=data[0]?.id;
                next();
            }
        })
        .catch((err)=>{
            res.status(500).json({status:err.message});
        })
    },(req,res)=>{
        const {sellerid}=req.body;
        queryRunner(ordersQuery,[sellerid])
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            res.status(500).json({status:err.message});
        })
    }
)


module.exports=router;