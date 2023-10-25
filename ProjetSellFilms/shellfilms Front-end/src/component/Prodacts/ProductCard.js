import React from "react";
import {
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,

} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

const ProductCard = ({ image, name, prix, stars, disc }) => {
    return (
  
            <div className="my-2 cardd">
                <MDBRow className="">
                    <div>
                        <MDBCard className="text-light">
                            <MDBCardImage className="card-image"
                                src={image}
                                position="top"
                                alt="image"
                            />
                            <MDBCardBody className="Product-card-body">
                                <div className="text-center">
                                    <MDBCardTitle>{name}</MDBCardTitle>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Prix</span>
                                    <span>{prix}</span>
                                </div>
                                <div className="discription text-center text-secondary">
                                    {disc}
                                </div>
                                <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                    <Button className="btn btn-info">Add To Pnier</Button>
                                    <i className="fa-regular fa-heart"></i>
                                    <span>{stars}<i className="fa-solid fa-star" color="red"></i></span>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </MDBRow>
            </div>


    )
}

export default ProductCard;