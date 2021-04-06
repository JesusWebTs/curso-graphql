"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_tools_1 = require("graphql-tools");
require("graphql-import-node");
const character_graphql_1 = __importDefault(require("./1-schemas/character.graphql"));
const game_graphql_1 = __importDefault(require("./1-schemas/game.graphql"));
const developer_graphql_1 = __importDefault(require("./1-schemas/developer.graphql"));
const person_graphql_1 = __importDefault(require("./1-schemas/person.graphql"));
const character_1 = require("./2-resolvers/character");
const game_1 = require("./2-resolvers/game");
const developer_1 = require("./2-resolvers/developer");
const person_1 = require("./2-resolvers/person");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: graphql_tools_1.mergeTypeDefs([
        character_graphql_1.default,
        game_graphql_1.default,
        developer_graphql_1.default,
        person_graphql_1.default,
    ]),
    resolvers: [
        character_1.characterResolver,
        game_1.gameResolver,
        developer_1.developerResolver,
        person_1.personResolver,
    ],
});
