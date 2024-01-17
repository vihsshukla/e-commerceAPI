const queryFormatter=(query,variables)=>{
  return query.replace(/\$(\d+)/g,(_,index)=>variables[index-1]);
}

module.exports=queryFormatter;