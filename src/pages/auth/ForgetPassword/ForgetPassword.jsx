import React, { useState } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer, CDBLink } from 'cdbreact';
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        setErrorMessage('');

        try {
            await allAPiServicesCall.forgetPassword({ email }, getConfig(), navigate);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="main-header-login text-center my-5" style={{ borderRadius: "5px" }}>
                {/* <h1 className='text-primary'>Lyricsweb.com</h1> */}
                <img src="/assets/logo.png" alt="" />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5 mb-2 h-100">
                <CDBContainer>
                    <CDBCard className="mx-auto" style={{
                        maxWidth: '30rem',
                        width: '100%',
                        borderRadius: '10px', // Adjust the border-radius as needed
                        backgroundColor: '#f0f0f0' // Light gray background color
                    }}>
                        <CDBCardBody className="mx-4" >
                            <div className="text-center mt-4 mb-2">
                                <p className="h4 font-weight-bold">Forget Password</p>
                            </div>
                            <CDBInput
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <CDBBtn
                                color="dark"
                                onClick={(e) => handleOnSubmit(e)}
                                className="btn-block my-4 mx-auto login-button"
                            >
                                Submit
                            </CDBBtn>
                            <hr />
                            <p className="text-center">
                                <CDBLink className="d-inline p-0 signup-button text-primary" to="/login">
                                    Login?
                                </CDBLink>
                            </p>
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </div>
        </>
    );
};

export default ForgetPassword;
