import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  interests: {
    type: [String],
    default: ['Forgot', 'to', 'add', 'interests'],
  },
});

export const User = model('User', userSchema);
