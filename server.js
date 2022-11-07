import express from "express";
import { createServer } from "@graphql-yoga/node";
import nacl from "tweetnacl";

const app = express();

const graphQLServer = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        someNumber: Int!
      }
    `,
    resolvers: {
      Query: {
        someNumber(_, _args, context) {
          return context.someNumber;
        },
      },
    },
  },
  context(request) {
    return { someNumber: 13 };
  },
});

// Bind GraphQL Yoga to `/graphql` endpoint
app.use("/graphql", graphQLServer);

const getOwner = (req) => {
  try {
    const message = req.headers["x-auth-message"];
    const signature = req.headers["x-auth-signature"];
    const publicKey = req.headers["x-auth-publickey"];
    // TODO encoding

    if (message && signature) {
      if (!validateMessage(message))
        throw new Error("message validation error");
      return nacl.sign.detached.verify(message, signature, publicKey)
        ? publicKey
        : undefined;
    }
  } catch (err) {
    throw new Error("getOwner error");
  }
};

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
