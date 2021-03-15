/*import { ApolloServer, gql } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
// //import {}

const connectionURI =
  "mongodb+srv://Andrei:UpcNetCluj2021%21@nextjs-blog.rhcqe.mongodb.net/nextjs%5Fblog?retryWrites=true&w=majority";

const typeDefs = gql`
  # define User object type for basic user CRUD operations
  type User {
    id: ID!
    name: String!
    email: String
    password: String!
    created_at: Date!
  }

  type Query {
    users: [User]
  }
`;

//this resolver will return all the existing users
//from our database
const resolvers = {
  Query: {
    users(parent, args, context, info) {
      return context.db
        .collection("nextjs_blog")
        .findOne()
        .then((data) => {
          return data.users;
        });
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer.createHandler({ path: "/api/graphql" });*/
