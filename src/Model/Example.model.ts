import mongoose, { Schema } from 'mongoose';

export const Example = mongoose.model(
  'example',
  new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  }),
);
