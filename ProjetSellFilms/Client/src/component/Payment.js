import React, { useState, } from 'react';
import { useParams } from 'react-router-dom';
import GetFilm from './Utility/GetFilm';
import ProductCard from './Prodacts/ProductCard';
// import axios from 'axios';
// import { baseUrl } from './Utility/Constant';


const Payment = () => {
    const { id } = useParams();
    const [filmData, setFilmData] = useState(null);
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
    const [error, setError] = useState({});
    const [errNotif, setErrNotif] = useState(true);

    GetFilm(id, setFilmData);

    const showError = () => {
        setErrNotif(true);
        setTimeout(() => {
            setErrNotif(false);
        },90000000);
    };

    const validateForms = () => {
        const newError = {}; // Initialize an empty error object
        if (userPayData.fullName === '') {
            newError.fullName = 'Fullname is required';
        }

        if (!/^(\d{4}\s?){3}\d{4}$/.test(userPayData.cartNumber)) {
            newError.cartNumber = 'Card number Not valid';
        }

        if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(userPayData.date)) {
            newError.date = 'Filed Date';
        }

        if (!/^\d{3}$/.test(userPayData.cvc)) {
            newError.cvc = 'filed CVC';
        }
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userPayData.email)) {
            newError.email = 'The email address not valid';
        }
        if (!/^\+\d{3} \d{9}$/.test(userPayData.phoneNumber)) {
            newError.phoneNumber = "N° Like +212 777508781";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForms();
        if (isValid) {
            console.log('success');
        } else {
            console.log(error);
            showError();
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserPayData({
            ...userPayData,
            [name]: value,
        });
        // Clear the error for the current field
        setError({
            ...error,
            [name]: '',
        });
    };
    return (
        <div className='Payment container'>
            <div className='PayFilm'>
                {filmData &&
                    <>
                        <h2 className='PayPrice'>Totale : {filmData.price}$$ </h2>
                        <ProductCard
                            id={filmData.id}
                            image={filmData.imageCover}
                            name={filmData.title}
                            prix={filmData.price}
                            stars={filmData.rantingAverage}
                            disc={filmData.disc}
                        />
                    </>
                }
            </div>
            <div className='PayForm'>
                <form className=''>
                    <legend>PAYMENT DETAILE</legend>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="fullName">FullName</label>
                        <input
                            id="fullName"
                            type="text"
                            className='InputName'
                            required
                            onChange={handleInputChange}
                            value={userPayData.fullName}
                            placeholder='Bader Chafi'
                            name='fullName' />
                        {errNotif && <p className="PayError">{error.fullName}</p>}
                    </div>

                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="cartNumber">Cart Number</label>
                        <input
                            id="cartNumber"
                            onChange={handleInputChange}
                            value={userPayData.cartNumber}
                            type="text"
                            className='InputName'
                            placeholder='4242 4242 4242 4242'
                            maxLength='19'
                            required
                            name='cartNumber' />
                        {errNotif && <p className="PayError">{error.cartNumber}</p>}
                    </div>
                    <div className="PayFilds CDate wrap">
                        <div>
                            <label className="PayLabel" htmlFor="cvc">CVC</label>
                            <input
                                id='cvc'
                                onChange={handleInputChange}
                                value={userPayData.cvc}
                                type="number"
                                className='InputName'
                                required
                                placeholder="123"
                                name='cvc' />
                                {errNotif && <p className="PayError">{error.cvc}</p>}
                        </div>
                        <div>
                            <label className="PayLabel" htmlFor="date">Date</label>
                            <input
                                id='date'
                                onChange={handleInputChange}
                                value={userPayData.date}
                                type="text" className='InputName'
                                required placeholder='12/25'
                                name='date' style={{'width':'133px'}}/> 
                                {errNotif && <p className="PayError">{error.date}</p>}
                        </div>
                        <div className="PayFilds">
                            <label className="PayLabel" htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                onChange={handleInputChange}
                                value={userPayData.phoneNumber}
                                type="telephone"
                                className='InputName'
                                placeholder='+212 777508781'
                                required name='phoneNumber' />
                            {errNotif && <p className="PayError">{error.phoneNumber}</p>}
                        </div>
                    </div>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            placeholder='ReallyEmail@gmail.com'
                            onChange={handleInputChange}
                            value={userPayData.email}
                            type="email"
                            className='InputName'
                            required
                            name='email' />
                        {errNotif && <p className="PayError">{error.email}</p>}
                    </div>
                    <div className="PayFilds">
                        <label className="PayLabel" htmlFor="country">Country</label>
                        <input
                            id="country"
                            placeholder='Morocco'
                            onChange={handleInputChange}
                            value={userPayData.country}
                            type="text"
                            className='InputName'
                            required
                            name='country' />
                        {errNotif && <p className="PayError">{error.country}</p>}
                    </div>


                    {/* <!-- Submit button --> */}
                    <div className="PayFildsBtn">
                        <button type="submit" onClick={handleSubmit} className="btnPayShop">
                            Shop Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment; 