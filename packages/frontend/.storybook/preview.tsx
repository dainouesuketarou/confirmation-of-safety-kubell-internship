import React from "react";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";

import { graphqlClient } from "../src/application/graphqlClient";
import { handlers } from "../src/mocks/handler";
import { MockAuthProvider } from "../src/mocks/MockAuthProvider";
import { theme } from "../src/styles/theme";

initialize();

export const decorators = [
  (Story) => {
    React.useEffect(() => {
      return () => {
        graphqlClient.clearStore();
      };
    }, [graphqlClient]);

    return (
      <MockAuthProvider>
        <ApolloProvider client={graphqlClient}>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </ApolloProvider>
      </MockAuthProvider>
    );
  },
];

export const parameters = {
  msw: {
    handlers,
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
