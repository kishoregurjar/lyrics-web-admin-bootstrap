import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, ButtonGroup, Spinner } from 'react-bootstrap';
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig, getFormDataConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const AddTestimonial = () => {
    const [avatar, setAvatar] = useState(null);
    const [testimonialData, setTestimonialData] = useState({
        description: '',
        fullName: '',
        rating: '',
        avatar: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonialData({
            ...testimonialData,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        let imageFile = e.target.files[0];
        console.log(imageFile, "imageFile")
        if (imageFile?.size > 3 * 1024 * 1024) { // Check if file is larger than 3MB
            setError('Image size should not exceed 3 MB.');
            return;
        }

        const options = {
            maxSizeMB: 1, // More aggressive compression
            maxWidthOrHeight: 1024, // Reduce dimensions further
            useWebWorker: true, // Enable web worker for faster processing
            fileType: imageFile?.type, // Retain original file type
            maxIteration: 10, // Maximum number of compression iterations
            initialQuality: 0.6, // Start with lower quality to speed up
        };

        try {
            setLoading(true);
            const compressedFile = await imageCompression(imageFile, options);
            console.log(compressedFile, "1111111111")

            const formData = new FormData();
            formData.append('image', compressedFile);

            const response = await allAPiServicesCall.addTestimonialProfilePic(formData, getFormDataConfig(), navigate);
            setAvatar(response.data.path);
            setTestimonialData({
                ...testimonialData,
                avatar: response.data.path,
            });
            setError(null)
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to upload image.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await allAPiServicesCall.addTestimonial(testimonialData, getAuthConfig(), navigate);
            setError(null)
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit testimonial.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CommonLayout>
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <h2>Add Testimonial</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="fullName" className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={testimonialData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="description" className="mb-3">
                                    <Form.Label>Testimonial</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={testimonialData.description}
                                        onChange={handleInputChange}
                                        maxLength="220"
                                        minLength="150"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="rating" className="mb-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="rating"
                                        value={testimonialData.rating}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Select a rating</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="profileImage" className="mb-3">
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="profileImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Form.Group>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                                <ButtonGroup className="d-flex justify-content-center w-50 m-auto h-25">
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Loading...</span>
                                            </>
                                        ) : (
                                            'Submit Testimonial'
                                        )}
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </CommonLayout>
        </>
    );
};

export default AddTestimonial;
