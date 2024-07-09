import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ButtonGroup } from 'react-bootstrap';
import CommonLayout from '../../../layouts/CommonLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANT } from '../../../routes/constant';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';

function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [showFullText, setShowFullText] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const response = await allAPiServicesCall.getNews({}, getAuthConfig(), navigate);
            setNewsList(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToNewsDetails = (id) => {
        navigate(`/news-details/${id}`);
    }

    const handleOnDelete = async (id) => {
        setIsLoading(true);
        try {
            await allAPiServicesCall.deleteNews({ newsId: id }, getAuthConfig(), navigate)
            fetchNews();
        } catch (error) {
            console.log(error, ":error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <CommonLayout>
            <div class="d-flex justify-content-center mt-3">
                <Button class="btn btn-default" variant='success' onClick={() => navigate(ROUTE_CONSTANT.COMMON.ADD_NEWS)}>Add News</Button>
            </div>
            <Container className="mt-4" style={{ marginBottom: "5rem" }}>
                {isLoading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    newsList.length === 0 ? (
                        <div className="text-center">
                            <h4>News Not Found</h4>
                        </div>
                    ) : (
                        <Row className="g-4 mb-5 justify-content-center">
                            {newsList.map((news) => {
                                const { _id, title, description, coverImg } = news;
                                const truncatedText = description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + '...';
                                const fullText = description.replace(/<\/?[^>]+(>|$)/g, "");
                                return (
                                    <Col key={_id} xs={12} sm={6} md={4} lg={3}>
                                        <Card style={{ width: '100%', maxWidth: '350px', height: '100%', overflow: "hidden", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Card.Img variant="top" src={coverImg} style={{ height: "200px", objectFit: "cover" }} />
                                            <Card.Body style={{ flex: '1 0 auto' }}>
                                                <Card.Title className='text-center'>{title}</Card.Title>
                                                <Card.Text>
                                                    {showFullText[_id] ? fullText : truncatedText}
                                                </Card.Text>
                                            </Card.Body>
                                            <div className='text-center mb-3'>
                                                <Button className='mx-2' variant="primary" onClick={() => navigateToNewsDetails(_id)}>
                                                    {showFullText[_id] ? "Show Less" : "Show Details"}
                                                </Button>
                                                <Button variant='danger' className='mx-2' onClick={() => handleOnDelete(_id)}>Delete News</Button>
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    )
                )}
            </Container>
        </CommonLayout>
    );
}

export default NewsPage;
