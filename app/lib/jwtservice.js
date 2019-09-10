const fs = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync('./private.key', 'utf8');
var publicKEY = fs.readFileSync('./public.key', 'utf8');

module.exports = {
    privateKEY: () => {
        return privateKEY;
    },
    publicKEY: () => {
        return publicKEY;
    }, 
    sign: (payload, $Options) => {
        var signOption = {
            issuer: $Options.issuer,
            subject: $Options.subject,
            audience: $Options.audience,
            expiresIn: "30d",
            algorithm: "RS256"
        };
        return jwt.sign(payload, privateKEY, signOption);
    },
    verify: (token, $Options) => {
        var verifyOptions = {
            issuer: $Options.issuer,
            subject: $Options.subject,
            audience: $Options.audience,
            expiresIn: "30d",
            algorithm: ["RS256"]
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
        } catch (err){
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, {complete: true});
    }
}