import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./graphqlClient";

type Props = {
  children: React.ReactNode;
};

export const ApolloRootApplication = ({ children }: Props) => {
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
};
