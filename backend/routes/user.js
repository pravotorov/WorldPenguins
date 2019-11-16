const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post(
  '/register',
  [ 
    check('login', 'errors login').isLength({ min: 3 }),
    check('password', 'errors password').isLength({ min: 8 }),
    check('email', 'errors email').isEmail(),
    check('phone', 'errors phone')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    console.log(req.body);

    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }
    //Mail check
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');
        
    // HASH the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    try {
      const { login, email, phone } = req.body;
          
      const newUser = await new User({
        login,
        password: hashedPassword,
        email,
        phone
      });

      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }
);


//LOGIN
router.post('/login', async (req,res) =>{
  try {
    //CHECKING IF THE EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email in not found');

    //PASSWORD IS CORRECT 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password'); 
   
    //Create and assing a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('token', token).send(token);

  } catch (err) {
    res.send(err.message);
  }
  
});


router.get('/validity', async (req, res) => {
  try {
    if (!req.query.token) {
      res.status(404).send('you are not authorized');
    }
    const tokenValidity = jwt.decode(req.query.token, process.env.TOKEN_SECRET);

    User.findById(tokenValidity._id)
    .then(user => res.send(user))
    .catch(err => res.status(400).json('Error: ' + err));
   
  } catch (err) {
    res.status(404).send('you are not authorized');
  }
});




module.exports = router;
