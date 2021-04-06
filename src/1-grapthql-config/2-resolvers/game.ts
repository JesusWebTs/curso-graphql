import { IResolvers } from "graphql-tools";
import { Db, ObjectID } from "mongodb";
import data from "../../2-data/data.json";
import {
  DEVELOPERS_COLLECTIONS,
  GAMES_COLLECTIONS,
} from "../../mongo/collections";
export const gameResolver: IResolvers = {
  Query: {
    async getGames(root: void, args: any, context: Db) {
      try {
        return await context.collection(GAMES_COLLECTIONS).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createGame(root: void, args: any, context: Db) {
      try {
        context.collection(GAMES_COLLECTIONS).insertOne(args.game);
        return `Game ${args.game.title} added successfully`;
      } catch (error) {}
    },
  },
  Game: {
    async developers(root: any, args: any, context: Db) {
      const devList = root.developers.map(async (id: string) => {
        return await context
          .collection(DEVELOPERS_COLLECTIONS)
          .findOne({ _id: new ObjectID(id) })
          .then((dev) => {
            return dev;
          });
      });
      return devList;
    },
  },
};
