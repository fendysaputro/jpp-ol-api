let config = require('./config');
let couchbase = require('couchbase');
let ottoman = require('ottoman');

let endpointURL = config.couchbase.endpoint;
let bucketName = config.couchbase.jppolbucket;
let user = config.couchbase.user;
let password = config.couchbase.password;

var cluster = new couchbase.Cluster(endpointURL);
cluster.authenticate(user, password);
var bucket = cluster.openBucket(bucketName);
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

module.exports = {
    couchbase: couchbase,
    ottoman: ottoman,
    bucket: bucket
};