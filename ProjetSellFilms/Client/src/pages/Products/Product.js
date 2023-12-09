import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        { name: 'ratingsAverage', value: '' },
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
    }, [id,filds]);
    // add panier
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
            console.log(response);
            setMsg(response.data.msg);
            notifShow();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Container className="Product_Shop ">
            {product && filds ?
                (<div className="Film">
                    {notif && <div className='alert text-center alert-success'>{msg}</div>} 
                    <div className="FilmFB">
                        {/* imageCover and Array */}
                        <div className="someOT">
                            <div className="fFilmImg">
                                <img className="filmCover" src={`${baseUrl}uploads/${product.imageCover}`} alt={product.title} />
                            </div>
                            <div className="FilmInfo">
                                <div className="info">
                                    <table className=''>
                                        <tbody>
                                            {filds.map((fild, key) => {
                                                return (
                                                    <tr className="filmField" key={key}>
                                                        <td className="fieldName" width='100px'>{fild.name} :</td>
                                                        <td className="fieldValue">{fild.value}</td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                    <div className='btn d-flex flex-column justify-content-evenly'>
                                        <button className="btn Acheter"><Link to='/'>Shop Now</Link></button>
                                        <button onClick={handlAddToCart} className="btn Acheter">Add To Panier</button>
                                    </div>
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
                                <video controls>
                                    <source src={`${baseUrl}uploads/${product.video}`} />
                                </video>
                            </div>
                            <div className="ProfileActor ">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="actor">
                                        <img className="actorImage" src='https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_FMjpg_UX1000_.jpg' alt={product.title} />
                                        <h5 className="actorName">Adam Hollywood</h5>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>

                </div>)
                : (<h1 className="LoginData">Loding data ...</h1>)
            }
        </Container>
    );
};


export default Product;