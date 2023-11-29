import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { baseUrl } from '../../component/Utility/Constant'
import axios from 'axios';

const LoginPage = () => {
    const [logindata, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [loginNotif, setLoginNotif] = useState(false);
    const [log, setLog] = useState('');
    const showNotifications = () => {
        setLoginNotif(true);
    };
    useEffect(() => {
        const notificationTimeout = setTimeout(() => {
            setLoginNotif(false);
        }, 3000);
        return () => clearTimeout(notificationTimeout);
    }, [loginNotif]);

    const [error, setError] = useState('')
    const handelSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/login`, logindata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                if (response.data.msg === 'OK') {
                    setLog('Your login was successful');
                    setError('');
                    setLoginData({
                        email: '',
                        password: '',
                    });
                    showNotifications();
                    console.log(response.data)
                }
            }
        } catch (err) {
            if (err.response.data.msg === 'NO') {
                console.log(err.response.data.msg)
                setError('Your email address or password is incorrect');
            }
        }
    };
    const handelInputLogin = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...logindata,
            [name]: value,
        })
    }
    return (
        // < !--Section: Design Block-- 
        <section className="background-radial-gradient overflow-hidden text-center LoginFB">
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

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">
                                <form className='d-flex row'>
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="email">Email address</label>
                                        <input value={logindata.email} type="email" id="email" onChange={handelInputLogin} name='email' className="form-control" />
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="password">Password</label>
                                        <input value={logindata.password} type="password" id="password" onChange={handelInputLogin} name='password' className="form-control" />
                                    </div>
                                    {/* success and error */}
                                    {error && <div className="alert alert-danger">!!!!!{error}!!!!!</div>}
                                    {loginNotif && <div className='alert alert-success'> {log} </div>}

                                    {/* <!-- Submit button --> */}
                                    <button type="submit" onClick={handelSubmit} className="btn btn-primary btn-block text-center mb-4">
                                        Login
                                    </button> <br />
                                    <Link to='/admin'>go to admin page</Link><br />
                                    <Link to='/register'>I Don't Have An Account</Link>


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
}

export default LoginPage;