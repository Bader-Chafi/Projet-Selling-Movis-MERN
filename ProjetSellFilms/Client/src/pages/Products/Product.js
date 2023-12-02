import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GetFilm from "../../component/Utility/GetFilm";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    GetFilm(id, setProduct)
    return (
        <div>
            {product ? <h1>Hello {product.title}</h1> : <h1>World</h1>}
        </div>
    );
};

export default Product;