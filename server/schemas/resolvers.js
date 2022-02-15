const { User, Pet } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('pets');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('pets');
    },

    allPets: async () => {
      return Pet.find();
    },

    petsByOwner: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pet.find(params).sort({ createdAt: -1 });
    },

    petsByBreed: async (parent, { breed }) => {
      const params = breed ? { breed } : {};
      return Pet.find(params).sort({ createdAt: -1 });
    },

    petById: async (parent, { _id }) => {
      return Pet.findOne({ _id });
    }
  },

  Mutation: {

    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username }).populate('pets')

      if (!user) {
        throw new AuthenticationError('Invalid username and/or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid username and/or password');
      }

      const token = signToken(user);
      return { token, user };
    },

    addPet: async (parent, args, context) => {
      if (context.user) {
        const pet = await Pet.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet._id } },
          { new: true }
        );

        return pet;
      }

      throw new AuthenticationError('You need to be logged in before adding your pet!');
    },

    removePet: async (parent, { username, petId}) => {
      const removedPet = await Pet.findByIdAndDelete(petId);
      await User.findOneAndUpdate(
        { username: username },
        { $pull: { pets: petId }},
        { new: true }
      );

      return removedPet;
    }
  }
};

module.exports = resolvers;