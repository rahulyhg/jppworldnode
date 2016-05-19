// var facebook = require('./facebook.js');
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
              req.session.user = data;
              req.session.save(function(err) {
                  if (err) {
                      res.json(err);
                  } else {
                      res.json({
                          data: "Login Successful",
                          value: true
                      });
                  }
              });
          }
      };
      passport.authenticate('facebook', {
          scope: ['public_profile', 'user_friends', 'email']
      }, callback)(req, res);
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
                      res.json({
                          data: "Login Successful",
                          value: true
                      });
                  }
              });
          }
      };
      passport.authenticate('twitter', {}, callback)(req, res);
  },
	findLimited: function (req, res) {
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
  /* make the API call */
  // facebook:getFbData('1745055379070800', '/me/friends', function(data){
  //     console.log(data);
  // })


};
