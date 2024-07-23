// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, Col, Row } from 'react-bootstrap';
// import CommonLayout from '../../../layouts/CommonLayout';
// import { allAPiServicesCall } from '../../../services/apiServices';
// import { getConfig } from '../../../services/apiUtils';

// const AlbumsSongs = () => {
//     const { albumId } = useParams();
//     const [songs, setSongs] = useState([]);
//     const navigate = useNavigate();

//     const fetchSongs = async () => {

//         try {
//             const response = await allAPiServicesCall.albumSongs({ albumId: albumId }, getConfig(), navigate)
//             if (response) {
//                 setSongs(response)
//             } else {
//                 setSongs([])
//             }
//         } catch (error) {
//             console.error("Error fetching songs:", error);
//         }
//     };

//     useEffect(() => {
//         fetchSongs();
//     }, [albumId]);

//     const handleCardClick = (songId) => {
//         navigate(`/lyrics/${songId}`);
//     };

//     return (
//         <CommonLayout>
//             <div className="container mt-4 mb-5">
//                 <Row>
//                     {songs.length > 0 ? (
//                         songs.map((song) => (
//                             <Col md={4} lg={3} key={song.id} className="mb-5">
//                                 <Card onClick={() => handleCardClick(song.id)} style={{ cursor: 'pointer' }}>
//                                     <Card.Img variant="top" src={song?.album?.images[0]?.url || '/assets/sheet-line-pop-clef-white.jpg'} />
//                                     <Card.Body>
//                                         <Card.Title>{song.name}</Card.Title>
//                                         <Card.Subtitle className="mb-2 text-muted">
//                                             {song.artists.map((artist, index) => (
//                                                 <span key={index}>
//                                                     {artist.name}
//                                                     {index < song.artists.length - 1 && ', '}
//                                                 </span>
//                                             ))}
//                                         </Card.Subtitle>
//                                         <Card.Text>
//                                             <strong>Duration:</strong> {Math.floor(song.duration_ms / 60000)}:{Math.floor((song.duration_ms % 60000) / 1000).toString().padStart(2, '0')} minutes
//                                         </Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         ))
//                     ) : (
//                         <p>No songs found.</p>
//                     )}
//                 </Row>
//             </div>
//         </CommonLayout>
//     );
// };

// export default AlbumsSongs;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getConfig } from '../../../services/apiUtils';
import { ListGroup } from 'react-bootstrap';

const AlbumsSongs = () => {
    const { albumId } = useParams();
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();

    const fetchSongs = async () => {
        try {
            const response = await allAPiServicesCall.albumSongs({ albumId: albumId }, getConfig(), navigate);
            if (response) {
                setSongs(response);
            } else {
                setSongs([]);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [albumId]);

    const handleListItemClick = (songId) => {
        navigate(`/lyrics/${songId}`);
    };

    return (
        <CommonLayout>
            <div className="container mt-4" style={{ marginBottom: "100px" }}>
                <ListGroup variant="flush">
                    {songs.length > 0 ? (
                        songs.map((song) => (
                            <ListGroup.Item
                                key={song.id}
                                action
                                onClick={() => handleListItemClick(song.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1" style={{ color: "#5072A7" }}>{song.name}</h5>
                                    <small>{Math.floor(song.duration_ms / 60000)}:{Math.floor((song.duration_ms % 60000) / 1000).toString().padStart(2, '0')} minutes</small>
                                </div>
                                <p className="mb-1">
                                    {song.artists.map((artist, index) => (
                                        <span key={index}>
                                            {artist.name}
                                            {index < song.artists.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <p>No songs found.</p>
                    )}
                </ListGroup>
            </div>
        </CommonLayout>
    );
};

export default AlbumsSongs;

