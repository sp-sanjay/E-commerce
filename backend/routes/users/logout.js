const logout = (req, res, next) => {
    try {
        res.cookie("token", null , {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.send({message: "Logout Successfully"})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = logout;