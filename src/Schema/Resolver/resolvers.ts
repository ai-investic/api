import {Types} from 'mongoose';

import {RealtyAndLandholdingModel} from '../../Model/Definition/RealtyAndLandholding';
import {RealtyAndLandholdingDocument} from '../../Model/Interface/RealtyAndLandholding';
import {MunicipalityModel} from '../../Model/Definition/Municipality';
import {MunicipalityDocument} from '../../Model/Interface/Municipality';

interface QueryObject {
  [key: string]: any;
}

interface PropertyStats {
  avgPrice: number;
  avgRooms: number;
  avgBuiltArea: number;
  avgLandArea: number;
  maxPrice: number;
  maxRooms: number;
  maxBuiltArea: number;
  maxLandArea: number;
  minPrice: number;
  minRooms: number;
  minBuiltArea: number;
  minLandArea: number;
}

const getPropertyStatsByType = (realtyAndLandholdings: RealtyAndLandholdingDocument[], propertyType: string): PropertyStats => {
  const filteredProperties = realtyAndLandholdings.filter(
    (property) => property.properties.local === propertyType
  );

  const numProperties = filteredProperties.length;

  if (numProperties === 0) {
    return {
      avgPrice: 0,
      avgRooms: 0,
      avgBuiltArea: 0,
      avgLandArea: 0,
      maxPrice: 0,
      maxRooms: 0,
      maxBuiltArea: 0,
      maxLandArea: 0,
      minPrice: 0,
      minRooms: 0,
      minBuiltArea: 0,
      minLandArea: 0,
    };
  }

  const totalPrice = filteredProperties.reduce((acc, property) => acc + property.properties.property_value, 0);
  const totalRooms = filteredProperties.reduce((acc, property) => acc + property.properties.rooms, 0);
  const totalBuiltArea = filteredProperties.reduce((acc, property) => acc + (property.properties.surface?.real_built || 0), 0);
  const totalLandArea = filteredProperties.reduce((acc, property) => acc + (property.properties.surface?.land || 0), 0);

  const avgPrice = totalPrice / numProperties;
  const avgRooms = totalRooms / numProperties;
  const avgBuiltArea = totalBuiltArea / numProperties;
  const avgLandArea = totalLandArea / numProperties;

  const maxPrice = Math.max(...filteredProperties.map(property => property.properties.property_value));
  const maxRooms = Math.max(...filteredProperties.map(property => property.properties.rooms));
  const maxBuiltArea = Math.max(...filteredProperties.map(property => (property.properties.surface?.real_built || 0)));
  const maxLandArea = Math.max(...filteredProperties.map(property => (property.properties.surface?.land || 0)));

  const minPrice = Math.min(...filteredProperties.map(property => property.properties.property_value));
  const minRooms = Math.min(...filteredProperties.map(property => property.properties.rooms));
  const minBuiltArea = Math.min(...filteredProperties.map(property => (property.properties.surface?.real_built || 0)));
  const minLandArea = Math.min(...filteredProperties.map(property => (property.properties.surface?.land || 0)));

  return {
    avgPrice,
    avgRooms,
    avgBuiltArea,
    avgLandArea,
    maxPrice,
    maxRooms,
    maxBuiltArea,
    maxLandArea,
    minPrice,
    minRooms,
    minBuiltArea,
    minLandArea,
  };
};

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
    getCityPropertyStats: async (
      _: any,
      {municipality, postcode}: {
        municipality: string | null;
        postcode: number | null;
      },
    ): Promise<{ [key: string]: PropertyStats }> => {
      const query: QueryObject = {};

      if (municipality) query['properties.address.municipality.libelle'] = municipality.toUpperCase();
      if (postcode) query['properties.address.postcode'] = postcode;

      const realtyAndLandholdings = await RealtyAndLandholdingModel.find(query);
      const propertyTypes = ["Appartement", "land", "Maison"];
      const propertyStatsByType: { [key: string]: PropertyStats } = {};

      for (const propertyType of propertyTypes) {
        propertyStatsByType[propertyType] = getPropertyStatsByType(realtyAndLandholdings, propertyType);
      }

      return propertyStatsByType;
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
      {dep}: { dep: string }
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
