import { IResolvers } from "graphql-tools";
import { Db } from "mongodb";
import { DEVELOPERS_COLLECTIONS } from "../../mongo/collections";

export const developerResolver: IResolvers = {
  Query: {
    async getDevelopers(root: void, args: void, context: Db) {
      try {
        return await context
          .collection(DEVELOPERS_COLLECTIONS)
          .find()
          .toArray();
      } catch (error) {
        console.log(error);
      }      
    },
  },

  Mutation: {
    async createDeveloper(root: void, args: any, context: Db) {
      try {
        await context
          .collection(DEVELOPERS_COLLECTIONS)
          .insertOne(args.developer);
        return "developer created successfully";
      } catch (err) {
        console.log(err);
      }
    },
  },
};
