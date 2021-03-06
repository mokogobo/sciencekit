var mongoose = require("mongoose")
var Moment = require("moment")

var storySchema = new mongoose.Schema({
  timeline: { type: mongoose.Schema.ObjectId, ref: "Timeline", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  title: { type: String, default: "Unnamed Story" },
  hidden: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
})

storySchema.statics.getPopulated = function(story, fn) {
  this.findById(story.id, function(err, story) {
    story.populate({ path: "author" }, function(err, populatedAuthor) {
      fn(err, story)
    })
  })
}

storySchema.statics.getPopulated2 = function(story, fn) {
  story.populate({ path: "author" }, function(err, populatedAuthor) {
    fn(err, story)
  })
}

module.exports = mongoose.model("Story", storySchema)
