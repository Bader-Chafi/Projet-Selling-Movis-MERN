import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
}
    from 'mdb-react-ui-kit';
import '../../component/Styles/login.css'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <MDBContainer className="my-5 p-5 gradient-form">
            <MDBRow>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5">
                        <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                style={{ width: '185px' }} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">We are 1337 Movis</h4>
                        </div>
                        <p className='text-primary'>Please login to your account</p>
                        <MDBInput wrapperClass='mb-4' size='lg' label='Email address' id='form1' type='email' />
                        <MDBInput wrapperClass='mb-4' size='lg' label='Password' id='form2' type='password' />
                        <div className="text-center pt-1 mb-5 pb-1">
                            <button className='btn btn-primary mb-4 w-100'>
                                <Link to="/log" className="href text-light">Signin</Link>
                            </button>
                            <Link to="#!" className="text-muted">Forgot password?</Link><br/>
                            <Link to="/admin" className="text-muted">Go To the page admin</Link>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <Link to='/signin' className="mb-0 text-dark">Don't have an account?</Link>

                        </div>
                    </div>
                </MDBCol>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">We are more than just a company</h4>
                            <p className="small mb-0">BMovis is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected ...
                            </p>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default LoginPage;