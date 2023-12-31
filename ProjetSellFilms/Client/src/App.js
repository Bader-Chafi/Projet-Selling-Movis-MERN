import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./component/Utility/Navbar";
import Footer from "./component/Utility/Footer";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ShopProducts from "./pages/Products/ShopFilms";
import AdminPage from "./pages/Admin/AdminPage";
import AllCategory from "./component/category/AllCategory";
import FakeAdmin from "./pages/Admin/FakeAdmin";
import Product from "./pages/Products/Product";
import CartItemUser from "./component/cartItem/CartItemsUser";
import Payment from './pages/User/Payment'
import PaymentCard from './pages/User/PaymentCard'
import ProfileUser from "./pages/User/ProfileUser";

function App() {
  const typeUser = window.localStorage.getItem('typeUser');
  return (
    <div className="font">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* if the user not login this pages not show for them except homa page */}
          {
            typeUser ? <>
              <Route path="/ShopFilms" element={<ShopProducts />} />
              <Route path="/ShopFilms/:id" element={<Product />} />
              <Route path="all_category" element={<AllCategory />} />
              <Route path="/profileUser" element={<ProfileUser />} />
              <Route path="/cartItems" element={<CartItemUser />} />
              <Route path="/payment/:id" element={<Payment />} />/
              <Route path="/item_shop" element={<PaymentCard />} />

            </> :
              <>
                <Route path="/ShopFilms" element={<LoginPage />} />
                <Route path="/products" element={<LoginPage />} />
                <Route path="/profile/:id" element={<LoginPage />} />
                <Route path="all_category" element={<LoginPage />} />
                <Route path="/profile" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
          }
          {/* the all user whith type user not can going to the page admin */}
          {
            typeUser === 'Admin' ?
              <Route path="/profiladmin" element={<AdminPage />} />
              : <Route path="/admin" element={<FakeAdmin />} />
          }
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
