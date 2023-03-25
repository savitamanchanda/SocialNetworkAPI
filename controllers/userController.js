const { User, Reaction, Thought } = require('../models');


module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
          .select('-__v')
          .populate('thoughts')
          .populate('reactions')
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .populate('reactions')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // create a new user
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },

      updateUser(req, res) {
        Course.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((dbUserData) =>
            !dbUserData
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(dbUserData)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
              .then(Reaction.deleteMany({_id: {$in: user.reactions}}))
          )
          .then(() => res.json({ message: 'User and associated thoughts and reactions deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    // Add a friend
    addUser(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove a friend
    removeUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};
  