import mongoose from 'mongoose';
import {RealtyAndLandholdingDocument} from '../Interface/RealtyAndLandholding';
import {RealtyAndLandholdingSchema} from '../Schema/RealtyAndLandholding';

export const RealtyAndLandholdingModel = mongoose.model<RealtyAndLandholdingDocument>(
  'RealtyAndLandholding',
  RealtyAndLandholdingSchema,
  'realty_and_landholdings',
);
