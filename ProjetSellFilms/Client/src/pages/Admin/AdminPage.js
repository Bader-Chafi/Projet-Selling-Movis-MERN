import React from "react";
import '../../component/Styles/Admin.css';
import AddMovis from "../../component/admine/AddMovis";
import NavigationAdmin from "../../component/admine/NavigationAdmin";
const AdminPage = () => {

    return (
        <div className="adminFB">
            <div className="adminAll container">
                <NavigationAdmin />
                <AddMovis />
            </div>
        </div>
    );
};

export default AdminPage;
