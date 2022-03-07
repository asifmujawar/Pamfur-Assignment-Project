const Student = require('./models/Student')
const jwt = require('jsonwebtoken')
const authorize = async (req,res,next)=>{
    try {
        const token = req.cookies["User-TKN"]
        console.log(token)
        const verifyToken = jwt.verify(token,process.env.SECRETE)
        const rootUser = await Student.findOne({_id:verifyToken._id})

        if(!rootUser){
            throw new Error("User Not Foundd")
        }

        req.user = rootUser
        next()
    } catch (error) {
        console.log('Sign-in Error')
        return res.status(400).json({
            message:"Sign-In Required"
        })
    }
}

module.exports = authorize