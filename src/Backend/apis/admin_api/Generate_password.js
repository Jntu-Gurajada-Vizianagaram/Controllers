const ApiKeyAuthentication = require('../ApiKeyAuth')


exports.generate_password=(req,res)=>{
    try{
        const apikey = req.params.apikey;
        if(ApiKeyAuthentication.ApiKeyAuth(apikey)){
            
            const string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567098"
            var password = "";
            var i =0;
            for(i;i<=7;i++){
                password = password+string.charAt(Math.floor(Math.random()*62))
            }
        res.json({pwd:password})
        console.log(password)
        }
        else{
            
            console.log("Inavlid Key generate password")
            res.json({Verification:"Inavlid API Key"})
            
        }
        
    } 
    catch(error){
        console.log(error)
        res.status(400).json(error)

    }
}





