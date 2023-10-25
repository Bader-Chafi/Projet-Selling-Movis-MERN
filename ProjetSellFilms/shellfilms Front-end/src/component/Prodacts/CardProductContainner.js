import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "../Prodacts/ProductCard";
import SubTitle from "../Utility/SubTitle";
import fetchData from "../Utility/GetCategory";
import { useState } from "react";
import { baseUrl } from "../Utility/Constant";
import { Link } from "react-router-dom";

const CardProductContainer = ({ urlapi, title, btn_title, liens, limit, page }) => {
    // Get Movis
    const [films, setFilms] = useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}${urlapi}/?limit=${limit}&page=${page}`, setFilms)
    }, [limit, page, urlapi]);

    return (
        <Container>
            <SubTitle liens={liens} title={title} btnTitle={btn_title} />
            <Row className="my-2 d-flex justify-content-between">
                <div className="d-flex flex-wrap justify-content-between">
                    {
                        films.map((film) => {
                            return (
                                <Link to='' key={film._id}>
                                    <ProductCard
                                        image={film.imageCover}
                                        name={film.title}
                                        prix={film.price}
                                        stars={film.ratingsAverage}
                                        disc={film.description} />
                                </Link>
                            )
                        })
                    }
                </div>
            </Row>
        </Container>
    )
}

export default CardProductContainer;