import React, { useState } from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer, CDBLink } from 'cdbreact';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommonLayout from '../../../layouts/CommonLayout';
import './LoginPage.css';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        }

        return errors;
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            await allAPiServicesCall.loginAdmin({ email, password }, getConfig(), navigate);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CommonLayout>
            <div className="d-flex justify-content-center align-items-center mt-5 mb-2 h-100">
                <CDBContainer>
                    <CDBCard className="mx-auto" style={{ maxWidth: '30rem', width: '100%' }}>
                        <CDBCardBody className="mx-4">
                            <div className="text-center mt-4 mb-2">
                                <p className="h4 font-weight-bold">Sign in</p>
                            </div>
                            <CDBInput
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                            <div style={{ position: 'relative' }}>
                                <CDBInput
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={togglePasswordVisibility}
                                    className="password-toggle-icon"
                                    style={{ position: "absolute", top: '70%', right: '12px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                />
                            </div>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                            <p className="mt-n3 text-end">
                                <CDBLink className="p-0 forget-password" to="#">
                                    Forgot Password?
                                </CDBLink>
                            </p>
                            <CDBBtn
                                color="dark"
                                onClick={(e) => handleOnSubmit(e)}
                                className="btn-block my-4 mx-auto login-button"
                            >
                                Sign in
                            </CDBBtn>
                            <hr />
                            <p className="text-center">
                                <CDBLink className="d-inline p-0 signup-button text-primary" to="/forget-password">
                                    Forget Password?
                                </CDBLink>
                            </p>
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </div>
        </CommonLayout>
    );
};

export default LoginPage;
