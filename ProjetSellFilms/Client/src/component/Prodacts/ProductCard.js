import React, { useState } from "react";
import { baseUrl } from "../Utility/Constant";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ PriceShop, id, image, name, prix, stars, disc }) => {
    const [msg, setMsg] = useState();
    const [notif, setNotif] = useState(false);
    const notifShow = () => {
        setNotif(true);
        setTimeout(() => {
            setNotif(false);
        }, 1000)
    }
    const handlAddToCart = () => {
        const userId = window.localStorage.getItem('user_id');
        const formData = {
            filmId: id,
            userId: userId,
        };
        axios.post(`${baseUrl}cartitems`, formData, {
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            setMsg(response.data.msg);
            notifShow();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            {PriceShop ? (
                <h2 className='PayPrice'>Totale : {prix}$$ </h2>
            ) : null}
            <div className="The_product">
                <div className="Product_card">
                    <div className="Poducat_img">
                        <img src={`${baseUrl}uploads/${image}`} alt={name} />
                    </div>
                    <div className="Product_Body">
                        <div className="product_autore">
                            <h3>NICOLAS ADISON</h3>
                        </div>
                        <div className="product_price">
                            <span>Price :</span>
                            <span>{prix}</span>
                        </div>
                        <div className="product_disc">
                            {disc}
                        </div>
                        <div className="product_button">
                            <i onClick={handlAddToCart} className="fa-solid fa-cart-shopping shoping"></i>
                            <i className="fa-solid fa-shield-heart heart"></i>
                            <span className="product_stars">{stars}<i className="fa-solid fa-star star" color="red"></i></span>
                        </div>
                    </div>
                </div>
                {/* notification cart Item */}
                {notif && <div className='alert text-center alert-success'>{msg}</div>}
                <div className="Product_title">
                    <Link to={`/ShopFilms/${id}`} className="nav-link">
                        {name}
                    </Link>
                </div>
            </div>
        </>

    )
}

export default ProductCard;