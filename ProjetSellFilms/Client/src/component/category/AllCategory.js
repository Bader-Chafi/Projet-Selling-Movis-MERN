import React from 'react';
import SubTitle from '../Utility/SubTitle';
import { Col, Container } from 'react-bootstrap';
import fetchData from '../Utility/GetCategory';
import { baseUrl } from '../Utility/Constant';
import CategoryCard from './CategoryCard';


const AllCategory = () => {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=10&page=1`, setCategories)
    }, [])

    return (
        <div className='all-product'>
            <Container>
                <SubTitle title='All Category' />
                <Col className="my-2 d-flex justify-content-between Category_card flex-wrap">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            category_card_text={category.name}
                            img={category.image}
                        />
                    ))}
                </Col>
            </Container>
            {/* <CardProductContainer /> */}
        </div>
    )
};

export default AllCategory;