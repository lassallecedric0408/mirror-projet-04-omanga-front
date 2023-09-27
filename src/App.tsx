import { Routes, Route } from "react-router-dom";
import { AboutUsView } from "./views/AboutUsView";
import { AccountView } from "./views/AccountView";
import { ContactUSView } from "./views/ContactUSView";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomeView } from "./views/HomeView";
import { ProductsView } from "./views/ProductsView";
import { ProductView } from "./views/ProductView";
import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { DashBoardView } from "./views/DashBoardView";
import { UsersTableView } from "./views/UsersTableView";
import { CategoriesTableView } from "./views/CategoriesTableView";
import { BookingsTableView } from "./views/BookingsTableView";
import { ProductsTableView } from "./views/ProductsTableView";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/products" element={<ProductsView />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/contactUs" element={<ContactUSView />} />
        <Route path="/account" element={<AccountView />} />
        <Route path="/aboutUs" element={<AboutUsView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/dashboard" element={<DashBoardView />} />
        <Route path="/productstable" element={<ProductsTableView />} />
        <Route path="/bookingstable" element={<BookingsTableView />} />
        <Route path="/categoriestable" element={<CategoriesTableView />} />
        <Route path="/universestable" element={<UsersTableView />} />
        <Route path="/userstable" element={<UsersTableView />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
