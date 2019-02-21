require('dotenv').load();
const express       = require('express');
const jwt           = require('jsonwebtoken');
const morgan        = require('morgan');
const memberRouter  = require('./member.router');
const app           = express();

app.set('PORT', process.env.PORT || 3001);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

let testUser = {
  username: 'grant',
  password: 'pass1234',
  id: 1234
};

app.get('/', (req, res) => {
  return res.json({ public: true });
});

app.post('/auth/login', (req, res, next) => {
  let { username, password } = req.body;
  
  if (username !== testUser.username
    || password !== testUser.password) {
    return res
      .status(401)
      .json({
        message: 'Username and password to not match.'
      });
  }
  
  try {
    let token = jwt.sign({
      userId: testUser.id
    }, process.env.JWT_SECRET, {
      expiresIn: (60 * 1),
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    });

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

app.use('/profile', memberRouter)

app.use((err, req, res, next) => {
  console.log(err);
  res.json(err);
});

app.listen(app.get('PORT'), () => {
  console.log(`App listening on port ${app.get('PORT')}`);
});