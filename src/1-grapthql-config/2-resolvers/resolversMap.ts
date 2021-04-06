import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {    
    getCharacters() {
      return [
        {
          id: 1,
          name: "Link",
          race: "GERUDO",
        },
        {
          id: 2,
          name: "Selda",
          race: "HYLIAN",
        },
      ];
    },
  },
};

export default resolvers;
