const jwt = require("jsonwebtoken");
const JWT_Secret = "dev@Rocks$walls";

const fetchuser = (req,res,next)=>{
    try{

        const token = req.header('auth-token');
        if(!token){
            res.status(401).send("Auth token is missing.")
        }
        const data = jwt.verify(token,JWT_Secret);
        req.user = data.user;
        next();



    }
    catch(err){
        res.status(401).send("Enter valid authentication token.")
    }

}

module.exports = fetchuser;