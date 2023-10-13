const con = require("../config");

exports.alladmins = (req, res) => {
  const query = "SELECT * FROM admins;";
  try {
    con.query(query, (err, result) => {
      if (err) {
        res.json({name:"ADMIN DATA",role:"NOT Fetched"})
        console.log(err + "not fetched");
      } else {
        alladmins = result;
        res.json(result);
        // res.end()
      }
    });
  } catch (error) {}
}


exports.login=(req, res) => {
  try {
    console.log("login api entered")
    const { credentials } = req.body;
    console.log(credentials.username)
    const sql ="SELECT role FROM admins where username=(?) && password=(?) && role=(?);"
    con.query(sql,[credentials.username,credentials.password,credentials.role],(err,result)=>{
      if(!err){
        // role=result[0].role
        res.json({success:true,msg:`${result[0].role}`})
        console.log(result[0].role)
      }
      else{
        res.status(401).json({msg:`Inavlid Credentials${err}`})
        console.log(err)
        return;
      }


    })

  } catch (error) {
    console.log(error);
  }
}