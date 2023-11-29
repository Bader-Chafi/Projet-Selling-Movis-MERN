import React from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../Prodacts/ProductCard";
import SubTitle from "../Utility/SubTitle";
import fetchData from "../Utility/GetCategory";
import { useState } from "react";
import { baseUrl } from "../Utility/Constant";

const CardProductContainer = ({ urlapi, title, btn_title, liens, limit, page }) => {
    // Get Movis
    const [films, setFilms] = useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}${urlapi}/?limit=${limit}&page=${page}`, setFilms)
    }, [limit, page, urlapi]);

    return (
        <>
            <Container>
                <SubTitle liens={liens} title={title} btnTitle={btn_title} />
                <div className="serchResult my-2">
                    {
                        films.map((film) => {
                            return (
                                <ProductCard
                                    image={film.imageCover}
                                    name={film.title}
                                    prix={film.price}
                                    stars={film.ratingsAverage}
                                    disc={film.description} />
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default CardProductContainer;