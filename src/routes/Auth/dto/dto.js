const registerQuery=`insert into dbo.users(username,password,usertype)values($1,$2,$3);`;
const loginQuery=`select password from dbo.users where username=$1;`;

module.exports={registerQuery,loginQuery};