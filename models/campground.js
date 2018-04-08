var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    site: String,
    url: String,
    description: String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);