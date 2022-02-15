const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    breed: {
      type: String,
      required: true,
      trim: true
    },
    birthday: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Pet = model('Pet', petSchema);

module.exports = Pet;