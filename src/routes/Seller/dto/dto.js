const createCatalogQuery=`insert into dbo.catalog(name,sellerid)values($1,$2)  returning id;`;
const createProductQuery=`insert into dbo.products(name,price,catalogid)values($1,$2,$3);`;
const getSellerIDQuery=`select id from dbo.users where username=$1;`;
const ordersQuery=`select * from dbo.orders where sellerid=$1;`;

module.exports={createCatalogQuery,createProductQuery,getSellerIDQuery,ordersQuery};