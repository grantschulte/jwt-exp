const router = require('express').Router();
const checkAuth = require('./auth.mid');

router.use(checkAuth());

router.get('/', (req, res, next) => {
  console.log('req.user', req.user);
  return res.json({ user: req.user });
});

module.exports = router;