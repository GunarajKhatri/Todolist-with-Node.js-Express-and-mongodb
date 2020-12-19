var User=require('../Model/User');
const bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

module.exports=function (passport){
passport.use(new LocalStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
},
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, data) => {
        //if error than throw error
        if (err) throw err

        //if both match than you can do anything
        if (data) {
            return done(null, true, {message: 'login success'});
        } else {
            
            return done(null, false, {message: 'Wrong password'});
        }

    });
   
      
    });
  }
));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
})
}
