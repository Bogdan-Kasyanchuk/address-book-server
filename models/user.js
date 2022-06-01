const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is a required field!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'The email is a required field!'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'The password is a required field!'],
      trim: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

module.exports = User;
