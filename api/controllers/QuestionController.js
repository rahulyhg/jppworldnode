module.exports = {

  save: function(req, res) {
    if (req.body) {
      Question.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  storeAnswer: function(req, res) {
    if (req.body) {
      if (req.session.user) {
        req.body.user = req.session.user._id;
        Question.storeAnswer(req.body, res.callback);
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
  storeLevel2: function(req, res) {
    if (req.body) {
      if (req.session.user) {
        req.body.user = req.session.user._id;
        Question.storeLevel2(req.body, res.callback);
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
      Question.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getQuestionDetail: function(req, res) {
    req.body.user = req.session.user._id;
    if (req.body.user) {
      Question.getQuestionDetail(req.body, res.callback);
    } else {
      res.json({
        data: "User not logged in",
        value: false
      });
    }
  },

  delete: function(req, res) {
    if (req.body) {
      Question.deleteData(req.body, res.callback);
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
      Question.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  findLimited: function(req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        Question.findLimited(req.body, res.callback);
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
};
