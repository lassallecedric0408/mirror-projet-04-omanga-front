import { Routes, Route } from 'react-router-dom';
import { AboutUsView } from './views/AboutUsView';
import { AccountView } from './views/AccountView';
import { ContactUSView } from './views/ContactUSView';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductView } from './views/ProductView';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';
import { DashBoardView } from './views/DashBoardView';
import { UsersTableView } from './views/UsersTableView';
import { CategoriesTableView } from './views/CategoriesTableView';
import { BookingsTableView } from './views/BookingsTableView';
import { ProductsTableView } from './views/ProductsTableView';
import { UniversesTableView } from './views/UniversesTableView';
import { ErrorView } from './views/ErrorView';
import ProtectedRoute from './utils/protectedRoute';
import useAuthStore from './states/OmangaStore';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { refreshAccessToken } from './services/refreshToken';

function App() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const accessToken = useAuthStore((state) => state.user.accessToken);
  const refreshToken = useAuthStore((state) => state.user.refreshToken);

  const { mutate } = useMutation({
    mutationKey: ['deleteRow', { refreshToken }],
    mutationFn: () => refreshAccessToken(refreshToken),
    onSettled: (data) => {
      if (data) {
        useAuthStore().updateToken(
          data.data.accessToken,
          data.data.refreshToken
        );
      }
    },
  });

  const checkIfTokenIsValid = async () => {
    if (accessToken) {
      const jwt = jwtDecode(accessToken);
      const current_time = Date.now() / 1000;
      if (jwt && jwt.exp && jwt.exp < current_time) {
        await mutate();
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    checkIfTokenIsValid();
    console.log('App mounted');
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/products' element={<ProductsView />} />
        <Route path='/product/:id' element={<ProductView />} />
        <Route path='/contactUs' element={<ContactUSView />} />
        <Route path='/account' element={<AccountView />} />
        <Route path='/aboutUs' element={<AboutUsView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/signup' element={<SignupView />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute admin={isAdmin}>
              <DashBoardView />
            </ProtectedRoute>
          }
        />
        {isAdmin && (
          <>
            <Route path='/productstable' element={<ProductsTableView />} />
            <Route path='/bookingstable' element={<BookingsTableView />} />
            <Route path='/categoriestable' element={<CategoriesTableView />} />
            <Route path='/universestable' element={<UniversesTableView />} />
            <Route path='/userstable' element={<UsersTableView />} />
          </>
        )}
        <Route path='/error' element={<ErrorView />} />
        <Route path='*' element={<ErrorView />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
