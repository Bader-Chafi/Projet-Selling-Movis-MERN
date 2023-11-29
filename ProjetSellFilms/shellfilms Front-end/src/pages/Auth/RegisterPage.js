import React from 'react';
import '../../component/Styles/signin.css';
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        email: '',
        password: ''
    });
    const resetForm = () => {
        setUserData({
            userName: '',
            email: '',
            password: ''
        })
    }
    const [register, setRegister] = useState('')
    const [notif, setNotif] = useState(false);
    const showNotifications = () => {
        setNotif(true);
        setTimeout(() => {
            setNotif(false);
            navigate('/login');
        }, 3000);
    }
    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        password: ''
    });
    // const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/users`, userData);
            if (res) {
                resetForm()
                setRegister('Your registration is successfully')
                setErrors({
                    userName: '',
                    email: '',
                    password: '',
                });
                showNotifications();
            }
            // Handle success response here
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data && error.response.data.errors && error.code) {
                const errorData = error.response.data.errors;
                console.log(error)
                const newErrors = {};
                errorData.forEach(err => {
                    // Map the server-side field names to the state property names
                    if (err.path === 'userName') {
                        newErrors.userName = err.msg;
                    } else if (err.path === 'email') {
                        newErrors.email = err.msg;
                    } else if (err.path === 'password') {
                        newErrors.password = err.msg;
                    }

                });
                // Set the errors state with the new error messages
                setErrors(newErrors);
            }
        }
    }

    // Update the postData state as the user interacts with the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    return (
        // < !--Section: Design Block-- >
        <section className="background-radial-gradient overflow-hidden">
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0 text-center" style={{ 'z-index': "10" }}>
                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ "color": "hsl(218, 81%, 95%)" }}>
                            The best Web Site <br />
                            <span style={{ "color": "hsl(218, 81%, 75%)" }}>Register For Watch enyTime enyWher</span>
                        </h1>
                        <p className="mb-4 opacity-70" style={{ "color": "hsl(218, 81%, 85%)" }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Temporibus, expedita iusto veniam atque, magni tempora mollitia
                            dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                            ab ipsum nisi dolorem modi. Quos?
                        </p>
                    </div>
                    {/* <!-- Alert Success --> */}
                    {
                        notif && register &&
                        <div className='bg-succes RegisterAlert' >
                            <i class='bx bx-user-check' ></i>
                            register is successful
                        </div>
                    }
                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        {/* Display the error message if it exists */}
                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">
                                <form className='d-flex row'>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="userName">UserName</label>
                                        <input value={userData.userName} type="text" onChange={handleInputChange} id="userName" required name='userName' className="form-control" />
                                        {errors.userName && <div className="text-danger">{errors.userName}</div>}
                                    </div>

                                    {/* Email input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="email">Email address</label>
                                        <input value={userData.email} type="email" onChange={handleInputChange} required id="email" name='email' className="form-control" />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>

                                    {/* Password input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input value={userData.password} type="password" onChange={handleInputChange} required id="password" name='password' className="form-control" />
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button> <br />
                                    <Link to='/login'>I Have already An Account BMovis</Link>

                                    {/* <!-- Register buttons --> */}
                                    <div className="text-center">
                                        <p style={{ "color": 'blue' }}>or sign up with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-google"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-github"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default RegisterPage;