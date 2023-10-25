import React from 'react';
import SubTitle from '../Utility/SubTitle';
import { Container, Row } from 'react-bootstrap';
import Paginate from '../Utility/Paginate';
import fetchData from '../Utility/GetCategory';
import { baseUrl } from '../Utility/Constant';
import CategoryCard from './CategoryCard';


const AllCategory = () => {
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=10&page=1`, setCategories)
    }, [])

    return (
        <div className='all-product' style={{ marginTop: '90px' }}>
            <Container>
                <SubTitle title='All Category' />
                <Row className="my-2 d-flex justify-content-between Category_card">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            category_card_text={category.name}
                            img={category.image}
                        />
                    ))}
                </Row>
                <Paginate />
            </Container>
            {/* <CardProductContainer /> */}
        </div>

    )
};

export default AllCategory;