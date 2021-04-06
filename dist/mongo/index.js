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
const mongodb_1 = require("mongodb");
const index_1 = __importDefault(require("../config/index"));
class MongoLib {
    constructor() {
        this.dbName = index_1.default.dbName;
        this.mongoUri = index_1.default.mongoUri;
        this.client = new mongodb_1.MongoClient(this.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoLib.connection) {
                try {
                    yield this.client.connect();
                    console.log("[mongodb] Connected successfully to mongo DB");
                    MongoLib.connection = this.client.db(this.dbName);
                }
                catch (err) {
                    console.log(err);
                }
            }
            return MongoLib.connection;
        });
    }
}
exports.default = MongoLib;
