import { BrowserRouter } from "react-router-dom";
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
    </BrowserRouter>
  );
}

export default App;
