const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'success',
      user: req.user,
      cookies: req.cookies
    })
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate'
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/login')
})

// {
//   successRedirect: '/anotherPath',
//   failureRedirect: '/' //can redirect to login failed page
// }
//login path with username, password
router.post('/login', passport.authenticate('local', {failureRedirect: '/', failureMessage: true}),
  (req, res) => {
    const userId = req.user.id;
    req.session.userId = userId;
    res.redirect('/anotherPath');
  });

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/anotherPath',
  failureRedirect: '/login/failed' //can redirect to login failed page
}))

module.exports = router;