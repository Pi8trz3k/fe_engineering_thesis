import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <AppRoutes />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
