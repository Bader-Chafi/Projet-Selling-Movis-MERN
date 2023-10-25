import React from "react";
import { Container } from "react-bootstrap";

import '../../component/Styles/home.css';
import NavigationAdmin from "../../component/admine/NavigationAdmin";
import AddMovis from "../../component/admine/AddMovis";

const AdminPage = () => {

    return (
        <div className="admin" style={{ marginTop: "100px" }}>
            <Container className="adminFB">
                <NavigationAdmin />
                <div className="">
                    <div className="addProductAdmin">
                        <AddMovis />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AdminPage;
