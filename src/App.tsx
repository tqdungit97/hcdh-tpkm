import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRouter } from "./routes";
import ApplicationConfigProvider from "./ApplicationConfigProvider";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ApplicationConfigProvider>
      <ChakraProvider
        toastOptions={{ defaultOptions: { position: "top-right" } }}
      >
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ChakraProvider>
    </ApplicationConfigProvider>
  );
}

export default App;
