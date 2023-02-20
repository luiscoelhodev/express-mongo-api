import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  socialSecurityNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  interests: {
    type: [String],
    default: ['Forgot', 'to', 'add', 'interests'],
  },
});

export const User = model('User', userSchema);
