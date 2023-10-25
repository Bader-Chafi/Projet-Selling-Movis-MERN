import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { baseUrl } from '../Utility/Constant';
import fetchData from '../Utility/GetCategory';


const CategoryHeader = () => {
    const [categories, setCategories] = useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=20`, setCategories)
    }, [])

    return (
        <div className='CategoryHeader my-3 d-flex' >
            <h2>All Category</h2>
            <ul className="nav">
                {categories.map((category) => (
                    <li key={category._id} className='nav-item'>
                        <Link
                            to={`${baseUrl}categories/${category._id}/films`}
                            className='nav-link'>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default CategoryHeader;