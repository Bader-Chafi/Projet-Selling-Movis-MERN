import React, { useState } from "react";
import GetUserInfo from "../../component/Utility/GetUser";
import PaymentCard from "./PaymentCard";
import CartItemUser from "../../component/cartItem/CartItemsUser";
import { baseUrl } from "../../component/Utility/Constant";

const ProfileUser = () => {
    const [user, setUser] = useState();
    const userid = window.localStorage.getItem("user_id");
    GetUserInfo(userid, setUser);
    const [currentPage, setCurrentPage] = useState('paymentCart');
    const ShowContent = (page) => {
        setCurrentPage(page);
    };
    const GetContentPage = (page) => {
        switch (page) {
            case 'paymentCart Items':
                return <PaymentCard />;
            case 'cartItems':
                return <CartItemUser />;
            default:
                return <PaymentCard />
        }
    };

    return (
        <>
            <div className="Profile">
                <div className="PrifileNav">
                    <div className="ImgName">
                        {user && <><img src={`${baseUrl}uploads/${user.image}`} alt={user.image} className="imagProfil" />  <h4 className="nameProfil">{user.userName}</h4></>}

                    </div>
                    <ul className="NavList">
                        <li className="ListLi" onClick={() => ShowContent('profile')}>Profile</li>
                        <li className="ListLi" onClick={() => ShowContent('paymentCart')}>Payment Card</li>
                        <li className="ListLi" onClick={() => ShowContent('cartItems')}>Cart Items</li>
                    </ul>
                </div>
                <div className="ProfileContent">
                    {GetContentPage(currentPage)}
                </div>
            </div>
        </>
    )
};

export default ProfileUser;