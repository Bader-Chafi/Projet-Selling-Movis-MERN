import React, { useState } from "react";
import "../Styles/Navbar.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function Navbar() {
  const [Mobile, setMobile] = useState(true);
  const [cookies, setCookies] = useCookies('access_token');
  const removeCokies = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('user_id', '');
    window.location.reload(false);
  }
  const handleToggle = () => {
    setMobile(!Mobile);
  };
  return (
    <>
      <header>
        <nav className='container'>
          <div className='logo' style={{ flexGrow: 3 }}>
            <h1><a href="/" className="navbar-brand">BMovis</a></h1>
          </div>
          <div id='NavigationDiv' style={{ flexGrow: 3 }} className={`nav Menu-list ${Mobile ? 'show' : 'hide'}`}>
            <ul>
              <li className="nav-item"><a href='/'>Home</a></li>
              <li className="nav-item"><a href='/'>Series</a></li>
              <li className="nav-item"><a href='/ShopFilms'>Movies</a></li>
              <li className="nav-item"><a href='/'>Pages</a></li>
              <li className="nav-item"><a href='/'>Contact</a></li>
            </ul>
          </div>
          <div className='account' style={{ flexGrow: 3 }}>
            <i className='fas fa-bell'></i>
            <i className="fa-solid fa-cart-shopping"></i>
            {cookies.access_token ?
              <div className="userInfo">
                <i className="fa-solid fa-user "></i>
                <ul className="user">
                  <li>the name</li>
                  <li><Link to="/">the Profile</Link></li>
                  <li><Link to="/">the Profile</Link></li>
                  <li><Link to="/">the Profile</Link></li>
                  <li><Link to="/">the Profile</Link></li>
                  <li onClick={removeCokies}>LogOut</li>
                </ul>
              </div>
              : <button><a href='/login'>LogIn Now</a></button>}
          </div>
          <div className='toggler' onClick={handleToggle} style={{ flexGrow: 1 }}>
            <button className='toggle' onClick={handleToggle}>
              {Mobile ? <i className='fa fa-bars'></i> : <i className='fa fa-times'></i>}
            </button>
          </div>
        </nav>

      </header >
    </>
  )
};
export default Navbar