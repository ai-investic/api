import {Document, Schema} from 'mongoose';

export interface MunicipalityDocument extends Document {
  name: string;
  code: string;
  geometry: {
    type: string;
    coordinates: Schema.Types.Mixed;
  };
  country: number;
  cityAvgPropertyValue: number;
}
