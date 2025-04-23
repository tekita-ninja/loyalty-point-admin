'use client'
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Set up queryClient
const queryClient = new QueryClient()

function ContextProvider({ children }: { children: ReactNode; }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ContextProvider