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
exports.gameResolver = void 0;
const mongodb_1 = require("mongodb");
const collections_1 = require("../../mongo/collections");
exports.gameResolver = {
    Query: {
        getGames(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield context.collection(collections_1.GAMES_COLLECTIONS).find().toArray();
                }
                catch (error) {
                    console.log(error);
                }
            });
        },
    },
    Mutation: {
        createGame(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    context.collection(collections_1.GAMES_COLLECTIONS).insertOne(args.game);
                    return `Game ${args.game.title} added successfully`;
                }
                catch (error) { }
            });
        },
    },
    Game: {
        developers(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const devList = root.developers.map((id) => __awaiter(this, void 0, void 0, function* () {
                    return yield context
                        .collection(collections_1.DEVELOPERS_COLLECTIONS)
                        .findOne({ _id: new mongodb_1.ObjectID(id) })
                        .then((dev) => {
                        return dev;
                    });
                }));
                return devList;
            });
        },
    },
};
