"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personResolver = void 0;
const data_json_1 = __importDefault(require("../../2-data/data.json"));
exports.personResolver = {
    Query: {
        getPerson(_, args) {
            const [found] = data_json_1.default.people.filter((p) => p.id === args.id);
            return found;
        },
    },
    Person: {
        __resolveType(obj) {
            return obj.age ? "Male" : "Female";
        },
    },
    Male: {
        countries(parent) {
            const countries = [];
            parent.countries.forEach((countryId) => countries.push(...data_json_1.default.countries.filter((c) => c.id === countryId)));
            return countries;
        },
    },
    Country: {
        people(parent) {
            const chars = [];
            parent.people.forEach((charId) => chars.push(...data_json_1.default.people.filter((c) => c.id === charId)));
            return chars;
        },
    },
};
