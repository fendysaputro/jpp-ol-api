var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
var originConfig = require('./db/origin');
var cors = require('cors');
const corsOption = {
    origin: function(origin, callback){
        console.log('access by origin: ', origin);
        if (originConfig.whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOption));

var api_version_1 = 'v1';
var userRoute = require('./app/routers/user');

app.use('/apis/'+api_version_1+'/user', userRoute);

var InsertRoute = require('./app/routers/bulkinsert');
app.use('/api/'+api_version_1+'/insert', InsertRoute);

var port = process.env.PORT || 8001;
app.listen(port);
console.log("Go to http://localhost:" + port);