const UserModel = require('../../models/userModel');
const getToken = require('../../utils/getToken')
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            throw new Error("Enter Email or Password")
        }
        const user = await UserModel.findOne({email}).select("+password");
        if(!user) {
            throw new Error("Inavlid Email or Password")
        }
        //always use above response to call model methods like getJWTToken, comaprePasssword
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            throw new Error("Inavlid Email or Password")
        }
        //always use above response to call model methods like getJWTToken, comaprePasssword
        // const token = await user.getJWTToken();
        // res.send({user,token})
        await getToken(user,200,res)
    } catch(err) {
        res.status(401).send(err.message)
    }
}

module.exports = loginUser;