const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    rText: {
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

 reactionSchema
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

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;