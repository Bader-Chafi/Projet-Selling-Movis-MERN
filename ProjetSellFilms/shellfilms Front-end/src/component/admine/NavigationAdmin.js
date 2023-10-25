import React from "react";
import { Dropdown } from "react-bootstrap";

const NavigationAdmin = () => {
    return (
        <div className="Nav-Virtikal">
            <ul className="d-flex flex-column">
                <Dropdown Dropdown >
                    <Dropdown.Toggle style={{ width: '200px' }} variant="light" id="dropdown-basic">
                        Movis
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/add-product">Add Movis</Dropdown.Item>
                        <Dropdown.Item to="#">Update Movis</Dropdown.Item>
                        <Dropdown.Item to="#">Destroy Movis</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ul>
        </div>
    )
};

export default NavigationAdmin;