import React, { useState } from "react";
import "../Styles/Navbar.css";
import logo from "../../images/logo.png";
import 'bootstrap/dist/css/bootstrap.css';

function Navbar() {
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <header>
        <div className="hea">
          <div className="p-fixed">
            <div className='container flexX d-flex'>
              <nav className='flexX d-flex'>
                <div className='logo d-flex'>
                  <img src={logo} alt='logo' />
                  <h1><a href="/" className="navbar-brand">BMovis</a></h1>
                </div>
                {/*<ul className='flexX'>*/}
                <ul className={Mobile ? "navMenu-list" : "flexX"} onClick={() => setMobile(false)}>
                  <li><a href='/'>Home</a></li>
                  <li><a href='/'>Series</a></li>
                  <li><a href='/ShopFilms'>Movies</a></li>
                  <li><a href='/'>Pages</a></li>
                  <li><a href='/'>Contact</a></li>
                </ul>
                <button className='toggle' onClick={() => setMobile(!Mobile)}>
                  {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
                </button>
              </nav>
              <div className='account flexX'>
                <form action="">
                  <div className="serch d-flex">
                    <input
                      type="search"
                      className="searchInput"
                      placeholder="Search her....."
                      aria-label="Search"
                    />
                    <i className='fa fa-search'></i>
                  </div>
                </form>
                <i className='fas fa-bell'></i>
                <i className="fa-solid fa-cart-shopping"></i>
                <button><a href='/login'>LogIn Now</a></button>
              </div>
            </div>
          </div>
        </div>

      </header >
    </>
  )
};
export default Navbar