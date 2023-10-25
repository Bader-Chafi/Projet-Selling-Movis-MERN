import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <a
            color='link'
            className='text-dark m-3 '
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </a>

          <a
            color='link'
            className='text-dark m-3 '
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-twitter' />
          </a>

          <a
            color='link'
            size="lg"
            className='text-dark m-3 '
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-google' />
          </a>

          <a
            color='link'
            className='text-dark m-3 '
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-instagram' />
          </a>

          <a
            color='link'
            className='text-dark m-3 '
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-linkedin' />
          </a>

          <a
            color='link'
            className='text-dark m-3 '
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-github' />
          </a>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2020 Copyright:
        <a className='text-dark' href='https://bader.com/'>
          Bader.Chafi.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer