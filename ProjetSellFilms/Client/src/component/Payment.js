import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GetFilm from './Utility/GetFilm';
import ProductCard from './Prodacts/ProductCard';
import axios from 'axios';
import { baseUrl } from './Utility/Constant';


const Payment = () => {
    const { id } = useParams();
    const [filmData, setFilmData] = useState();
    GetFilm(id, setFilmData)
    const [userPayData, setUserPayData] = useState({
        filmId: '',
        price: '',
        fullName: '',
        phoneNumber: '',
        cartNumber: '',
        cvc: '',
        date: '',
        email: '',
        country: '',
    });
    const handleInputChange = (e) => {
        const [name, value] = e.target;
        setUserPayData({
            ...userPayData,
            [name] : value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const addPayData = axios.post(`${baseUrl}payments`,userPayData,{
            headers: 'Content-Type'/'application/json',
        }).then(res => console.log(res)).catch(err => console.log(err));
    }
    return (
        <div className='Payment container'>
            <div className='PayFilm'>
                <h2 className='PayPrice'>Totale : 180££</h2>
                {filmData &&
                    <ProductCard
                        id={filmData.id}
                        image={filmData.imageCover}
                        name={filmData.title}
                        prix={filmData.price}
                        stars={filmData.rantingAverage}
                        disc={filmData.disc}
                    />
                }
            </div>
            <div className='PayForm'>
                <form className=''>
                    <legend>PAYMENT DETAILE</legend>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="fullName">FullName</label>
                        <input type="text" id="fullName" className='InputName' required onChange={handleInputChange} value={''} name='fullName' />
                        {/* {errors.userName && <div className="text-danger">{errors.userName}</div>} */}
                    </div>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="phoneNumber">Phone Number</label>
                        <input type="phonNumber" className='InputName' id="phoneNumber" required name='phoneNumber' />
                        {/* {errors.userName && <div className="text-danger">{errors.userName}</div>} */}
                    </div>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="cartNumber">Cart Number</label>
                        <input type="text" className='InputName' id="cartNumber" required name='cartNumber' />
                        {/* {errors.userName && <div className="text-danger">{errors.userName}</div>} */}
                    </div>
                    <div className="PayFilds CDate">
                        <div>
                            <label className="PayLabel" htmlFor="fullName">CVC</label>
                            <input type="text" className='InputName' required placeholder='CVC' name='cvc' />
                        </div>
                        <div>
                            <label className="PayLabel" htmlFor="fullName">Date</label>
                            <input type="text" className='InputName' required placeholder='12/25' name='date' />
                        </div>


                        {/* {errors.userName && <div className="text-danger">{errors.userName}</div>} */}
                    </div>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="email">E-mail</label>
                        <input type="email" className='InputName' id="email" required name='email' />
                        {/* {errors.userName && <div className="text-danger">{errors.userName}</div>} */}
                    </div>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="country">Country</label>
                        <input type="text" className='InputName' id="country" required name='country' />
                        {/* {errors.userName && <div className="text-danger">{errors.userName}</div>} */}
                    </div>


                    {/* <!-- Submit button --> */}
                    <div className="PayFildsBtn">
                        <button type="submit" className="btnPayShop">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Payment; 