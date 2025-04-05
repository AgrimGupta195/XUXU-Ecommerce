import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import VerifyOTPPage from "./pages/VerifyOtpPage";
import { useUserStore } from "./stores/useUserStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import LoadingSpinner from "./components/loadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";

function App() {
  const { sign, verified, user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth(); // Check authentication status on component mount
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />; // Show loading while checking auth

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!sign ? <SignUpPage /> : <Navigate to="/verifyOtp" />}
          />
          <Route
            path="/verifyOtp"
            element={!verified ? <VerifyOTPPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/secret-dashboard"
            element={user?.role==="admin" ? <AdminPage /> : <Navigate to="/login" />}
          />
          <Route path='/category/:category' element={<CategoryPage/>} />
          <Route path='/cart' element={user ? <CartPage/> : <Navigate to='/login' />} />
        </Routes>
        
      </div>
      <Toaster />
    </div>
  );
}

export default App;
