import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CommonLayout from '../../../layouts/CommonLayout';
import './NewsDetails.css'; // You can omit this if not needed
import { useParams } from 'react-router-dom';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import sanitizeHtml from 'sanitize-html';

function NewsDetails() {
    const [newsDetails, setNewsDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const { newsId } = useParams();

    const getNews = async () => {
        try {
            const response = await allAPiServicesCall.getNewsDetails({ newsId: newsId }, getAuthConfig());
            setNewsDetails(response?.data);
        } catch (error) {
            console.log(error, "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNews();
    }, [newsId]);

    return (
        <CommonLayout>
            <div className="d-flex justify-content-center align-items-center mt-1 mb-5 news-details-container">
                <Card style={{ width: '50rem' }} className="shadow news-car-container">
                    {loading ? (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            <Card.Img variant="top" src={newsDetails.coverImg ? newsDetails.coverImg : '/assets/musical-stave-with-hearts-plain-background.jpg'} style={{ height: "300px" }} />
                            <Card.Body className='card-body'>
                                <Card.Title>{newsDetails.title}</Card.Title>
                                <Card.Text className='card-text' dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsDetails.description) }} />
                                <p className="author">Author: {newsDetails.author}</p>
                                <p className="publish-date">Publish Date: {newsDetails.publishDate}</p>
                            </Card.Body>
                        </>
                    )}
                </Card>
            </div>
        </CommonLayout>
    );
}

export default NewsDetails;
