import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getConfig } from '@testing-library/react';

function ResetPassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { resetToken } = useParams();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setError("New Password and Confirm Password do not match");
            return;
        }

        if (!validatePassword(newPassword)) {
            setError("Password must be at least 8 characters long, with at least one special character, one capital letter, one small letter, and one digit.");
            return;
        }

        try {
            const payload = {
                resetToken: resetToken,
                newPassword: newPassword
            }
            await allAPiServicesCall.resetPassword(payload, getConfig(), navigate)
        } catch (error) {
            setError('Failed to change password. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div style={{ border: "none", width: "90%", maxWidth: "500px", margin: "auto", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", backgroundColor: "#eeeeee", padding: '20px', marginTop: "50px" }}>
            <h1 className='text-center'>Reset Password</h1>
            <MDBContainer className="my-3 d-flex flex-column justify-content-center">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className="position-relative">
                    <MDBInput
                        wrapperClass='mt-2'
                        label='New Password'
                        id='form2'
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{ position: 'absolute', right: '10px', top: '33%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="position-relative">
                    <MDBInput
                        wrapperClass='mt-2'
                        label='Confirm Password'
                        id='form3'
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ position: 'absolute', right: '10px', top: '33%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <Button className="my-4" onClick={handleSubmit}>Submit</Button>
            </MDBContainer>
        </div>
    );
}

export default ResetPassword;
