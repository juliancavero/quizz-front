import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryOnMount: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

type ProviderProps = {
  children: React.ReactNode;
};

const QueryProv = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProv;
