const listSellerQuery=`select * from dbo.users where usertype='seller' limit $1 offset $2;`;
const catalogQuery=`select * from dbo.catalog where sellerid=$1 limit $2 offset $3;`;
const getBuyerIDQuery=`select id from dbo.users where username=$1;`;
const createOrderQuery=`insert into orders(productid,buyerid,sellerid) values($1,$2,$3);`;

module.exports={listSellerQuery,catalogQuery,getBuyerIDQuery,createOrderQuery};