import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import './SongLyrics.css'; // Import CSS file for any additional custom styling
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';

const DisplayLyrics = () => {
    const [songInfo, setSongInfo] = useState({
        title: '',
        lyrics: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isrcKey } = useParams();
    const navigate = useNavigate();

    const fetchLyrics = async () => {
        const payload = {
            isrcKey: isrcKey
        }
        try {
            const response = await allAPiServicesCall.displayLyrics(payload, getAuthConfig(), navigate)
            if (!response) {
                setSongInfo([])
            } else {
                setSongInfo(response?.data)
            }
        } catch (error) {
            console.log(error, ":error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLyrics()
    }, [isrcKey])

    return (
        <CommonLayout>
            <Container className="d-flex justify-content-center align-items-center my-4" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : songInfo.length === 0 ? (
                    <Alert variant="danger" className="text-center">
                        Lyrics Not Found
                    </Alert>
                ) : (
                    <Card className="w-100" style={{ maxWidth: '900px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}>
                        <Card.Body>
                            <Card.Title className="text-center gradient-text font-weight-bold">{songInfo?.title}</Card.Title>
                            <Card.Text className="lyrics gradient-text text-center">
                                <pre>{songInfo?.lyrics}</pre>
                            </Card.Text>
                        </Card.Body>
                        <div className="text-center mb-1">Copyright : {songInfo?.copyright}</div>
                        <div className="text-center mb-1">Writer : {songInfo?.writer}</div>
                        <div className="text-center mb-1">Lyrics Licensed & Provided by <a style={{ textDecoration: "none" }} href="https://www.lyricfind.com/">LyricFind</a></div>
                    </Card>
                )}
            </Container>
        </CommonLayout>
    );
}

export default DisplayLyrics;
