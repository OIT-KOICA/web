"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const QueryProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false, // Ne pas réessayer automatiquement les requêtes
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviderWrapper;
