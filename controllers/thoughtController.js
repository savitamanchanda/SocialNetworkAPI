const { User, Thought } = require('../models');


module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .populate({ path: 'reactions', select: '-__v' })
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .populate({ path: 'reactions', select: '-__v' })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // create a new thought
      createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res
                .status(404)
                .json({ message: "Thought created but no user with this id!" });
            }
    
            res.json({ message: "Thought sucessfully created!" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(dbThoughtData)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
         //.then(() => res.json({ message: 'Thought and associated reactions deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    // Add a reaction
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a reaction
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};
  