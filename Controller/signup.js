let User = require('../model/user')

let bcrypt = require('bcrypt')
module.exports.getSignup = (req, res, next) => {
    res.render('signup');
}


module.exports.postSignup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.redirect('/login');

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const newUser = new User({ username, password: hashedPassword,isadmin:false });
        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Signup Error');
    }
};
