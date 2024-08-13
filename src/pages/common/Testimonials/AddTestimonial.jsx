// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col, Alert, ButtonGroup } from 'react-bootstrap';
// import CommonLayout from '../../../layouts/CommonLayout';
// import { allAPiServicesCall } from '../../../services/apiServices';
// import { getAuthConfig, getFormDataConfig } from '../../../services/apiUtils';
// import { useNavigate } from 'react-router-dom';

// const AddTestimonial = () => {
//     const [avatar, setAvatar] = useState(null);
//     const [testimonialData, setTestimonialData] = useState({
//         description: '',
//         fullName: '',
//         rating: '',
//         avatar: ''
//     });
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setTestimonialData({
//             ...testimonialData,
//             [name]: value,
//         });
//     };

//     const handleImageChange = async (e) => {
//         let imageFile = e.target.files[0];
//         const formData = new FormData();
//         formData.append('image', imageFile);
//         try {
//             const response = await allAPiServicesCall.addTestimonialProfilePic(formData, getFormDataConfig(), navigate);
//             setAvatar(response.data.path);
//             setTestimonialData({
//                 ...testimonialData,
//                 avatar: response.data.path,
//             });
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Failed to upload image.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await allAPiServicesCall.addTestimonial(testimonialData, getAuthConfig(), navigate);
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Failed to submit testimonial.');
//         }
//     };

//     return (
//         <>
//             <CommonLayout>
//                 <Container className="mt-5">
//                     <Row className="justify-content-md-center">
//                         <Col md={6}>
//                             <h2>Add Testimonial</h2>
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group controlId="fullName" className="mb-3">
//                                     <Form.Label>Full Name</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="fullName"
//                                         value={testimonialData.fullName}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="description" className="mb-3">
//                                     <Form.Label>Testimonial</Form.Label>
//                                     <Form.Control
//                                         as="textarea"
//                                         rows={3}
//                                         name="description"
//                                         value={testimonialData.description}
//                                         onChange={handleInputChange}
//                                         maxlength="220"
//                                         minLength="150"
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="rating" className="mb-3">
//                                     <Form.Label>Rating</Form.Label>
//                                     <Form.Control
//                                         as="select"
//                                         name="rating"
//                                         value={testimonialData.rating}
//                                         onChange={handleInputChange}
//                                         required
//                                     >
//                                         <option value="" disabled>Select a rating</option>
//                                         <option value="1">1 - Poor</option>
//                                         <option value="2">2 - Fair</option>
//                                         <option value="3">3 - Good</option>
//                                         <option value="4">4 - Very Good</option>
//                                         <option value="5">5 - Excellent</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                                 <Form.Group controlId="profileImage" className="mb-3">
//                                     <Form.Label>Profile Image</Form.Label>
//                                     <Form.Control
//                                         type="file"
//                                         name="profileImage"
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                     />
//                                 </Form.Group>
//                                 <ButtonGroup className='d-flex justify-content-center w-50 m-auto h-25'>
//                                     <Button type="submit" variant="primary">Submit Testimonial</Button>
//                                 </ButtonGroup>
//                             </Form>
//                         </Col>
//                     </Row>
//                 </Container>
//             </CommonLayout>
//         </>
//     );
// };

// export default AddTestimonial;

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, ButtonGroup } from 'react-bootstrap';
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
        const imageFile = e.target.files[0];

        // Check if file size is larger than 3 MB
        if (imageFile.size > 3 * 1024 * 1024) {
            setError('File size should not exceed 3 MB.');
            return;
        }

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(imageFile, options);

            // Check compressed file size
            if (compressedFile.size > 3 * 1024 * 1024) {
                setError('Compressed file size should not exceed 3 MB.');
                return;
            }

            const formData = new FormData();
            formData.append('image', compressedFile);

            const response = await allAPiServicesCall.addTestimonialProfilePic(formData, getFormDataConfig(), navigate);
            setAvatar(response.data.path);
            setTestimonialData({
                ...testimonialData,
                avatar: response.data.path,
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await allAPiServicesCall.addTestimonial(testimonialData, getAuthConfig(), navigate);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit testimonial.');
        }
    };

    return (
        <CommonLayout>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h2>Add Testimonial</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
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
                                    maxlength="220"
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
                            <ButtonGroup className='d-flex justify-content-center w-50 m-auto h-25'>
                                <Button type="submit" variant="primary">Submit Testimonial</Button>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </CommonLayout>
    );
};

export default AddTestimonial;

