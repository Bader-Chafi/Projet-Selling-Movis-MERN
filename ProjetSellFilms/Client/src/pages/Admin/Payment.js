import React, { useState, useEffect } from "react";
import { baseUrl } from "../../component/Utility/Constant";
import axios from "axios";

const Payment = () => {
    const userId = window.localStorage.getItem('user_id');
    const [paymentData, setPaymentData] = useState([]);
    const [updateStatus,setUpdateStatus] = useState({
        status: 'Success',
    });
    useEffect(() => {
        axios.get(`${baseUrl}payment`)
            .then((response) => {
                setPaymentData(response.data.data)
            }).catch((error) =>
                console.error(error)
            );
    }, [userId]);
    const formatCreditCardNumber = (creditCardNumber) => {
        const formattedNumber = creditCardNumber.replace(/\D/g, ''); // Remove non-digit characters
        const regex = /(\d{4})(\d{4})(\d{4})(\d{4})/;
        return formattedNumber.replace(regex, '$1 $2 $3 $4');
    }

    const acceptePayment = async (idItem) => {
        await axios.put(`${baseUrl}payment/${idItem}`,updateStatus, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        window.location.reload(true);
    }

    return (
        <div className='cartItems container'>
            <div className='tableCard'>
                {paymentData.length > 0 ?
                    <>
                        <div className='container d-flex justify-content-between'>
                            <h1 className='text-start text-light'>ALL Payment Cart  :::  {paymentData.length}</h1>
                        </div>
                        <div className='cartItemBody'>
                            {paymentData.map(item => (
                                <>
                                    <div key={item._id} className='cartItem'>
                                        <span >{item.film}</span>
                                        <span>{item.price} $$</span>
                                        <span>{formatCreditCardNumber(item.cartNumber)}</span>
                                        {item.status === 'Proccess' ?
                                            <span className="text-warning">{item.status}</span> :
                                            <span className="text-success">{item.status}</span>
                                        }
                                        <span className="btn-accept">
                                         <span className="btn btn-primary" onClick={() => acceptePayment(item._id)}>Successfuly</span>
                                        </span>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                    : <h1 className='text-light'>You have not Any Payment</h1>
                }
            </div>
        </div>
    )
}

export default Payment;