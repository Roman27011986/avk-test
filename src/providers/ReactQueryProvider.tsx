'use client';

import { useState } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'react-hot-toast';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity
        }
      },
      queryCache: new QueryCache({
        onError: (error) => {
          toast.error(error.message)
        }
      }),
      mutationCache: new MutationCache({
        onError(error) {
          toast.error(error.message)
        },
      }) 
    }));
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;