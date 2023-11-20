const getToken = async (user, statuscode, res) => {
    const currentUser = user.toObject(); //convert user to object if you want to use any object method like delete 
    delete currentUser.password;
    const token = await user.getJWTToken();
    const expirationTime = new Date(Date.now() + process.env.COOKIE_EXPIRY * 60 * 60 * 1000);
    res.status(statuscode).cookie('token', token, {
        httpOnly: true,
        expires: expirationTime
      }).send({user: currentUser, token});
}

module.exports = getToken;