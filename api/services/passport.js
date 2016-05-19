var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
module.exports = require("passport");


module.exports.use(new FacebookStrategy({
        clientID: "1745055379070800",
        clientSecret: "426da60c20fbda59b05202d3531b5739",
        callbackURL: "/user/loginFacebook/",
        enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(refreshToken);
        if (!_.isEmpty(profile)) {
            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
              console.log(data);
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "K120K200":accessToken,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };

                    if (_.isEmpty(data)) {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    } else {
                        done(err, data);
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));


module.exports.use(new TwitterStrategy({
        consumerKey: "g3dfZHQRzRk1q3tjsvRPMz4aC",
        consumerSecret: "GChwtbgxn3ZbYogqCnFmuvJoPHpFKodVLHH2WLSvhG7feURyhJ",
        callbackURL: "/user/loginTwitter/",
    },
    function(token, tokenSecret, profile, done) {

        if (!_.isEmpty(profile)) {

            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };

                    if (_.isEmpty(data)) {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    } else {
                        done(err, data);
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));
