import { Example } from '../../Model/Example.model';

export const resolvers = {
  Query: {
    examples: async () => await Example
      .find()
      .then(examples => examples.map((e: any) => ({ ...e._doc })))
      .catch(err => console.error(err))
    ,
    example: async (_: any, { id }: { id: string; }) => await Example
      .findById(id)
      .then((example: any) => ({ ...example._doc }))
      .catch(err => console.error(err))
    ,
  },
  Mutation: {
    addExample: async (_: any, args: any) => await (new Example(args.example)).save(),
  },
};
