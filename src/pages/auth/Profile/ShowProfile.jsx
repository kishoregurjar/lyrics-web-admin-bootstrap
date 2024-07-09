import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import CommonLayout from '../../../layouts/CommonLayout';
import { Button } from 'react-bootstrap';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANT } from '../../../routes/constant';

function ShowProfile() {
    const [profileData, setProfileData] = useState(null);
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
                                        <p className="mt-1 mb-1">Role : {profileData.role}</p>
                                        <p className="text-muted mt-3 mb-4"><a href="https://lyricsweb.com" style={{ textDecoration: "none" }}>Owner Lricsweb.com</a></p>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{profileData.fullName}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Mobile</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{profileData.mobile}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Address</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                                <div className="d-flex justify-content-center mb-5 width-100">
                                    <Button style={{ width: "100%" }} onClick={() => navigate(ROUTE_CONSTANT.AUTH.CHANGE_PASSWORD)}>Change Password</Button>
                                    <Button style={{ width: "100%" }} className="ms-1" onClick={() => navigate(ROUTE_CONSTANT.AUTH.EDIT_PROFILE)}>Edit Profile</Button>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            )
            }
        </CommonLayout >
    );
}

export default ShowProfile;
