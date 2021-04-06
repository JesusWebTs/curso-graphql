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
exports.developerResolver = void 0;
const collections_1 = require("../../mongo/collections");
exports.developerResolver = {
    Query: {
        getDevelopers(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield context
                        .collection(collections_1.DEVELOPERS_COLLECTIONS)
                        .find()
                        .toArray();
                }
                catch (error) {
                    console.log(error);
                }
            });
        },
    },
    Mutation: {
        createDeveloper(root, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield context
                        .collection(collections_1.DEVELOPERS_COLLECTIONS)
                        .insertOne(args.developer);
                    return "developer created successfully";
                }
                catch (err) {
                    console.log(err);
                }
            });
        },
    },
};
