const listSellerQuery=`select * from dbo.users where usertype='seller'`;
const catalogQuery=`select * from dbo.catalog where sellerid=$1;`;
const getBuyerIDQuery=`select id from dbo.users where username=$`;
const createOrderQuery=`insert into orders(productid,buyerid,sellerid) values($1,$2,$3);`;

module.exports={listSellerQuery,catalogQuery,getBuyerIDQuery,createOrderQuery};