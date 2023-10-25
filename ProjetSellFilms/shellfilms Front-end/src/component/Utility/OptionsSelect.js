import React from "react";
import { Col, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { baseUrl } from '../../component/Utility/Constant';
import fetchData from "./GetCategory";


const OptionsSelect = () => {
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
        < Col className='d-flex justify-content-evenly' >
            {/* Section option */}
            <Dropdown Dropdown >
                <Dropdown.Toggle style={{ width: '130px' }} variant="light" id="dropdown-basic">
                    Section
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <tr className='d-flex dates'> {
                        sections.map((section) => {
                            return (
                                <td> <Dropdown.Item key={section._id} href="">{section.name}</Dropdown.Item></td>
                            )
                        })}</tr>
                </Dropdown.Menu>
            </Dropdown>

            {/* Date option */}
            <Dropdown Dropdown >
                <Dropdown.Toggle style={{ width: '130px' }} variant="light" id="dropdown-basic">
                    Date
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <tr className='d-flex dates'>
                        {dates.map((date) => {
                            return (
                                <td><Dropdown.Item key={date._id} href="#/action-1">{date.name}</Dropdown.Item></td>
                            )
                        })}
                    </tr>

                </Dropdown.Menu>
            </Dropdown>
        </Col >
    )

}

export default OptionsSelect