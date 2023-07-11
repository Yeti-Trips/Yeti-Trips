const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'success',
      user: req.uers,
      cookies: req.cookies
    })
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/login')
})

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get('/google/callback', passport.authenticate('google', {
  sucessRedirect: 'http://localhost:3000/home',
  failureRedirect: 'http://localhost:3000/login' //can redirect to login failed page
}))

module.exports = router;