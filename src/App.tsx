import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DataProvider from "./providers/DataProvider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
