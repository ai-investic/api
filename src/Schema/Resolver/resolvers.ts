import {Types} from 'mongoose';

import {RealtyAndLandholdingModel} from '../../Model/Definition/RealtyAndLandholding';
import {RealtyAndLandholdingDocument} from '../../Model/Interface/RealtyAndLandholding';
import {MunicipalityModel} from '../../Model/Definition/Municipality';
import {MunicipalityDocument} from '../../Model/Interface/Municipality';

interface QueryObject {
  [key: string]: any;
}

export const resolvers = {
  Query: {
    realtyAndLandholding: (
      _: any,
      {id}: { id: string },
    ): Promise<RealtyAndLandholdingDocument> => {
      if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ID: ${id}`);

      return RealtyAndLandholdingModel.findById(id)
        .then((realtyAndLandholding: RealtyAndLandholdingDocument | null) => {
          if (!realtyAndLandholding) throw new Error(`Realty and landholding with ID ${id} not found.`);

          return realtyAndLandholding;
        })
        .catch((error: Error) => {
          console.error(error);
          throw error;
        });
    },
    getCityAvgPropertyValue: async (
      _: any,
      {municipality, postcode}: {
        municipality: string | null,
        postcode: number | null,
      }
    ): Promise<number> => {
      const query: QueryObject = {};

      if (municipality) query['properties.address.municipality.libelle'] = municipality.toUpperCase();
      if (postcode) query['properties.address.postcode'] = postcode;

      const realtyAndLandholdings = await RealtyAndLandholdingModel
        .find(query)
        .then((realtyAndLandholdings: RealtyAndLandholdingDocument[]) => realtyAndLandholdings)
        .catch((error: Error) => {
          console.error(error);
          throw error;
        })

      const totalProperties = realtyAndLandholdings.length;
      const totalPropertyValue = realtyAndLandholdings.reduce(
        (acc, property) => acc + property.properties.property_value,
        0,
      );

      return totalPropertyValue / totalProperties;
    },
    municipalityByName: async (
      _: any,
      {name}: {
        name: string
      }
    ): Promise<MunicipalityDocument | null> => await MunicipalityModel
      .findOne({name})
      .then((municipalityByName: MunicipalityDocument | null) => municipalityByName)
      .catch((error: Error) => {
        console.error(error);
        throw error;
      })
    ,
    municipalitiesByDep: async (
      _: any,
      {dep}: {dep: string}
    ): Promise<MunicipalityDocument[]> => {
      const query: QueryObject = {};

      if (dep) query["code"] = new RegExp("^" + dep, "i");

      return await MunicipalityModel
        .find(query)
        .then((allMunicipalities: MunicipalityDocument[]) => allMunicipalities)
        .catch((error: Error) => {
          console.error(error);
          throw error;
        })
      ;
    },
  },
  Mutation: {
    addRealtyAndLandholding: (
      _: any,
      {input}: { input: RealtyAndLandholdingDocument },
    ): Promise<RealtyAndLandholdingDocument> => RealtyAndLandholdingModel
      .create(input)
      .then((realtyAndLandholding: RealtyAndLandholdingDocument) => realtyAndLandholding)
      .catch((error: Error) => {
          console.error(error);
          throw error;
        }
      )
    ,
  },
};
