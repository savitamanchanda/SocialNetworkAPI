const { User, Reaction, Thought } = require('../models');


module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
          .select('-__v')
          .populate('reactions')
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .populate('reactions')
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
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(500).json(err));
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
              : Reaction.deleteMany({ _id: { $in: user.reactions } })
          )
          .then(() => res.json({ message: 'Thought and associated reactions deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    // Add a reaction
    addReaction(req, res) {
      console.log('You are adding a reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
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
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
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
  