import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../component/Utility/Constant";
import axios from "axios";
import { Container } from "react-bootstrap";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [filds, setFilds] = useState([
        { name: 'title', value: '' },
        { name: 'category', value: '' },
        { name: 'section', value: '' },
        { name: 'date', value: '' },
        { name: 'price', value: '' },
        { name: 'sold', value: '' },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const filmData = await axios.get(`${baseUrl}films/${id}`);
                const data = filmData.data.data;
                setProduct(data);
                if (data) {
                    const newFilds = filds.map((field) => ({
                        name: field.name,
                        value: data[field.name],
                    }));
                    setFilds(newFilds);
                }
            } catch (error) {
                console.error("Error fetching film data:", error);
                // Handle error (show error message, redirect, etc.)
            }
        };
        fetchData();
    }, [id]);
    const i = 0;
    return (
        <Container className="Product_Shop ">
            {product && filds ?
                (<div className="Film">
                    <div className="FilmFB">
                        {/* imageCover and Array */}
                        <div className="someOT">
                            <div className="fFilmImg">
                                <img className="filmCover" src={`${baseUrl}uploads/${product.imageCover}`} alt={product.title} />
                            </div>
                            <div className="FilmInfo">
                                <div className='info'>
                                    {filds.map((fild) => {
                                        return (
                                            <div className="filmField">
                                                <span className="fieldName">{fild.name} :</span>
                                                <span className="fieldValue">{fild.value}</span>
                                            </div>)
                                    })}
                                </div>
                                <div className="FilmDiscription">
                                    <span className="fieldName">Description :</span> <br />
                                    <span className="FilmDisc">{product.description}</span>
                                </div>
                                <div className="filmImages">
                                    <img className='ImageFArray' src={`${baseUrl}uploads/${product.imageCover}`} alt={product.title} />
                                    <img className='ImageFArray' src={`${baseUrl}uploads/${product.imageCover}`} alt={product.title} />
                                    <img className='ImageFArray' src={`${baseUrl}uploads/${product.imageCover}`} alt={product.title} />
                                </div>
                            </div>
                        </div>
                        <div className="FilmDT">
                            <div className="FilmTriller">
                                <video controls autoPlay>
                                    <source src={`${baseUrl}uploads/${product.video}`} />
                                </video>
                            </div>
                            <div className="ProfileActor ">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="actor">
                                        <img className="actorImage" src={`${baseUrl}uploads/${product.imageCover}`} alt={product.title} />
                                        <h5 className="actorName">Adam Hollywood</h5>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>

                </div>)
                : (<h1>World</h1>)}
        </Container>
    );
};


export default Product;