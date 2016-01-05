var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 7070;


var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';
    
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tweb-site1'
    },
    port: port,
    db: mongoUri
  },

  test: {
    root: rootPath,
    app: {
      name: 'tweb-site1'
    },
    port: port,
    db: mongoUri
  },

  production: {
    root: rootPath,
    app: {
      name: 'tweb-site1'
    },
    port: port,
    db: mongoUri
  }
};

module.exports = config[env];
