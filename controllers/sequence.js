// Controller
// Exports methods for Account model.
var passport = require('passport')
	, socketio = require('socket.io')
	, Account = require('../models/account')
	, Sequence = require('../models/sequence')
	, Inquiry = require('../models/inquiry');

// [Source: http://codahale.com/how-to-safely-store-a-password/]
exports.create = [
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // TODO: Make sure required parameters are present, correct

        console.log(req.body);

        Account.findById(req.user.id, function(err, account) {

            var entryTemplate = req.body;
            entryTemplate.account = account;
            console.log("Received: ");
            console.log(entryTemplate);
            console.log("Timeline = %s", entryTemplate.timeline);


            Inquiry.addSequence(entryTemplate, function(err, entry) {
                io.sockets.emit('sequence', entry);
                res.json(entry);
            });
        });
    }
];