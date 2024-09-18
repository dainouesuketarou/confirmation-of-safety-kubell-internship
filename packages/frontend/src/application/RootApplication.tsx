import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { AnswerProvider } from "local-service/answer/AnswerProvider";
import { AuthProvider } from "local-service/auth/AuthProvider";
import "styles/index.css";
import { theme } from "styles/theme";
import { ApolloRootApplication } from "./ApolloRootApplication";
import { Router } from "./Router";
// import { Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AnswerProvider>
      <ApolloRootApplication>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </ThemeProvider>
      </ApolloRootApplication>
      </AnswerProvider>
      
    </AuthProvider>
  </StrictMode>
);
