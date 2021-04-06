import { IResolvers } from "graphql-tools";
import { Db, ObjectID } from "mongodb";
import { ICharacter } from "../../interfaces/ICharacter";

import {
  CHARACTERS_COLLECTIONS,
  GAMES_COLLECTIONS,
} from "../../mongo/collections";

export const characterResolver: IResolvers = {
  Query: {
    async getCharacters(root: void, args: void, context: Db) {
      try {
        return await context
          .collection(CHARACTERS_COLLECTIONS)
          .find()
          .toArray();
      } catch (error) {
        console.log(error);
      }
    },

    async getCharacter(root: void, args: any, context: Db) {
      const _id = args._id;
      //return context.collection(CHARACTERS_COLLECTIONS).findOne({ _id: _id });
      const character = await context
        .collection(CHARACTERS_COLLECTIONS)
        .findOne({ _id: new ObjectID(_id) });

      return character;
    },
  },
  Character: {
    async games(root: ICharacter, args: any, context: Db, options: any) {
      const gameList = await root.games.map(async (gameId: string) => {
        return await context
          .collection(GAMES_COLLECTIONS)
          .findOne({ _id: new ObjectID(gameId) });
      });
      return gameList;
    },
  },
  Mutation: {
    async createCharacter(root: any, args: any, context: Db) {
      const regexp = new RegExp(args.character.name, "i");
      try {
        const exist = await context.collection(CHARACTERS_COLLECTIONS).findOne({
          name: regexp,
        });
        if (exist) {
          {
            throw new Error("Character allready exist");
            return "Character allready exist";
          }
        }
        await context
          .collection(CHARACTERS_COLLECTIONS)
          .insertOne(args.character);
        return "Character added successfully";
      } catch (err) {
        return err.message;
        console.log(err);
      }
    },
    async editCharacter(
      root: any,
      { _id, character }: { _id: string; character: ICharacter },
      context: Db
    ) {
      try {
        const exist = await context
          .collection(CHARACTERS_COLLECTIONS)
          .findOne({ _id: new ObjectID(character._id) });
        if (exist) {
          context.collection(CHARACTERS_COLLECTIONS).updateOne(
            { _id: new ObjectID(character._id) },
            {
              $set: character,
            }
          );
          return "Character eddited successfully";
        } else {
          throw new Error("Character does not exist");
        }
      } catch (error) {
        return error.message;
        console.log(error);
      }
    },
  },
};
