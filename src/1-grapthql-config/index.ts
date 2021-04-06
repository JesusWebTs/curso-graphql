import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeTypeDefs } from "graphql-tools";
import "graphql-import-node";

import characterSchema from "./1-schemas/character.graphql";
import gameSchema from "./1-schemas/game.graphql";
import developerSchema from "./1-schemas/developer.graphql";
import personSchema from "./1-schemas/person.graphql";

import { characterResolver } from "./2-resolvers/character";
import { gameResolver } from "./2-resolvers/game";
import { developerResolver } from "./2-resolvers/developer";
import { personResolver } from "./2-resolvers/person";

/* import resolvers from "./2-resolvers/resolversMap"; */

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    characterSchema,
    gameSchema,
    developerSchema,
    personSchema,
  ]),
  resolvers: [
    characterResolver,
    gameResolver,
    developerResolver,
    personResolver,
  ],
});
