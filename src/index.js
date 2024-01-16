const express=require('express');
const path=require('path');

const app=express();

const PORT=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Hello I am e-commerce api let me know what to do");
})

app.use('/api/auth/register',require(path.join(__dirname,'routes/Auth/register.js')));
app.use('/api/auth/login',require(path.join(__dirname,'routes/Auth/login.js')));
app.use('/api/buyer',require(path.join(__dirname,'routes/Buyer/buyer.js')));
app.use('/api/seller',require(path.join(__dirname,'routes/Seller/seller.js')));

app.listen(PORT,()=>{
    console.log(`Server listening on PORT: ${PORT}`);
})