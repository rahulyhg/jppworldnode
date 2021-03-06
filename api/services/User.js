var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  status: {
    type: Number,
    default: ""
  },
  armyName: {
    type: String,
    default: ""
  },
  friend1: {
    type: String,
    default: ""
  },
  friend2: {
    type: String,
    default: ""
  },
  friend3: {
    type: String,
    default: ""
  },
  friend4: {
    type: String,
    default: ""
  },
  friend5: {
    type: String,
    default: ""
  },
  friend6: {
    type: String,
    default: ""
  },
  oauthLogin: {
    type: [{
      socialProvider: String,
      socialId: String,
      modificationTime: Date
    }],
    index: true
  },
  friend1image: {
    type: String,
    default: ""
  },
  friend2image: {
    type: String,
    default: ""
  },
  friend3image: {
    type: String,
    default: ""
  },
  friend4image: {
    type: String,
    default: ""
  },
  friend5image: {
    type: String,
    default: ""
  },
  friend6image: {
    type: String,
    default: ""
  },
  K120K200: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  }

});

module.exports = mongoose.model('User', schema);
var models = {
  saveData: function(data, callback) {
    var user = this(data);
    user.timestamp = new Date();
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).exec(function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (updated) {
          callback(null, updated);
        } else {
          callback(null, {});
        }
      });
    } else {
      user.save(function(err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          callback(null, created);
        } else {
          callback(null, {});
        }
      });
    }
  },
  storeUserData: function(data, callback) {
    console.log(data);
    this.findOneAndUpdate({
      _id: data.user
    }, data).exec(function(err, updated) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (updated) {
        callback(null, updated);
      } else {
        callback(null, {});
      }
    });

  },
  deleteData: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, deleted) {
      if (err) {
        callback(err, null);
      } else if (deleted) {
        callback(null, deleted);
      } else {
        callback(null, {});
      }
    });
  },
  getAll: function(data, callback) {
    this.find({}).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  getOne: function(data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
      } else {
        callback(null, {});
      }
    });
  },
  findLimited: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          User.count({
            armyName: {
              '$regex': check
            }
          }).exec(function(err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number !== "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function(callback) {
          User.find({
            armyName: {
              '$regex': check
            }
          }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  }
};

module.exports = _.assign(module.exports, models);
