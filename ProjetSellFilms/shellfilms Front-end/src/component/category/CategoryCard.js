import React from "react";


const CategoryCard = ({ category_card_text, img }) => {
    return (
        <div className='my-2 d-flex col justify-content-center'>
            <div className='allCard'>
                <div className="category-card">
                    <img className="category-card-img" src={img} width='200px' alt="category-one" />
                    <p className="category-card-text">{category_card_text}</p>
                </div>
            </div>
        </div>
    )
}
export default CategoryCard;