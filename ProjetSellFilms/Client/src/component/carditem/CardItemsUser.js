import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Utility/Constant';
import { Link } from 'react-router-dom';

const CartItemUser = () => {
    const userId = window.localStorage.getItem('user_id');
    const [cartData, setCartData] = useState([]);
    const [filmItems, setFilmItems] = useState([]);
    const [msg, setMsg] = useState("")
    React.useEffect(() => {
        axios.get(`${baseUrl}cartitems/${userId}`)
            .then(response => {
                setCartData(response.data.data);
            })
            .catch(error => {
                setMsg(error.message);
                console.error(error);
            });
    }, [userId]);
    return (
        <div className='cartItems'>
            {
                cartData.length > 0 ?
                    <table className='text-light container cardItemsTable'>
                        <thead className='cartItemHead'>
                            <tr>
                                <th>Image Cover</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Sold</th>
                                <th>Ratings Average</th>
                            </tr>
                        </thead>
                        <tbody className='cartItemBody'>
                        {cartData.map(item => (
                                <tr key={item._id} className=''>
                                    <td><img src={`${baseUrl}uploads/${item.film.imageCover}`} width='50px' alt={item.film.imageCover}/></td>
                                    <td><Link to={`/ShopFilms/${item.film._id}`} className='nav-link'>*{item.film.title}*</Link></td>
                                    <td>{item.film.price}$$</td>
                                    <td>{item.film.sold}Viewer</td>
                                    <td>{item.film.ratingsAverage}<i className="fa-solid fa-star text-warning" color="red"></i></td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                    : <h1 className='text-light'>{msg}</h1>
            }
        </div>
    )
}

export default CartItemUser;