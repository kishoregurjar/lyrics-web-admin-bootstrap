import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../../layouts/CommonLayout';
import './Feedback.css';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getFeedbacks = async () => {
        try {
            const response = await allAPiServicesCall.getFeedback({}, getAuthConfig(), navigate);
            setFeedbacks(response.data);
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <CommonLayout>
            <div className="text-center my-4">
                <h3>User Feedbacks</h3>
            </div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                feedbacks.length === 0 ? (
                    <div className="text-center my-5 text-muted">
                        No Feedbacks Found
                    </div>
                ) : (
                    <div className="feedback-list-container">
                        <Row className="justify-content-center">
                            {feedbacks.map((feedback, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                                    <Card className="feedback-card">
                                        <Card.Body className="d-flex flex-column align-items-center feedback-card-body">
                                            <div className="feedback-avatar mb-3">{feedback.name.charAt(0)}</div>
                                            <Card.Title className="text-center">{feedback.subject}</Card.Title>
                                            <Card.Text className="text-center">
                                                <hr />
                                                {feedback.message}
                                                <br />
                                                <hr />
                                                <strong>Name:</strong> {feedback.name}
                                                <br />
                                                <hr />
                                                <strong>Email:</strong> {feedback.email}
                                                <br />
                                                <hr />
                                                <strong>Date:</strong> {new Date(feedback.createdAt).toLocaleDateString()}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )
            )}
        </CommonLayout>
    );
};

export default Feedback;
