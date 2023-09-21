import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AboutUsView } from "./views/AboutUsView";
import { AccountView } from "./views/AccountView";
import { ContactUSView } from "./views/ContactUSView";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { ProductView } from "./views/ProductView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />
  },
  {
    path: "/products",
    element: <ProductView />,
  },
  {
    path: "/contactUS",
    element: <ContactUSView />,
  },
  {
    path: "/account",
    element: <AccountView />,
  },
  {
    path: "/aboutUs",
    element: <AboutUsView />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
