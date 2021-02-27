let passport = require("passport");  
let passportJWT = require("passport-jwt");  
let users = require("./schema.js");  
let cfg = require("./config.js");  
let ExtractJwt = passportJWT.ExtractJwt;  
let Strategy = passportJWT.Strategy;  
let opts = {}
opts.secretOrKey= cfg.jwtSecret
opts.jwtFromRequest= ExtractJwt.fromAuthHeaderWithScheme(cfg.authScheme)

module.exports =  function() {  
    var strategy = new Strategy(opts,async function(payload, done) {
	console.log(payload);
	
	
	var user = await users.findOne({_id : payload.id})
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
     });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate(cfg.authScheme, cfg.jwtSession);
        }
    };
};
