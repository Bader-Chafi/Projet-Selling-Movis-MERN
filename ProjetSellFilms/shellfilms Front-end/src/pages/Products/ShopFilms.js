import React, { useState } from 'react';
import Paginate from '../../component/Utility/Paginate';
import { Container} from 'react-bootstrap';
import Films from '../../component/category/Films';

const ShopFilms = () => {
    const [currentPage, setCurrentPage] = useState(1);

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