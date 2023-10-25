import React from 'react';
import CardProductContainer from '../component/Prodacts/CardProductContainner';
import Paginate from '../component/Utility/Paginate';

const ProductPage = () => {
    return (
        <div className='all-product' style={{marginTop:'90px'}}>
            <CardProductContainer title='All Movies'/>
            <CardProductContainer />
            <Paginate />
        </div>

    )
};

export default ProductPage;