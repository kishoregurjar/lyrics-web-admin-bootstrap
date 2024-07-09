import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBInput,
    MDBBtn,
    MDBCardImage
} from 'mdb-react-ui-kit';
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANT } from '../../../routes/constant';
import { Button } from 'react-bootstrap';

function EditProfile() {
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        mobile: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await allAPiServicesCall.getProfileDetails({}, getAuthConfig(), navigate);
            if (response.success) {
                setProfileData(response.data);
            }
        } catch (error) {
            console.log(error, ":error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await allAPiServicesCall.editProfile(profileData, getAuthConfig(), navigate);
            if (response.success) {
                navigate(ROUTE_CONSTANT.AUTH.SHOW_PROFILE);
            }
        } catch (error) {
            console.log(error, ":error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonLayout>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <section style={{ backgroundColor: '#eee', marginTop: "30px" }}>
                    <MDBContainer className="py-5">
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px' }}
                                            fluid />
                                        <p className="mt-1 mb-1">Role : Admin</p>
                                        <p className="text-muted mt-3 mb-4"><a href="https://lyricsweb.com" style={{ textDecoration: "none" }}>Owner Lricsweb.com</a></p>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <form>
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Full Name</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBInput
                                                        name="fullName"
                                                        value={profileData.fullName}
                                                        onChange={handleChange}
                                                        className="text-muted"
                                                        required
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Email</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBInput
                                                        type="email"
                                                        name="email"
                                                        readOnly
                                                        value={profileData.email}
                                                        onChange={handleChange}
                                                        className="text-muted"
                                                        required
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Mobile</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBInput
                                                        name="mobile"
                                                        value={profileData.mobile}
                                                        onChange={handleChange}
                                                        className="text-muted"
                                                        required
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <div className="d-flex justify-content-center">
                                                <Button onClick={(e) => handleOnSubmit(e)}>Save Changes</Button>
                                            </div>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            )
            }
        </CommonLayout >
    );
}

export default EditProfile;
