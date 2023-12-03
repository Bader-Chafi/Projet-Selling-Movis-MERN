import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import CategoryCard from "../category/CategoryCard";
import CardProductContainer from "../Prodacts/CardProductContainner";
import { baseUrl } from "../Utility/Constant";
import fetchData from "../Utility/GetCategory";

const HomeHeader = () => {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=5&page=1`, setCategories)
    }, [])

    return (
        <>
            <div className="subtitleB">
                <Container>
                    <SubTitle liens='/all_category' title='CATEGORY' btnTitle='SHOW MORE' />
                </Container>    
            </div>
            <div className="d-flex justify-content-between ">
                <Container>
                    <Row>
                        {categories.map((category) => (
                            <CategoryCard
                                key={category._id}
                                category_card_text={category.name}
                                img={category.image}
                            />
                        ))}
                    </Row>
                </Container>
            </div>


            {/* NEW MOVIES */}
            <CardProductContainer
                liens='/ShopFilms'
                title="NEW MOVIES"
                urlapi='films'
                limit='5'
                page='1'
                btn_title='Show Me More' />

            {/* HOROR MOVIES */}
            <CardProductContainer
                liens='/ShopFilms'
                title="HOROR MOVIES"
                urlapi='categories/65367d10513326c7007c5334/films'
                limit='5'
                page='2'
                btn_title='Show All Movis' />
        </>

    )
};

export default HomeHeader;