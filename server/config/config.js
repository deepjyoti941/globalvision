var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost/globalvision',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://deepjyoti941:wkqlzrbv@ds029107.mongolab.com:29107/globalvision',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}
