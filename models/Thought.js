const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      max_length: 350,
    },
    first: {
        type: String,
        required: true,
        max_length: 50,
    },
      last: {
        type: String,
        required: true,
        max_length: 50,
    },
    reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Reaction',
        },
      ],
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

  thoughtSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;