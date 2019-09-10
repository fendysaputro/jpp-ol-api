var ottoman = require('../../db').ottoman;
var UserModel = ottoman.model('User', {
    name: 'string',
    phone: 'string',
    email: 'string',
    password: 'string',
    token: 'string',
    types: 'string',
    created_at:{types: "Date", default: Date.now}
}, {
    index: {
        findByPhone: {
            by: 'phone',
            type: 'refdoc'
        }, 
        findByEmail: {
            by: 'email',
            type: 'refdoc'
        }
    }
});

ottoman.ensureIndices(function(err){
    if(err){
        return console.log('Error ensure indices USER', err);
    }
});

module.exports = UserModel;