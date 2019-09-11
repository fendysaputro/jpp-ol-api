var ottoman = require('../../db').ottoman;

var CustomerModel = ottoman.model('Customer', {
    name: 'string',
    phone: 'string',
    email: 'string',
    password: 'string',
    contact_person: 'string',
    token: 'string',
    types: 'string',
    created_at: {type: "Date", default: Date.now}
}, {
    index: {
        findByEmail: {
            by: 'email',
            type: 'refdoc'
        }
    }
});

ottoman.ensureIndices(function(err){
    if (err){
        return console.log('Error ensure indices Customer', err);
    }
});

module.exports = CustomerModel;