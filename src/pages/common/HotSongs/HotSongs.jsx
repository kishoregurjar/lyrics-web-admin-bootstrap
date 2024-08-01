import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils'
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../../layouts/CommonLayout';

const HotSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getHotSongs = async () => {
        try {
            const response = await allAPiServicesCall.getHotSongCard({}, getAuthConfig(), navigate);
            setSongs(response.data);
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleOnDelete = async (hotSongId) => {
        setLoading(true);
        try {
            await allAPiServicesCall.deleteHotAlbum({ hotSongId: hotSongId }, getAuthConfig(), navigate);
            getHotSongs();
        } catch (error) {
            console.log(error, ":error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getHotSongs();
    }, []);

    const navigateToLyrics = (isrc) => {
        navigate(`/lyrics/${isrc}`);
    };

    return (
        <CommonLayout>
            <ButtonGroup className='d-flex text-center w-25 m-auto mt-2'>
                <Button variant='primary' onClick={() => { navigate('/add-songs') }}>Add Hot Songs</Button>
            </ButtonGroup>
            <div style={{ textAlign: "center", marginTop: '15px', fontWeight: "900", fontSize: "20px" }}>Hot Songs</div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                songs.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: '20px', fontSize: "16px", color: "gray" }}>No Hot Albums Found</div>
                ) : (
                    <Row className='justify-content-center mb-5' style={{ marginTop: "20px" }}>
                        {songs.map((song, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "30px" }}>
                                <Card style={{ width: '90%', margin: 'auto' }}>
                                    <Card.Img variant="top" src={song.image} />
                                    <Card.Body>
                                        <Card.Title className='text-center'>Song Title : {song.title}</Card.Title>
                                        <Card.Text className='text-center py-2'>Artists :
                                            {song.artists.join(', ')}
                                            <br />
                                            Duration: {song.duration}
                                        </Card.Text>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="danger" className="mx-2" onClick={() => handleOnDelete(song._id)}>Delete Album</Button>
                                            <Button variant="info" className="mx-2" onClick={() => navigateToLyrics(song.isrc)}>Get Lyrics</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )
            )}
        </CommonLayout>
    );
}

export default HotSongs;
