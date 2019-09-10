const hash = require('crypto');
module.exports = {
    HashMD5: (val) => {
        return hash('md5').update(val).digest('hex');
    }
}