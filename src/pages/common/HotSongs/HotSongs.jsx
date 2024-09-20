import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../../layouts/CommonLayout';

const HotAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getHotAlbums = async () => {
        setLoading(true);
        try {
            const response = await allAPiServicesCall.getHotSongCard({}, getAuthConfig(), navigate);
            setAlbums(response.data);
            setError(null); // Reset error state on successful fetch
        } catch (error) {
            console.log("error:", error);
            setError("Failed to load hot albums.");
        } finally {
            setLoading(false);
        }
    };

    const handleOnDelete = async (albumId) => {
        setLoading(true);
        // Optimistically remove the album from the UI
        const previousAlbums = [...albums];
        setAlbums(prevAlbums => prevAlbums.filter(album => album.albumId !== albumId));

        try {
            await allAPiServicesCall.deleteActualHotAlbum({ hotSongId: albumId }, getAuthConfig(), navigate);

        } catch (error) {
            console.log(error, ":error");
            // Revert UI changes if the deletion fails
            setAlbums(previousAlbums);
            setError("Failed to delete the album. Please try again.");
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
        <CommonLayout>
            <ButtonGroup className='d-flex text-center w-25 m-auto mt-2'>
                <Button variant='primary' onClick={() => { navigate('/add-hot-album') }}>Add Hot Albums</Button>
            </ButtonGroup>
            <div style={{ textAlign: "center", marginTop: '15px', fontWeight: "900", fontSize: "20px" }}>Hot Albums</div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    {albums.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: '20px', fontSize: "16px", color: "gray" }}>No Hot Albums Found</div>
                    ) : (
                        <Row className='justify-content-center mb-5' style={{ marginTop: "20px" }}>
                            {albums.map((album, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "30px" }}>
                                    <Card style={{ width: '90%', margin: 'auto' }}>
                                        <Card.Img variant="top" src={album.image} />
                                        <Card.Body>
                                            <Card.Title className='text-center'>Album Title : {album.title}</Card.Title>
                                            <Card.Text className='text-center py-2'>Artists :
                                                {album.artists}
                                                <br />
                                                Release Date: {new Date(album.releaseDate).toLocaleDateString()}
                                                <br />
                                                Total Tracks: {album.totalTracks}
                                            </Card.Text>
                                            <div className="d-flex justify-content-center">
                                                <Button variant="danger" className="mx-2" onClick={() => handleOnDelete(album.albumId)}>Delete Album</Button>
                                                <Button variant="info" className="mx-2" onClick={() => navigateToAlbum(album.albumId)}>Get Album</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </CommonLayout>
    );
}

export default HotAlbums;
