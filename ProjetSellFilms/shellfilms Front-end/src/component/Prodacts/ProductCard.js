import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,

} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ image, name, prix, stars, disc }) => {
    return (
        <div className="my-2 cardd ">
            <div style={{'width':'100%'}}>
                    <MDBCard className="text-light">
                        <MDBCardImage className="card-image"
                            src={`http://localhost:8000/api/v1/uploads/${image}`}
                            position="top"
                            alt="image"
                        />
                        <MDBCardBody className="Product-card-body">
                            <div className="text-center">
                                <MDBCardTitle>{name}</MDBCardTitle>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Prix</span>
                                <span>{prix}$$</span>
                            </div>
                            <div className="discription text-center text-secondary">
                                {disc}
                            </div>
                            <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                <Button className="btn btn-info"><Link className="nav-link" to=''>Add To Pnier</Link></Button>
                                <i className="fa-regular fa-heart"></i>
                                <span>{stars}<i className="fa-solid fa-star" color="red"></i></span>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
            </div>
        </div>


    )
}

export default ProductCard;