import React from 'react';
import CardProductContainer from '../component/Prodacts/CardProductContainner';
import Paginate from '../component/Utility/Paginate';

const ProductPage = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    console.log(currentPage)
    return (
        <div className='all-product' style={{ marginTop: '90px' }}>
            <CardProductContainer
                title='All Movies'
                urlapi="films"
                liens='films'
                limit="5"
                page={currentPage} />
            <Paginate onPageChange={handlePageChange} />
        </div>

    )
};

export default ProductPage;