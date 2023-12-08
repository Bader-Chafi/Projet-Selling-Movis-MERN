import React, { useState, useEffect } from "react";
import { baseUrl } from "../component/Utility/Constant";
import axios from "axios";

const PaymentCard = () => {
    const userId = window.localStorage.getItem('user_id');
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}payment/${userId}`)
            .then(response => {
                setPaymentData(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId]);

    const formatCreditCardNumber = (creditCardNumber) => {
        const formattedNumber = creditCardNumber.replace(/\D/g, ''); // Remove non-digit characters
        const regex = /(\d{4})(\d{4})(\d{4})(\d{4})/;
        return formattedNumber.replace(regex, '$1 $2 $3 $4');
    }

    return (
        <div className='cartItems' style={{'minHeight':'66vh'}}>
            <div className='tableCard'>
                {paymentData.length > 0 ? (
                    <>
                        <div className='container d-flex justify-content-between'>
                            <h1 className='text-start text-light'>ALL Payment</h1>
                        </div>
                        <table className='text-light container cardItemsTable'>
                            <thead className='cartItemHead'>
                                <tr>
                                    <th>film ID</th>
                                    <th>Price</th>
                                    <th>Cart Credit Number</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className='cartItemBody'>
                                {paymentData.map(item => (
                                    <tr key={item._id} className=''>
                                        <td>{item.film}</td>
                                        <td>{item.price}</td>
                                        <td>{formatCreditCardNumber(item.cartNumber)}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <h1 className='text-light'>You have not Any Payment</h1>
                )}
            </div>
        </div>
    );
}

export default PaymentCard;
