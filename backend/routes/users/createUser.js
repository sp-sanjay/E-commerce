const UserModel = require('../../models/userModel')
const getToken = require('../../utils/getToken')

const createUser = async (req, res, next) => {
    try {
        const user = await UserModel.create(req.body);
        //always use above response to call model methods like getJWTToken, comaprePasssword
        // const token = await user.getJWTToken();
        // res.status(201).send({token})
        await getToken(user,201,res)

    } catch(err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = createUser;