import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { allAPiServicesCall } from '../../services/apiServices';
import { getAuthConfig } from '../../services/apiUtils';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANT } from '../../routes/constant';

const HotAlbumCard = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getHotAlbums = async () => {
        try {
            const response = await allAPiServicesCall.getHotSongCard({}, getAuthConfig(), navigate);
            setAlbums(response.data.slice(0, 4)); // Limit to 4 albums
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHotAlbums();
    }, []);

    const navigateToAlbum = (albumId) => {
        navigate(`/album/songs/${albumId}`);
    };

    return (
        <div>
            <div style={{ textAlign: "center", marginTop: '15px', fontWeight: "900", fontSize: "20px" }}>Hot Albums</div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                albums.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: '20px', fontSize: "16px", color: "gray" }}>No Hot Albums Found</div>
                ) : (
                    <Row className='justify-content-center mb-1' style={{ marginTop: "10px" }}>
                        {albums.map((album, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "10px" }}>
                                <Card style={{ width: '90%', margin: 'auto' }}>
                                    <Card.Img variant="top" src={album.image} />
                                    <Card.Body>
                                        <Card.Title className='text-center'>Album Title : {album.title}</Card.Title>
                                        <Card.Text className='text-center py-2'>
                                            Artists: {album.artists}
                                            <br />
                                            Release Date: {new Date(album.releaseDate).toLocaleDateString()}
                                            <br />
                                            Total Tracks: {album.totalTracks}
                                        </Card.Text>
                                        <hr />
                                        <div className="d-flex justify-content-center">
                                            <Button variant="success" className="mx-2" onClick={() => navigate(ROUTE_CONSTANT.COMMON.HOT_SONGS)}>Hot Albums</Button>
                                            <Button variant="info" className="mx-2" onClick={() => navigateToAlbum(album.albumId)}>Get Album</Button>
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
};

export default HotAlbumCard;
