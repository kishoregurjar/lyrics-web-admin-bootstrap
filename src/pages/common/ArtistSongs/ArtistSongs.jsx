import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getConfig } from '../../../services/apiUtils';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import CommonLayout from '../../../layouts/CommonLayout';

const ArtistAlbums = () => {
    const { artistId } = useParams();
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchAlbums = async (pageNumber) => {
        try {
            setLoading(true);
            const response = await allAPiServicesCall.artistSongs({ artistId: artistId, page: pageNumber }, getConfig());
            if (response && response.success) {
                setAlbums(response.data);
                setPage(response.page);
                setTotalPages(response.totalPages);
            } else {
                setAlbums([]);
            }
        } catch (error) {
            console.log(error, "Error API in fetching");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums(page);
    }, [artistId, page]);

    const handleCardClick = (albumId) => {
        navigate(`/album/songs/${albumId}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPagination = () => {
        return (
            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Pagination.Prev>
                <Pagination.Item disabled>
                    Page {page} of {totalPages}
                </Pagination.Item>
                <Pagination.Next
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </Pagination.Next>
            </Pagination>
        );
    };

    return (
        <CommonLayout>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <Container className='mb-5'>
                    <Row>
                        {albums.length > 0 ? (
                            albums.map((album) => (
                                <Col key={album.id} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src={album.coverImageUrl} />
                                        <Card.Body>
                                            <img src={album?.images[0]?.url} alt="" height="200px" width="390px" />
                                            <Card.Title className='my-2'>{album.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Release Date: {album.release_date}</Card.Subtitle>
                                            <p>Total tracks: {album.total_tracks}</p>
                                            <Button variant="primary" onClick={() => handleCardClick(album.id)}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p>No albums found.</p>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            {renderPagination()}
                        </Col>
                    </Row>
                </Container>
            )}
        </CommonLayout>
    );
};

export default ArtistAlbums;
