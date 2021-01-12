module.exports.auth = function(req, res, next ){
    if (req.session.user) {
        next()
        
       }else{
          let err = new Error('user is not logged in')
           res.redirect('/login')
           next(err)
       }
   }
