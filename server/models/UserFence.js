const mongoose = require('mongoose')

const userFence = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // to associate fence with user logged in
        ref:'user'
      },
      fenceLat: {
        type: [Number],
        required: true
      },
      fenceLon: {
        type: [Number],
        required: true
      },
      isSafe: {
        type: Boolean,
      }
})

module.exports = mongoose.model("fences",userFence)