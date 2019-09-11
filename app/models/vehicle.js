var ottoman = require('../../db').ottoman;

var VehicleModel = ottoman.model('Vehicle', {
    police_no: 'string',
    capacity: 'string',
    cubication: 'string',
    chassis_no: 'string',
    machine_no: 'string',
    vehicle_type: 'string',
    brand: 'string',
    production_year: 'string',
    created_at: {type: "Date", default: Date.now}
},{
    index: {
        findByPolice_no: {
            by: 'police_no',
            type: 'refdoc'
        }
    }
});

ottoman.ensureIndices(function(err){
    if(err){
        return console.error('Error ensure indices Vehicle', err);
    }
});

module.exports = VehicleModel;