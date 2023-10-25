import React from "react";
import { Col } from "react-bootstrap";


const CategoryCard = ({category_card_text,img }) => {
    return (
        <Col className='my-4 d-flex justify-content-around'>
            <div className='allCard'>
                <div className="category-card">
                    <img className="category-card-img" src={img} width='200px' alt="category-one" />
                    <p className="category-card-text">{category_card_text}</p>
                </div>
            </div>
        </Col>
    )
}
export default CategoryCard;