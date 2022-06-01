const { Schema, model, Types } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is a required field!'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'The phone is a required field!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'The email is a required field!'],
      trim: true,
      unique: false,
    },
    address: {
      type: String,
      trim: true,
      unique: false,
    },
    other: {
      type: String,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
