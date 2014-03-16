var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: {type: String, required:'{PATH} is required!'},
  lastName: {type: String, required:'{PATH} is'},
  username: {type: String, required:'{PATH} is', unique: true},
  salt: {type: String, required:'{PATH} is'},
  hashed_pwd: {type: String, required:'{PATH} is'},
  roles: [{type: String, required:'{PATH} is'}]
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function (role) {
    return this.role.indexOf(role) > -1;
  }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers () {
  User.find({}).remove(function() {
    var salt, hash;
    salt = encrypt.createSalt();
    hash = encrypt.hashPwd(salt, '123');
    User.create({
      firstName: 'Deepjyoti',
      lastName: 'Khakhlary',
      username: 'deepjyoti941',
      salt: salt,
      hashed_pwd: hash,
      roles: ['admin']
    });

    salt = encrypt.createSalt();
    hash = encrypt.hashPwd(salt, '456');
    User.create({
      firstName: 'deep',
      lastName: 'Khakhlary',
      username: 'deep88',
      salt: salt,
      hashed_pwd: hash,
      roles: []
    });


    salt = encrypt.createSalt();
    hash = encrypt.hashPwd(salt, '789');
    User.create({
      firstName: 'Upasana',
      lastName: 'Talukdar',
      username: 'upasana89',
      salt: salt,
      hashed_pwd: hash
    });
  });
}

exports.createDefaultUsers = createDefaultUsers;