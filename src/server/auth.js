module.exports = function (app, express, secretKey) {
  const passport = require('passport')

  const LocalStrategy = require('passport-local').Strategy
  passport.use(new LocalStrategy(function(username, password, done) { 
    // insert your MongoDB check here. For now, just a simple hardcoded check.
    if (username === 'foo@foo.com' && password === 'bar') {
      done(null, { user: username })
    }
    else {
      done(null, false)
    }
  }))

  passport.serializeUser(function(user, done) { 
    // please read the Passport documentation on how to implement this. We're now
    // just serializing the entire 'user' object. It would be more sane to serialize
    // just the unique user-id, so you can retrieve the user object from the database
    // in .deserializeUser().
    done(null, user)
  })

  passport.deserializeUser(function(user, done) { 
    // Again, read the documentation.
    done(null, user)
  })

  app.use(require('cookie-parser')())
  app.use(require('body-parser').urlencoded({ extended: true }))
  app.use(require('cookie-session')({
    name: 'session',
    secret: 'seiojfowijefao28397298579823'
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.post('/login', passport.authenticate('local', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/')
    })

  app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
  })

  //testing purposes
  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.send({ user: req.user })
    })
}