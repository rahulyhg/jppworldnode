var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
module.exports = require("passport");


module.exports.use(new FacebookStrategy({
        clientID: "1211267655585226",
        clientSecret: "06460de4058ce9fd6ff6e074787ab723",
        callbackURL: "/user/loginFacebook/",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
        if (!_.isEmpty(profile)) {
            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
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
                    if (profile.photos && profile.photos.length > 0) {
                        usertemp.profilePic = profile.photos[0].value;
                    }
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
        consumerKey: "ScyOXj37xkvmkY9hi6edFsLaz",
        consumerSecret: "4J1vaHxX1rr84ygGHBrADkFQS32Nb9lNkHKwRuM4ykfwgVj9qh",
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
                    if (profile.photos && profile.photos.length > 0) {
                        usertemp.profilePic = profile.photos[0].value;
                    }
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
