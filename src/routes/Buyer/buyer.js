const express=require('express');
const jwt=require('njwt');
const queryRunner = require('../../utils/queryRunner');
const { listSellerQuery, catalogQuery, getBuyerIDQuery, createOrderQuery } = require('./dto/dto');
const { SECRET } = require('../../Constants/constants');
const queryFormatter = require('../../utils/queryFormatter');

const router=express.Router();

router.use((req,res,next)=>{
    
    const token=req.headers?.authorization.split(' ')[1];

    jwt.verify(token, SECRET, (err, jwtVerified) => {
        if(err){
            res.status(500).json({error:err.message});
        }else{
            req.body.username=jwtVerified.body.username;
            next();
        }
    });
});

router.get('/list-of-sellers',(req,res)=>{
    const {first,offset}=req.body;
    queryRunner(listSellerQuery,[first,offset])
    .then((data)=>{
        if(data){
            res.status(200).json(data);
        }
    })
    .catch((err)=>{
        res.status(500).json({error:err.message});
    })
});

router.get('/seller-catalog/:seller_id',(req,res)=>{
    const sellerid=req.params.seller_id;
    const {first,offset}=req.body;
    queryRunner(catalogQuery,[sellerid,first,offset])
    .then((data)=>{
        if(data){
            res.status(200).json(data);
        }
    })
    .catch((err)=>{
        res.status(500).json({error:err.message});
    });
})

router.post('/create-order/:seller_id',(req,res,next)=>{
        const username=req.body.username;
        queryRunner(getBuyerIDQuery,[username])
        .then((data)=>{
            if(data.length){
                req.body.buyerid=data[0]?.id;
                next();
            }
        })
        .catch((err)=>{
            res.status(500).json({error:err.message});
        })
    },
    async(req,res)=>{
        const sellerid=req.params.seller_id;
        const buyerid=req.body.buyerid;
        const products=req.body.products;
        let query='';
        for(let i=0;i<products.length;i++){
            query+=await queryFormatter(createOrderQuery,[products[i],buyerid,sellerid]);
        }
        queryRunner(query,[])
        .then((data)=>{
            res.status(200).json({status:"Order Created Successfully."});
        })
        .catch((err)=>{
            res.status(500).json({error:err.message});
        });
    }
)

module.exports=router;