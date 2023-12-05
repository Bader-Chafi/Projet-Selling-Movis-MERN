import React from "react";
import { baseUrl } from "../Utility/Constant";
import { Link } from "react-router-dom";


const ProductCard = ({ id, image, name, prix, stars, disc }) => {
    return (
        <Link to={`/ShopFilms/${id}`} className="nav-link">
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
                            <i className="fa-solid fa-cart-shopping shoping"></i>
                            <i className="fa-solid fa-shield-heart heart"></i>
                            <span className="product_stars">{stars}<i className="fa-solid fa-star star" color="red"></i></span>
                        </div>
                    </div>
                </div>
                <div className="Product_title">
                    {name}
                </div>
            </div>
        </Link>

    )
}

export default ProductCard;