import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { baseUrl } from '../Utility/Constant';
import { Row, Col, Container, Dropdown, Nav } from 'react-bootstrap';
import axios from 'axios';
// import OptionsSelect from '../Utility/OptionsSelect';
import ProductCard from '../Prodacts/ProductCard';
import CardProductContainer from '../Prodacts/CardProductContainner';
import fetchData from '../Utility/GetCategory';

const Films = (limit, page) => {
    const [categories, setCategories] = useState([]);
    const [dates, setDate] = useState([]);
    const [sections, setSection] = useState([]);
    const [category, setCategoryQuery] = useState('');
    const [section, setSectionQuery] = useState('');
    const [date, setDateQuery] = useState('');
    const handleCategory = (id) => {
        setCategoryQuery(id)
    }
    const handleSection = (id) => {
        setSectionQuery(id)
    }
    const handleDate = (id) => {
        setDateQuery(id)
    }
    const [serchTitle, setTitleQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [lengthFilms, setLenghtFilms] = useState();
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=20`, setCategories)
        fetchData(`${baseUrl}dates`, setDate)
        fetchData(`${baseUrl}sections`, setSection)
        console.log(page)
        // Perform search when the setserchTitle changes
        if (serchTitle.trim() !== '' || category !== '' || section !== '' || date !== '' ) {
            // Call your search API endpoint with the setserchTitle
            axios.get(`${baseUrl}searchfilm?title=${serchTitle}&category=${category}&section=${section}&date=${date}&limit=${10}&page=${2}`)
                .then(response => {
                    setSearchResults(response.data.data);
                    setLenghtFilms(response.data.data.length);
                    console.log(response.data.data.length)
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setLenghtFilms(0)
                });

        } else {
            setSearchResults([])
        }
    }, [serchTitle, category, section, date, limit, page]);
    return (
        <>
            <div className='d-flex justify-content-between my-4 filSearchFB'>
                <div className='filTitle'>
                    <h2 className='d-block text-light'>Search Your Favorit Movis</h2>
                </div>
                <div className='searchform'>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <div className="serch d-flex">
                            <input
                                className="searchInput"
                                placeholder="Search for films..."
                                value={serchTitle}
                                onChange={(e) => setTitleQuery(e.target.value)}
                                aria-label="Search"
                            />
                            <i className='fa fa-search'></i>
                        </div>
                    </form>
                </div>


            </div>

            <Row className='d-flex justify-content-arouond option'>
                <Col className='text-light col-lg-12'>
                    {searchResults && <div className='d-block'>
                        {lengthFilms >= 0 && <h5 className='text-secondary'>Results of Your search is: {lengthFilms}</h5>}
                    </div>}
                </Col>
                < Col className='d-flex justify-content-between' style={{ 'width': '10000px' }}>
                    <Nav className="col navbar p-2 navCategory bg-light rounded d-flex justify-content-evenly active" style={{ 'width': '790px', "cursor": 'default', 'height': '38px' }}>
                        {categories.map((category) => (
                            <li key={category._id} style={{ 'height': '30px' }} className="nav-item">
                                <span onClick={() => { handleCategory(category._id) }} className='nav text-dark'>
                                    {category.name}
                                </span>
                            </li>
                        ))}
                    </Nav>
                    {/* Section option */}
                    <Dropdown className="mx-1" >
                        <Dropdown.Toggle style={{ width: '130px' }} variant="light" id="dropdown-basic">
                            Section
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <tr className='d-flex dates'> {
                                sections.map((section) => {
                                    return (
                                        <td key={section._id}> <Dropdown.Item href="" onClick={() => { handleSection(section._id) }}>{section.name}</Dropdown.Item></td>
                                    )
                                })}</tr>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* Date option */}
                    <Dropdown >
                        <Dropdown.Toggle style={{ width: '130px' }} variant="light" id="dropdown-basic">
                            Date
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <tr className='d-flex dates'>
                                {dates.map((date) => {
                                    return (
                                        <td key={date._id}><Dropdown.Item onClick={() => { handleDate(date._id) }} href="#/action-1">{date.name}</Dropdown.Item></td>
                                    )
                                })}
                            </tr>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col >
            </Row >
            {/* search results */}
            <Container >
                <Col className="serchResult my-4 d-flex flex-wrap justify-content-between">
                    {searchResults.length > 0 && page ? (
                        searchResults.map((serchFilms) => (
                            <Link to='' key={serchFilms._id}>
                                <ProductCard
                                    image={serchFilms.imageCover}
                                    name={serchFilms.title}
                                    prix={serchFilms.price}
                                    stars={serchFilms.ratingsAverage}
                                    disc={serchFilms.description}
                                />
                            </Link>
                        ))
                    ) : (
                        <CardProductContainer urlapi='films' limit="10" page={page} />
                    )}
                </Col>
            </Container>
        </>
    )
};

export default Films;