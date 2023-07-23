import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { gql } from 'graphql-tag';
import {DocumentNode} from "graphql/language";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const definitionFilesDir = join(__dirname, 'Definition');
const mutationFilesDir = join(__dirname, 'Mutation');
const queryFilesDir = join(__dirname, 'Query');

const importTypeDefs = (dirPath: string): string[] => {
  const files = readdirSync(dirPath, {withFileTypes: true});
  const typeDefs: string[] = [];

  files.forEach((file) => {
    const filePath = join(dirPath, file.name);

    if (file.isFile() && file.name.endsWith('.graphql')) {
      const fileContent = readFileSync(filePath, 'utf8');
      typeDefs.push(fileContent);
    } else if (file.isDirectory()) {
      const subDirTypeDefs = importTypeDefs(filePath);
      typeDefs.push(...subDirTypeDefs);
    }
  });

  return typeDefs;
};

const definitionTypeDefs: string[] = importTypeDefs(definitionFilesDir);
const mutationTypeDefs: string[] = importTypeDefs(mutationFilesDir);
const queryTypeDefs: string[] = importTypeDefs(queryFilesDir);

const mergedTypeDefs: string = [...definitionTypeDefs, ...mutationTypeDefs, ...queryTypeDefs].join('\n');

export const typeDefs: DocumentNode = gql(mergedTypeDefs);
