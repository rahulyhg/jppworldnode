var request = require('request');
var redirect = "http://localhost:8080/#/panther-army";
module.exports = {

  save: function(req, res) {
    if (req.body) {
      User.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  storeUserData: function(req, res) {
    if (req.body) {
      if (req.session.user) {
        req.body.user = req.session.user._id;
        User.storeUserData(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "User Not Logged In"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function(req, res) {

    if (req.body) {
      User.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function(req, res) {
    if (req.body) {
      console.log(req.body);
      User.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function(req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      User.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  loginFacebook: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        if (data._id) {
          req.session.user = data;
          req.session.save(function(err) {
            if (err) {
              res.json(err);
            } else {
              res.redirect(redirect);
            }
          });
        } else {
          res.json({
            data: "User not found",
            value: false
          });
        }
      }
    };
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_friends', 'email']
    }, callback)(req, res);
  },

  profile: function(req, res) {
    var user = req.session.user;
    if (user) {
      res.json({
        data: user,
        value: true
      });
    } else {
      res.json({
        data: "User not logged in",
        value: false
      });
    }
  },
  loginTwitter: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        // console.log(req.session);
        req.session.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json(
              res.redirect(redirect)
            );
          }
        });
      }
    };
    passport.authenticate('twitter', {}, callback)(req, res);
  },

  findLimited: function(req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        User.findLimited(req.body, res.callback);
      } else {
        res.json({
          value: false,
          data: "Please provide parameters"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getFacebookDetails: function(req, res) {
    if (req.session.user) {
      var $access_token = req.session.user.K120K200;
      request.get('https://graph.facebook.com/v2.6/me/taggable_friends?access_token=' + $access_token + '&format=json&limit=1000', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body); // Show the HTML for the Google homepage.
          res.json({
            value: true,
            data: body
          });
        }
      });
    }



  },

  /* make the API call */
  // facebook:getFbData('1745055379070800', '/me/friends', function(data){
  //     console.log(data);
  // })


};
