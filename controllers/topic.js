// Controller
// Exports methods for Account model.
var passport = require('passport')
	, socketio = require('socket.io')
	, Account = require('../models/account')
	, Topic = require('../models/topic')
    , Perspective = require('../models/perspective')
	, Story = require('../models/story');

// [Source: http://codahale.com/how-to-safely-store-a-password/]
exports.create = [
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // TODO: Make sure required parameters are present, correct

        console.log(req.body);

        Account.findById(req.user.id, function(err, account) {

            var activityTemplate = req.body;
            activityTemplate.account = account;
            console.log("Received Topic: ");
            console.log(activityTemplate);
            console.log("Timeline = %s", activityTemplate.timeline);

            // TODO: Verify valid JSON
            // TODO: Verify required fields for element are present

            Story.addTopic(activityTemplate, function(err, moment) {
                io.sockets.emit('topic', moment); // TODO: is this the wrong place?  better place?  guaranteed here?
                res.json(moment);
            });
        });
    }
];

// PUT /api/topic
exports.update = [
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // TODO: Make sure required parameters are present, correct

        console.log(req.body);

        Account.findById(req.user.id, function(err, account) {

            var topicTemplate = req.body;
            topicTemplate.account = account;
            console.log("Received: ");
            console.log(topicTemplate);
            console.log("Timeline = %s", topicTemplate.timeline);

            // TODO: Verify valid JSON
            // TODO: Verify required fields for element are present

            Perspective.findOne({ frame: topicTemplate.frame, account: account }, function(err, perspective) {
                if (topicTemplate.hasOwnProperty('active')) {
                    perspective.active = topicTemplate.active;
                }

                if (topicTemplate.hasOwnProperty('visible')) {
                    perspective.visible = topicTemplate.visible;
                }

                if (topicTemplate.hasOwnProperty('activity')) {
                    perspective.activity = topicTemplate.activity;
                }

                perspective.save(function(err) {
                    if(err) throw err;

                    //io.sockets.emit('thought', moment); // TODO: is this the wrong place?  better place?  guaranteed here?
                    //res.json(moment);
                    res.json(perspective);
                });
            });
        });
    }
];