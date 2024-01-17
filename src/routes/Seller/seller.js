const express=require('express');
const jwt=require('njwt');
const { getSellerIDQuery, createCatalogQuery, createProductQuery, ordersQuery, checkCatalogQuery } = require('./dto/dto');
const queryRunner = require('../../utils/queryRunner');
const queryFormatter = require('../../utils/queryFormatter');

const router=express.Router();

router.use((req,res,next)=>{
    
    const token=req.headers?.authorization.split(' ')[1];

    jwt.verify(token, 'Secret_string', (err, jwtVerified) => {
        if(err){
            res.status(500).json({error:err.message});
        }else{
            req.body.username=jwtVerified.body.username;
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
            res.status(500).json({error:err.message});
        })
    },(req,res,next)=>{
        const {sellerid,catalogName}=req.body;
        queryRunner(checkCatalogQuery,[catalogName,sellerid])
        .then((data)=>{
            if(data.length){
                req.body.catalogid=data[0]?.id;
                next();
            }else{
                queryRunner(createCatalogQuery,[catalogName,sellerid])
                .then((data)=>{
                    req.body.catalogid=data[0]?.id;
                    next();
                })
                .catch((err)=>{
                    res.status(500).json({error:err.message});
                });
            }
        })
    },(req,res)=>{
        const {catalogid,items}=req.body;
        let query='';
        for(const item of items){
            query+=queryFormatter(createProductQuery,[item.name,item.price,catalogid]);
        }
        queryRunner(query,[])
        .then(()=>{
            res.status(200).json({Status:"Catalog created successfully."});
        })
        .catch((err)=>{
            res.status(500).json({error:err.message});
        })
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