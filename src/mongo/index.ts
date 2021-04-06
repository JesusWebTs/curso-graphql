import { Db, MongoClient } from "mongodb";
import config from "../config/index";

export default class MongoLib {
  private client: MongoClient;
  private dbName: string | undefined = config.dbName;
  private mongoUri: any = config.mongoUri;
  private static connection: Db;

  constructor() {    
    this.client = new MongoClient(this.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        console.log("[mongodb] Connected successfully to mongo DB");
        MongoLib.connection = this.client.db(this.dbName);
      } catch (err) {
        console.log(err);
      }
    }
    return MongoLib.connection;
  }
}
