import React from "react";
import { Col, Dropdown, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { baseUrl } from '../../component/Utility/Constant';
import fetchData from "./GetCategory";


const OptionsSelect = () => {
    // Get Categories
    const [categories, setCategories] = useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=20`, setCategories)
    }, [])

    // get Dates;
    const [dates, setDate] = useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}dates`, setDate)
    }, []);
    // Get Sections
    const [sections, setSection] = useState([]);
    React.useEffect(() => {
        fetchData(`${baseUrl}sections`, setSection)
    }, []);
    return (
        < Col className='d-flex justify-content-between' style={{ 'width': '10000px' }}>
            <Nav className="col navbar p-2 navCategory bg-light rounded d-flex justify-content-evenly active" style={{ 'width': '790px', "cursor": 'default', 'height': '38px' }}>
                {categories.map((category) => (
                    <li key={category._id} style={{ 'height': '30px' }} className="nav-item">
                        <span className='nav text-dark'>
                            {category.name}
                        </span>
                    </li>
                ))}
            </Nav>
            {/* Section option */}
            <Dropdown className="mx-1" Dropdown>
                <Dropdown.Toggle style={{ width: '130px' }} variant="light" id="dropdown-basic">
                    Section
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <tr className='d-flex dates'> {
                        sections.map((section) => {
                            return (
                                <td key={section._id}> <Dropdown.Item href="">{section.name}</Dropdown.Item></td>
                            )
                        })}</tr>
                </Dropdown.Menu>
            </Dropdown>
            {/* Date option */}
            <Dropdown Dropdown>
                <Dropdown.Toggle style={{ width: '130px' }} variant="light" id="dropdown-basic">
                    Date
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <tr className='d-flex dates'>
                        {dates.map((date) => {
                            return (
                                <td key={date._id}><Dropdown.Item href="#/action-1">{date.name}</Dropdown.Item></td>
                            )
                        })}
                    </tr>
                </Dropdown.Menu>
            </Dropdown>
        </Col >
    )

}

export default OptionsSelect