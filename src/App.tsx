import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DataProvider from "@/providers/DataProvider.tsx";
import AuthProvider from "@/providers/AuthProvider.tsx";
import RefreshProvider from "@/providers/RefreshProvider.tsx";
import FilterProvider from "@/providers/FilterProvider.tsx";
import ModalProvider from "@/providers/ModalProvider.tsx";
import AppRoutes from "@/routes";
import Header from "@/components/Elements/Header/Header.tsx";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <DataProvider>
            <RefreshProvider>
              <FilterProvider>
                <ModalProvider>
                  <Header />
                  <AppRoutes />
                </ModalProvider>
              </FilterProvider>
            </RefreshProvider>
          </DataProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
