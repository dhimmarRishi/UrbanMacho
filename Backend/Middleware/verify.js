const {User} = require("../Model/User")
const jwt = require('jsonwebtoken')

const forLoggedUsersOnly = async(req , res, next ) => {
    try{
        if(!req.body.key) return res.status(401).json({msg : 'Invalid key Try logging again'})
    
        const valid = jwt.verify(req.body.key , "PRIVATE_KEY");
            
        if(!valid) {
            console.log("Token is invalid");
            return res.status(403).json({Msg : "Invalid token"})
        }
        
        req.email = valid.e_id;
        next()
    }catch(e) {
        console.log(e)
    }
    

}

module.exports = {
    forLoggedUsersOnly
}