import React from "react";
import { Container, Row } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import CategoryCard from "../category/CategoryCard";
import CardProductContainer from "../Prodacts/CardProductContainner";
import { baseUrl } from "../Utility/Constant";
import fetchData from "../Utility/GetCategory";



const HomeCategory = () => {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=5&page=1`, setCategories)
    }, [])

    return (
        <>
            <Container>
                <SubTitle liens='/all_category' title='CATEGORY' btnTitle='SHOW MORE' />
            </Container>
            <Row className="my-2 d-flex justify-content-between Category_card">
                {categories.map((category) => (
                    <CategoryCard
                        key={category._id}
                        category_card_text={category.name}
                        img={category.image}
                    />
                ))}
            </Row>

            {/* NEW MOVIES */}
            <CardProductContainer
                title="NEW MOVIES"
                urlapi='films'
                limit='5'
                page='1'
                btn_title='Show Me More' />

            {/* HOROR MOVIES */}
            <CardProductContainer
                title="HOROR MOVIES"
                urlapi='categories/65367d10513326c7007c5334/films'
                limit='5'
                page='2'
                liens='/products'
                btn_title='Show Me More' />
        </>

    )
};

export default HomeCategory;