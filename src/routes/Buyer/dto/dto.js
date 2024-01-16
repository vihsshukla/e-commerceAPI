const listSellerQuery=`select * from dbo.users where usertype='seller'`;
const catalogQuery=`select * from dbo.catalog where sellerid=$1;`;

module.exports={listSellerQuery,catalogQuery};