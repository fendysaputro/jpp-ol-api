var ottoman = require('../../db').ottoman;
var SalesInvoiceDetailModel = ottoman.model('SalesInvoiceDetail', {
    SINum: 'string',
    quantity: 'number',
    description: 'string',
    vehicel: { ref: 'Vehicle'},
    unit_price: 'number',
    sub_total: 'number',
    created_at: {type: "Date", default: Date.now}
}, {
    index: {
        findBySINum: {
            by: 'SINum',
            type: 'refdoc'
        }
    }
});

ottoman.ensureIndices(function(err){
    if (err){
        return console.error('Error ensure indices SalesInvoiceDetail', err);
    }
});

module.exports = SalesInvoiceDetailModel;