const SECRETKEY = 'jwtsecretkey123'
const EXPIRESIN = '5h'
const AUTHSCHEME = 'jwt'
module.exports = {  
    jwtSecret: SECRETKEY,
    jwtSession: {
        session: false
    },
    authScheme: AUTHSCHEME,
    expiresIn: EXPIRESIN,
	port:3000,
	DBCONNECTION : 'mongodb://localhost:27017/jwtDatabase'
};