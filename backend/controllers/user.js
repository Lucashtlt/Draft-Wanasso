const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/User')
const dotenv = require('dotenv');

dotenv.config();


exports.signup = (req, res, next) => {
    console.log("req" + req.body.password + req.body.email)
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        console.log('user' + user)
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));

    })

    
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.jwtsecretkey,
                            { expiresIn: '24h' }
                        ),
                        expiresIn: '24' 
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};