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
        <div className='cartItems'>
            <div className='tableCard'>
                {/* Notification deleted */}
                {notif &&
                    <div className='alert alert-success position-absolute top-15 w-50' style={{ 'right': '25%' }}>
                        {msg}
                    </div>}
                {cartData.length > 0 ? <>
                    <div className='container d-flex justify-content-between'>
                        <h1 className='text-start text-light'>ALL film You like it</h1>
                        <button className='removeItem btn-Delete' onClick={() => handleBtnRemove()} >Delete ALL</button>
                    </div>
                    <table className='text-light container cardItemsTable'>
                        <thead className='cartItemHead'>
                            <tr>
                                <th>Image Cover</th>
                                <th>Title</th>
                                <th width='100px'>Price</th>
                                <th width='100px'>Sold</th>
                                <th>Ratings Average</th>
                                <th>Methode</th>
                            </tr>
                        </thead>
                        <tbody className='cartItemBody'>
                            {cartData.map(item => (
                                <tr key={item._id} className=''>
                                    <td><img src={`${baseUrl}uploads/${item.film.imageCover}`} width='50px' alt={item.film.imageCover} /></td>
                                    <td><Link to={`/ShopFilms/${item.film._id}`} className='nav-link'>*{item.film.title}*</Link></td>
                                    <td>{item.film.price}$$</td>
                                    <td>{item.film.sold}Viewer</td>
                                    <td>{item.film.ratingsAverage}<i className="fa-solid fa-star text-warning" color="red"></i></td>
                                    <td>
                                        <button className='removeItem btn-Delete' onClick={() => { handleBtnRemove(item.film._id) }}>Delete</button>
                                        <button className='ShopItem btn-shop'><Link to={`/payment/${item.film._id}`}>Shopping</Link></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                    : <h1 className='text-light'>You have not Any Films Cart</h1>
                }
            </div>

        </div>
    )
}

export default CartItemUser;