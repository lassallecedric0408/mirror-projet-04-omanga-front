import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { AboutUsView } from "./views/AboutUsView";


import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { AccountView } from "./views/AccountView";
import { ProductView } from "./views/ProductView";
import { ContactUSView } from "./views/ContactUSView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />
  },
  {
    path: "/aboutUs",
    element: <AboutUsView />,
  },
  {
    path: "/account",
    element: <AccountView />,
  },
  {
    path: "/contactUS",
    element: <ContactUSView />,
  },
  {
    path: "/products",
    element: <ProductView />,
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
