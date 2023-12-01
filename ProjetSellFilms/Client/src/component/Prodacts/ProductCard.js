import React from "react";


const ProductCard = ({ image, name, prix, stars, disc }) => {
    return (
        <div className="The_product">
            <div className="Product_card">
                <div className="Poducat_img">
                    <img src={image} alt={name} />
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
                        <button type="button" className="btn-show">SHOW MORE</button>
                        <i className="fa-regular fa-heart"></i>
                        <span className="product_stars">{stars}<i className="fa-solid fa-star" color="red"></i></span>
                    </div>
                </div>
            </div>
            <div className="Product_title">
                {name}
            </div>
        </div>
    )
}

export default ProductCard;