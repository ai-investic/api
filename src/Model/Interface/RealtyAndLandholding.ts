import {Document} from 'mongoose';

export interface RealtyAndLandholdingDocument extends Document {
  created_at: Date;
  properties: {
    address: {
      street: {
        number: string;
        type: string;
        rivoli: string;
        libelle: string;
      };
      postcode: number;
      municipality: {
        code: number;
        libelle: string;
      };
      department: string;
      section: {
        prefix: string | null;
        value: string;
      };
    };
    mutation: {
      date: string;
      nature: string;
      number: number;
    };
    lots: {
      number: number;
      values: {
        number: string | null;
        surface: number | null;
      }[];
    };
    local: string;
    surface: {
      real_built: number;
      land: number | null;
    };
    rooms: number;
    nature_culture: {
      value: string | null;
      special: string | null;
    };
    property_value: number;
  };
  source: string;
}
