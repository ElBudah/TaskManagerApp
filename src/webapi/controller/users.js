const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const database = require('../db');
    const User = require('../users');

    let userName = req.body.txtName;
    let userPassword = req.body.txtPassword;

    await database.sync();

    const LoginUser = await User.findOne({
        where: {
            name: userName,
            password: userPassword
        }
    })

    if (LoginUser == null) {
        res.json({ value: 'invalid' });
    } else {

        const token = jwt.sign({ userID: 1 }, 'test123', { expiresIn: 7000 })
        console.log(token)
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 36000000,
        }).json({
            value: 'valid', name: LoginUser.name
        });
    }
}

const logout = async(req,res) => {
    res.clearCookie('token').send('ok')
}

module.exports = {
    login, logout,
}