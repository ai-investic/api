export const typeDefs = `#graphql
  type Example {
    _id: ID,
    title: String!,
    description: String,
  },

  type Query {
    examples: [Example],
    example(id: ID): Example,
  },

  input ExampleInput {
    title: String,
    description: String,
  },

  type Mutation {
    addExample(example: ExampleInput): Example,
  },
`;
