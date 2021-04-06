"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
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
exports.default = resolvers;
