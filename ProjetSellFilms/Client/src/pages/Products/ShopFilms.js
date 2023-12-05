import React from 'react';
import { Container } from 'react-bootstrap';
import Films from '../../component/category/Films';
import Paginate from '../../component/Utility/Paginate';

const ShopFilms = () => {
    const [currentPage, setCurrentPage] = React.useState();
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    console.log(currentPage)
    return (
        <div className='all-product' style={{}}>
            <Container>
                <Films limit='5' page={currentPage} />
                <Paginate onPageChange={handlePageChange} />
            </Container>
        </div>

    )
};

export default ShopFilms;