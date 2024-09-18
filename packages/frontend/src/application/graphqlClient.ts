import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const commandLink = new HttpLink({
  uri: "http://localhost:38080/query",
});
const queryLink = new HttpLink({
  uri: "http://localhost:38082/query",
});

export const graphqlClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext()["clientName"] === "command",
    commandLink,
    queryLink
  ),
  cache: new InMemoryCache(),
});
