import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./1-grapthql-config";
import MongoLib from "./mongo/index";
import config from "./config";

const app = express();
app.use(cors());
const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: async () => new MongoLib().connect(),
  validationRules: [],
  /* "Depth Limit gere" */
});

server.applyMiddleware({ app, path: "/api" });

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});
