const { Schema, model, Types } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    rText: {
      type: String,
      required: true,
      max_length: 350,
    },
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
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

module.exports = reactionSchema;