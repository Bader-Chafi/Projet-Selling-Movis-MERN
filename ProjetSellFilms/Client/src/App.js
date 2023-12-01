import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./component/Utility/Navbar";
import Footer from "./component/Utility/Footer";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProductPage from "./pages/ProductPage";
import ShopProducts from "./pages/Products/ShopFilms";
import AdminPage from "./pages/Admin/AdminPage";
import AllCategory from "./component/category/AllCategory";
import FakeAdmin from "./pages/Admin/FakeAdmin";
import Profile from "./pages/Profile";

function App() {
  const typeUser = window.localStorage.getItem('typeUser');
  return (
    <div className="font">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* if the user not login this pages not show for them except homa page */}
          {
            typeUser && <>
              <Route path="/ShopFilms" element={<ShopProducts />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="all_category" element={<AllCategory />} />
              <Route path="/profile" element={<Profile />} />
            </>
          }
          {/* the all user whith type user not can going to the page admin */}
          {
            typeUser === 'Admin' ?
              <Route path="/admin" element={<AdminPage />} />
              : <Route path="/admin" element={<FakeAdmin />} />
          }
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
