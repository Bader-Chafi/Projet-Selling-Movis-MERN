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
    // Show the categories dates sections
    useEffect(() => {
        fetchData(`${baseUrl}categories?limit=10`, setCategories);
        fetchData(`${baseUrl}dates`, setDates);
        fetchData(`${baseUrl}sections`, setSections);
    }, []);
    // Sevegardy the image and video
    const [selectedImages, setSelectedImages] = useState({
        imageCover: null,
        video: null,
    });
    // register the data of film
    const [postData, setPostData] = useState({
        title: "",
        category: "",
        date: "",
        section: "",
        imageCover: "",
        video: null,
        price: "",
        sold: "",
        description: "",
    });
    const [showNotification, setShowNotification] = useState(false);
    const showSuccessNotification = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 4000); // Hide the notification after 3 seconds
    };
    const [error, setError] = useState([]);
    const [showError, setShowError] = useState(false);
    const showErrorNotification = () => {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 4000); // Hide the notification after 3 seconds
    };
    const resetForm = () => {
        setPostData({
            title: "",
            category: "",
            date: "",
            section: "",
            imageCover: "",
            video: null,
            price: "",
            sold: "",
            description: ""
        });
        setSelectedImages({
            imageCover: null,
            video: null,
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const file = e.target.files && e.target.files[0];

        if (file) {
            setSelectedImages({ ...selectedImages, [name]: file });
        }

        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(true);
        try {
            const formData = new FormData();
            formData.append("image", selectedImages.imageCover);
            formData.append("video", selectedImages.video);
            const filmsResponse = await axios.post(`${baseUrl}films`, postData);
            const uploadResponse = await axios.post(`${baseUrl}upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const { imagePath, videoPath } = uploadResponse;
            setSelectedImages({
                ...selectedImages,
                imageCover: imagePath,
                video: videoPath,
            });
            if (filmsResponse) {
                resetForm();
                showSuccessNotification();
                event.preventDefault(false);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error in your Form";
            setError(errorMessage);
            showErrorNotification();
        }
    };

    return (
        <div className="bg-secondary col-10">
            <form className="AddMovis text-light">
                <fieldset className="d-flex row justify-content-center">
                    {/* <!-- Form Name --> */}
                    <legend className="text-center">ADD MOVIS</legend>
                    {showNotification && (
                        <div className="">
                            <span className="alert alert-success position-fixed start-50 translate-middle-x" style={{ 'width': '60%', 'top': '80px' }} role="alert">
                                Film is successfully inserted!
                            </span>
                        </div>
                    )}
                    {showError && (
                        <div className="alert alert-danger position-fixed start-50 translate-middle-x" style={{ 'width': '60%', 'top': '80px' }} role="alert">
                            <span>
                                {error}
                            </span>
                        </div>
                    )}
                    <table className="justify-content-around w-75" cellPadding={5}>
                        {/* Title */}
                        <tr>
                            <td><input id="title" name="title" value={postData.title} onChange={handleInputChange} placeholder="title Films" className="form-control" required="" type="text" /></td>
                        </tr>
                        {/* category */}
                        <tr>
                            <td>
                                <select id="Categorie" name="category" value={postData.category} onChange={handleInputChange} className="form-control">
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
                            <td>
                                <select id="date" name="date" value={postData.date} onChange={handleInputChange} className="form-control">
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
                            <td>
                                <select id="section" value={postData.section} name="section" onChange={handleInputChange} className="form-control">
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
                            <td>
                                <td>Select Image Cover</td>
                                <input
                                    value={postData.imageCover}
                                    id="image"
                                    name="imageCover"
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required=""
                                    type="file" />
                            </td>
                        </tr>
                        {/* video */}
                        <tr>
                            <td>
                                <td>Select Video Triller</td>
                                <input
                                    value={postData.video}
                                    id="video"
                                    name="video"
                                    onChange={handleInputChange}
                                    accept="video/mp4,video/x-m4v,video/*"
                                    className="form-control"
                                    required=""
                                    type="file" />
                            </td>
                        </tr>
                        {/* Price */}
                        <tr>
                            <td>
                                <input onChange={handleInputChange}
                                value={postData.price}
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
                                <input
                                    value={postData.sold}
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
                            <td>
                                <textarea col='5'
                                    value={postData.description}
                                    id="description"
                                    name="description"
                                    onChange={handleInputChange}
                                    placeholder="Enter text here..."
                                ></textarea>
                            </td>
                        </tr>
                        {/* Button */}
                        <tr>
                            <td colspan="2" style={{ 'display': 'flex' }}>
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={{ width: "250px", 'margin': 'auto' }}>
                                    Add Movis
                                </button>
                            </td>
                        </tr>
                    </table>
                </fieldset>
            </form>
        </div>
    )
};

export default AddMovis;