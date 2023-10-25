import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../Utility/Constant";
import { useEffect } from "react";
import fetchData from "../Utility/GetCategory";
import axios from "axios";

const AddMovis = () => {
    const [categories, setCategories] = useState([]);
    const [dates, setDates] = useState([]);
    const [sections, setSections] = useState([]);
    useEffect(() => {
        fetchData(`${baseUrl}categories/?limit=20`, setCategories)
        fetchData(`${baseUrl}dates`, setDates)
        fetchData(`${baseUrl}sections`, setSections)
    }, []);

    const [postData, setPostData] = useState({
        title: "",
        category: "",
        date: "",
        section: "",
        imageCover: null,
        video: null,
        price: "",
        sold: "",
        decription: ""
    }); // State for the data you want to post

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to a specific URL
            const response = await axios.post(`${baseUrl}films`, postData);
            // Handle the response here (e.g., show a success message)
            console.log("POST request was successful!", response.data);
        } catch (error) {
            // Handle any errors (e.g., show an error message)
            console.error("Error making POST request:", error);
        }
    };

    // Update the postData state as the user interacts with the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };
    return (
        <form className="form-horizontal ">
            <fieldset className="d-flex row justify-content-center">
                {/* <!-- Form Name --> */}
                <legend>ADD MOVIS</legend>
                <table className="justify-content-around w-75" cellPadding={5}>
                    {/* Title */}
                    <tr>
                        <td><label className="control-label" for="title">Title of Film</label></td>
                        <td><input id="title" name="title" onChange={handleInputChange} placeholder="title Films" className="form-control" required="" type="text" /></td>
                    </tr>
                    {/* category */}
                    <tr>
                        <td><label className="control-label" for="Categorie">Category Of Film</label></td>
                        <td>
                            <select id="Categorie" name="category" onChange={handleInputChange} className="form-control">
                                <option>Select Your Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        <Link to={category._id} className='nav-link text-dark'>{category.name}</Link>
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    {/* Date */}
                    <tr>
                        <td><label className="control-label" for="date">Date Of Film</label></td>
                        <td>
                            <select id="date" name="date" onChange={handleInputChange} className="form-control">
                                <option value="">Select The Date</option>
                                {dates.map((date) => (
                                    <option key={date._id} value={date._id}>
                                        <Link to='#' className='nav-link text-dark'>{date.name}</Link>
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    {/* section */}
                    <tr>
                        <td><label className="control-label" for="date">Section Of Film</label></td>
                        <td>
                            <select id="date" name="section" onChange={handleInputChange} className="form-control">
                                <option value="">Select The Date</option>
                                {sections.map((section) => (
                                    <option key={section._id} value={section._id}>
                                        <Link to='#' className='nav-link text-dark'>{section.name}</Link>
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    {/* imAGE Cover*/}
                    <tr>
                        <td><label className="control-label" for="image">Image Cover</label></td>
                        <td>
                            <input
                                id="image"
                                name="imageCover"
                                onChange={handleInputChange}
                                placeholder="image Film"
                                className="form-control"
                                required=""
                                type="file" />
                        </td>
                    </tr>
                    {/* video */}
                    <tr>
                        <td><label className="control-label" for="image">Video Of Film</label></td>
                        <td>
                            <input
                                id="video"
                                name="video"
                                onChange={handleInputChange}
                                accept="video/mp4,video/x-m4v,video/*"
                                placeholder="video Film"
                                className="form-control"
                                required=""
                                type="file" />
                        </td>
                    </tr>
                    {/* Price */}
                    <tr>
                        <td>
                            <label className="control-label" htmlFor="price">
                                Price of Film
                            </label>
                        </td>
                        <td>
                            <input onChange={handleInputChange}
                                id="price"
                                name="price"
                                placeholder="Price Films"
                                className="form-control"
                                required=""
                                type="number"
                            />
                        </td>
                    </tr>
                    {/* sold */}
                    <tr>
                        <td>
                            <label className="control-label" htmlFor="sold">
                                Sold of Film
                            </label>
                        </td>
                        <td>
                            <input
                                onChange={handleInputChange}
                                id="sold"
                                name="sold"
                                placeholder="sold Films"
                                className="form-control"
                                required=""
                                type="number"
                            />
                        </td>
                    </tr>
                    {/* Decription */}
                    <tr>
                        <td><label className="control-label" for="discription">Decription Of Film</label></td>
                        <td>
                            <textarea name="description" onChange={handleInputChange} placeholder="Enter text here..."></textarea>
                        </td>
                    </tr>
                    {/* Button */}
                    <tr>
                        <td colspan="2">
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={{ width: "250px" }}>
                                Add Movis
                            </button>
                        </td>
                    </tr>
                </table>
            </fieldset>
        </form>
    )
};

export default AddMovis;