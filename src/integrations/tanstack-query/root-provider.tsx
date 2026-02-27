import { queryClient } from '@/queryClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function getContext() {
  if (typeof window === 'undefined') {
    return {
      queryClient: new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 0,
            retry: 1,
            retryOnMount: false,
          },
        },
      }),
    }
  }
  return {
    queryClient,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
