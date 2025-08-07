const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
    res.render('login');
};

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.redirect('/signup');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/login');
        }
        req.session.user = {
            id: user._id,
            username: user.username,
            isadmin: user.isadmin
        };

        res.redirect('/profile');

    } catch (error) {
        console.error(error);
        res.status(500).send('Login Error');
    }
};
