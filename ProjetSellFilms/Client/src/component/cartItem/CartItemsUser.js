import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Utility/Constant';
import { Link } from 'react-router-dom';

const CartItemUser = () => {
    const userId = window.localStorage.getItem('user_id');
    const [cartData, setCartData] = useState([]);
    const [msg, setMsg] = useState("")
    const [notif, setNotif] = useState(false);
    const showNotif = () => {
        setNotif(true);
        setTimeout(() => {
            setNotif(false);
            window.location.reload();
        }, 3000)
    }
    React.useEffect(() => {
        axios.get(`${baseUrl}cartitems/${userId}`)
            .then(response => {
                setCartData(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId]);
    // Destroy
    const handleBtnRemove = (id) => {
        // delete One
        if (id) {
            axios.put(`${baseUrl}cartitems?userId=${userId}&filmId=${id}`)
                .then(() => {
                    setMsg('Successfully removed Item')
                    showNotif()
                })
                .catch(error => { console.error(error); });
        } else {
            // Delete all
            axios.put(`${baseUrl}cartitems/${userId}`)
                .then(() => {
                    setMsg('Successfully removed All Items');
                    showNotif()
                })
                .catch(error => { console.error(error); });
        }
    }
    // shop items

    return (
        <div className='cartItems container'>
            <div className='tableCard'>
                {/* Notification deleted */}
                {notif &&
                    <div className='alert alert-success position-absolute top-15 w-50' style={{ 'right': '25%' }}>
                        {msg}
                    </div>}
                {cartData.length > 0 ?
                    <>
                        <div className='container d-flex justify-content-between'>
                            <h1 className='text-start text-light'>ALL film Want It :::  {cartData.length}</h1>
                            <button className='removeItem btn-Delete' onClick={() => handleBtnRemove()} >Delete ALL</button>
                        </div>
                        <div className='cartItemBody'>
                            {cartData.map(item => (
                                <div key={item._id} className='cartItem'>
                                    <span><img src={`${baseUrl}uploads/${item.film.imageCover}`} width='50px' alt={item.film.imageCover} /></span>
                                    <span><Link to={`/ShopFilms/${item.film._id}`} className='nav-link'>*{item.film.title}*</Link></span>
                                    <span>{item.film.price}$$</span>
                                    <span>{item.film.sold}Viewer</span>
                                    <span>{item.film.ratingsAverage}<i className="fa-solid fa-star text-warning" color="red"></i></span>
                                    <span width='300px'>
                                        <button className='removeItem btn-Delete' onClick={() => { handleBtnRemove(item.film._id) }}>Delete</button>
                                        <button className='ShopItem btn-shop'><Link to={`/payment/${item.film._id}`}>Shopping</Link></button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                    : <h1 className='text-light'>You have not Any Film In Your Cart Items</h1>
                }
            </div>

        </div>
    )
}

export default CartItemUser;