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
      max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
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