import React, { useState } from 'react';
import Paginate from '../../component/Utility/Paginate';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryHeader from '../../component/category/CategoryHeader';
import CardProductContainer from '../../component/Prodacts/CardProductContainner';
import OptionsSelect from '../../component/Utility/OptionsSelect';


const ShopFilms = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    console.log(currentPage)
    return (
        <div className='all-product' style={{ marginTop: '90px' }}>
            <Container>
                <CategoryHeader/>
                <Row className='d-flex justify-content-arouond option'>
                    <Col>
                        <h5>20 Films Exist </h5>
                    </Col>

                    <OptionsSelect/>
                    
                </Row>

                <CardProductContainer urlapi='films' limit="5" page={currentPage}/>

                <Paginate onPageChange={handlePageChange}/>
            </Container>
        </div>

    )
};

export default ShopFilms;