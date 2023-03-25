const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
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
    email: {
      type: String,
      required: true,
    },
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    thoughts: [ 
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          }, 
    ]
  },
  {
    toJSON: {
        virtuals: true,
      },
      id: false,
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

userSchema
  .virtual('thoughtCount')
  // Getter
  .get(function () {
    return this.thoughts.length;
  }); 

  userSchema
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

const User = model('user', userSchema);

module.exports = User;
