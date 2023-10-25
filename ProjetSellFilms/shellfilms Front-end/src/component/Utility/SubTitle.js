import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const SubTitle = ({ title, btnTitle, liens }) => {
    
    return (
        <div className="d-flex justify-content-between py-2">
            <Card.Title className="sub-title">{title}</Card.Title>
            {btnTitle ? (
                <Button className="shopping-now">
                    <Link to={liens} className="text-light">{btnTitle}</Link>
                </Button>
            ) : null}
        </div>
    )
}

export default SubTitle