let express = require('express');
let router = express.Router();
const {auth} = require('../middelware/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', auth, function(req, res, next) {
  res.render('components/chat', );
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(err=>{
    if(err) {
      return  res.redirect('/chat');
    } 

    res.clearCookie('sessionName')
    res.redirect('/login');

  })
});




module.exports = router;
