const {Client} = require('pg');

const queryRunner=async(query,data)=>{
  const client=new Client({connectionString:process.env.DATABASE_URL});
  try{
    await client.connect();
    let res=await client.query(query,data);
    return res.rows;
  }catch(err){
    console.error("Error while executing query: ",err.message);
    throw err;
  }finally{
    await client.end();
  }
}

module.exports=queryRunner;