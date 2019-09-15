var ottoman = require('../../db').ottoman;

var SalesInvoiceModel = ottoman.model('SalesInvoice', {
    SINum: 'string',
    SIDate: {type: 'Date'},
    customer: { ref: 'Customer'},
    refNo: 'String',
    ppn: 'number',
    pph: 'number',
    total: 'number',
    SIDetails: [
        {ref: 'SalesInvoiceDetail'}
    ],
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
        return console.error('Error ensure indices SalesInvoice', err);
    }
});

module.exports = SalesInvoiceModel;