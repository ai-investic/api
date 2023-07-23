import {Schema} from 'mongoose';
import {MunicipalityDocument} from '../Interface/Municipality';

export const MunicipalitySchema = new Schema<MunicipalityDocument>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Schema.Types.Mixed,
      required: true,
    }
  },
  country: {
    type: Number,
    required: true,
  },
  cityAvgPropertyValue: {
    type: Number,
    required: false,
  }
});

