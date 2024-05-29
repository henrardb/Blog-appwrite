import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { authLogin, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(authLogin({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : null;
}

export default App;
