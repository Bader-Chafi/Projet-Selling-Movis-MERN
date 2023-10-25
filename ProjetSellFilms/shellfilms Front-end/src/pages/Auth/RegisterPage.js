import React from 'react';
import '../../component/Styles/signin.css'
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5 p-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' />
                    <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' />
                    <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' />
                    <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' />
                    <div className='d-flex flex-row justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                    </div>
                    <button className='btn btn-primary mb-4 w-100'>
                        <Link to="/crateUser" className="href text-light">Register</Link>
                    </button>
                    <Link to='/login' className='gradient-custom-4'>I Have an account BMovis</Link>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}


export default RegisterPage;