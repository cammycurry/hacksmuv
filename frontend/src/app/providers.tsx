"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const queryClient = new QueryClient()

type Props = {
  children?: React.ReactNode
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export const Provider = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
