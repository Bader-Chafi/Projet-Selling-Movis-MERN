import React, { useState } from "react";
import '../../component/Styles/Admin.css';
import AddMovis from "../../component/admine/AddMovis";
import NavigationAdmin from "../../component/admine/NavigationAdmin";
import GetUserInfo from "../../component/Utility/GetUser";
import { baseUrl } from "../../component/Utility/Constant";
import Payment from "./Payment";
const AdminPage = () => {
    const [admin, setAdmin] = useState();
    const userid = window.localStorage.getItem("user_id");
    GetUserInfo(userid, setAdmin);
    const [currentPage, setCurrentPage] = useState('profile');
    const ShowContent = (page) => {
        setCurrentPage(page);
    };
    const GetContentPage = (page) => {
        switch (page) {
            case 'addfiml':
                return <AddMovis />;
            case 'payment':
                return <Payment />;
            default:
                return <AddMovis />
        }
    };
    return (
        <>
            <div className="Profile">
                <div className="PrifileNav">
                    <div className="ImgName">
                        {admin && <><img src={`${baseUrl}uploads/${admin.image}`} alt={admin.image} className="imagProfil" />  <h4 className="nameProfil">{admin.userName}</h4></>}
                    </div>
                    <ul className="NavList">
                        <li className="ListLi" onClick={() => ShowContent('addfiml')}>Add film</li>
                        <li className="ListLi" onClick={() => ShowContent('payment')}>Payment</li>
                        {/* <li className="ListLi" onClick={() => ShowContent('cartItems')}>Cart Items</li> */}
                    </ul>
                </div>
                <div className="ProfileContent">
                    {GetContentPage(currentPage)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
