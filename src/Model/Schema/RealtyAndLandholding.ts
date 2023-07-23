import {Schema} from 'mongoose';
import {RealtyAndLandholdingDocument} from '../Interface/RealtyAndLandholding';

export const RealtyAndLandholdingSchema = new Schema<RealtyAndLandholdingDocument>(
  {
    created_at: {type: Date, required: true},
    properties: {
      address: {
        street: {
          number: {type: String, required: true},
          type: {type: String, required: true},
          rivoli: {type: String, required: true},
          libelle: {type: String, required: true},
        },
        postcode: {type: Number, required: true},
        municipality: {
          code: {type: Number, required: true},
          libelle: {type: String, required: true},
        },
        department: {type: String, required: true},
        section: {
          prefix: String,
          value: {type: String, required: true},
        },
      },
      mutation: {
        date: {type: String, required: true},
        nature: {type: String, required: true},
        number: {type: Number, required: true},
      },
      lots: {
        number: {type: Number, required: true},
        values: [
          {
            number: String,
            surface: Number,
          },
        ],
      },
      local: {type: String, required: true},
      surface: {
        real_built: {type: Number, required: true},
        land: Number,
      },
      rooms: {type: Number, required: true},
      nature_culture: {
        value: String,
        special: String,
      },
      property_value: {type: Number, required: true},
    },
    source: {type: String, required: true},
  },
  {collection: 'realty_and_landholdings'}
);
