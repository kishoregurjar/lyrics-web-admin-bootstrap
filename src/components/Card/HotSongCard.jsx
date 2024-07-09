import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { allAPiServicesCall } from '../../services/apiServices';
import { getAuthConfig } from '../../services/apiUtils'
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANT } from '../../routes/constant';

const HotSongCard = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getHotSongs = async () => {
        try {
            const response = await allAPiServicesCall.getHotSongCard({}, getAuthConfig(), navigate);
            setSongs(response.data.slice(0, 4));
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getHotSongs();
    }, []);

    const navigateToLyrics = (isrc) => {
        navigate(`/lyrics/${isrc}`);
    };

    return (
        <div>
            <div style={{ textAlign: "center", marginTop: '15px', fontWeight: "900", fontSize: "20px" }}>Hot Songs</div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                songs.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: '20px', fontSize: "16px", color: "gray" }}>No Hot Albums Found</div>
                ) : (
                    <Row className='justify-content-center mb-1' style={{ marginTop: "10px" }}>
                        {songs.map((song, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "10px" }}>
                                <Card style={{ width: '90%', margin: 'auto' }}>
                                    <Card.Img variant="top" src="assets/music.png" />
                                    <Card.Body>
                                        <Card.Title className='text-center'>Song Title : {song.title}</Card.Title>
                                        <Card.Text className='text-center py-2'>Artists :
                                            {song.artists.join(', ')}
                                            <br />
                                            Duration: {song.duration}
                                        </Card.Text>
                                        <hr />
                                        <div className="d-flex justify-content-center">
                                            <Button variant="success" className="mx-2" onClick={() => navigate(ROUTE_CONSTANT.COMMON.HOT_SONGS)}>Hot Albums</Button>
                                            <Button variant="warning" className="mx-2" onClick={() => navigateToLyrics(song.isrcs)
                                            }>Get Lyrics</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )
            )}
        </div>
    );
}

export default HotSongCard;
