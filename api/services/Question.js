var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  question1option: {
    type: String,
    default: ""
  },
  question2option: {
    type: String,
    default: ""
  },
  question3option: {
    type: String,
    default: ""
  },
  question4option: {
    type: String,
    default: ""
  },
  question5option: {
    type: String,
    default: ""
  },
  question6option: {
    type: String,
    default: ""
  },
  speedTime: {
    type: String,
    default: ""
  },
  speedClick: {
    type: String,
    default: ""
  },
  accuracy: {
    type: String,
    default: ""
  },
  memory: {
    type: Date,
    default: Date.now
  },
  intelligence: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model('Question', schema);
var models = {
  saveData: function(data, callback) {
    var question = this(data);
    question.timestamp = new Date();
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
      question.save(function(err, created) {
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


  storeAnswer: function(data, callback) {
    var question = this(data);
    question.timestamp = new Date();
    this.findOne({
      "user": data.user
    }).exec(function(err, found) {
      if (err) {
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
      } else {
        question.save(function(err, created) {
          if (err) {
            callback(err, null);
          } else if (created) {
            callback(null, created);
          } else {
            callback(null, {});
          }
        });
      }
    });

  },
  storeLevel2: function(data, callback) {
    this.findOneAndUpdate({
      "user": data.user
    }, data).exec(function(err, created) {
      if (err) {
        callback(err, null);
      } else if (created) {
        callback(null, created);
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
    }).populate("user").exec(function(err, found) {
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
  getQuestionDetail: function(data, callback) {
    this.findOne({
      "user": data.user
    }).populate("user").exec(function(err, found) {
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
          Question.count({
            question1option: {
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
          Question.find({
            question1option: {
              '$regex': check
            }
          }).populate("user").skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
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
