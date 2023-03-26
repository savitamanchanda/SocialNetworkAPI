const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      max_length: 350,
    },
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
    reactions: [reactionSchema],

      createdAt: {
        type: Date,
        default: Date.now,
      },
  },
  {
    toJSON: {
        virtuals: true,
      },
      id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;