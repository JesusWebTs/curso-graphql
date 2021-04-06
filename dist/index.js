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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const _1_grapthql_config_1 = require("./1-grapthql-config");
const index_1 = __importDefault(require("./mongo/index"));
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
app.use(cors_1.default());
const server = new apollo_server_express_1.ApolloServer({
    schema: _1_grapthql_config_1.schema,
    playground: true,
    introspection: true,
    context: () => __awaiter(void 0, void 0, void 0, function* () { return new index_1.default().connect(); }),
    validationRules: [],
});
server.applyMiddleware({ app, path: "/api" });
app.listen(config_1.default.port, () => {
    console.log(`http://localhost:${config_1.default.port}`);
});
