const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
    thoughts: [ 
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
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

const User = model('user', userSchema);

module.exports = User;
