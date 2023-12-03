import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const SubTitle = ({ title, btnTitle, liens }) => {

    return (
            <div className="d-flex justify-content-between py-2 subtitleB align-items-center">
                <Card.Title className="sub-title">{title}</Card.Title>
                {btnTitle ? (
                    <button className="btn Acheter">
                        <Link to={liens} className="btn-link">{btnTitle}</Link>
                    </button>
                ) : null}
            </div>
    )
}

export default SubTitle