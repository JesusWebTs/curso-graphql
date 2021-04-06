"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterResolver = void 0;
const mongodb_1 = require("mongodb");
const collections_1 = require("../../mongo/collections");
exports.characterResolver = {
    Query: {
        getCharacters(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield context
                        .collection(collections_1.CHARACTERS_COLLECTIONS)
                        .find()
                        .toArray();
                }
                catch (error) {
                    console.log(error);
                }
            });
        },
        getCharacter(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const _id = args._id;
                const character = yield context
                    .collection(collections_1.CHARACTERS_COLLECTIONS)
                    .findOne({ _id: new mongodb_1.ObjectID(_id) });
                return character;
            });
        },
    },
    Character: {
        games(root, args, context, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const gameList = yield root.games.map((gameId) => __awaiter(this, void 0, void 0, function* () {
                    return yield context
                        .collection(collections_1.GAMES_COLLECTIONS)
                        .findOne({ _id: new mongodb_1.ObjectID(gameId) });
                }));
                return gameList;
            });
        },
    },
    Mutation: {
        createCharacter(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const regexp = new RegExp(args.character.name, "i");
                try {
                    const exist = yield context.collection(collections_1.CHARACTERS_COLLECTIONS).findOne({
                        name: regexp,
                    });
                    if (exist) {
                        {
                            throw new Error("Character allready exist");
                            return "Character allready exist";
                        }
                    }
                    yield context
                        .collection(collections_1.CHARACTERS_COLLECTIONS)
                        .insertOne(args.character);
                    return "Character added successfully";
                }
                catch (err) {
                    return err.message;
                    console.log(err);
                }
            });
        },
        editCharacter(root, { _id, character }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const exist = yield context
                        .collection(collections_1.CHARACTERS_COLLECTIONS)
                        .findOne({ _id: new mongodb_1.ObjectID(character._id) });
                    if (exist) {
                        context.collection(collections_1.CHARACTERS_COLLECTIONS).updateOne({ _id: new mongodb_1.ObjectID(character._id) }, {
                            $set: character,
                        });
                        return "Character eddited successfully";
                    }
                    else {
                        throw new Error("Character does not exist");
                    }
                }
                catch (error) {
                    return error.message;
                    console.log(error);
                }
            });
        },
    },
};
