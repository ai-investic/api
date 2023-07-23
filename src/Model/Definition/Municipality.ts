import {model} from 'mongoose';
import {MunicipalityDocument} from '../Interface/Municipality';
import {MunicipalitySchema} from '../Schema/Municipality';

export const MunicipalityModel = model<MunicipalityDocument>(
  'Municipality',
  MunicipalitySchema,
  "municipalities",
);
