import React, { useState, useEffect } from 'react';
import CommonLayout from '../../../layouts/CommonLayout';
import { useNavigate } from 'react-router-dom';
import './AddHotAlbum.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import { Form, Button, Card, Row, Col, Image, Spinner, Container } from 'react-bootstrap';

const AddHotAlbum = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        // Since only "Hot Album" checkbox is needed, we no longer need status handling
    };

    const handleSubmit = async (result) => {
        if (!result.id) {
            toast.error('Invalid album selection');
            return;
        }

        const payload = {
            albumId: result.id,
            status: 'hotAlbum'
        };

        try {
            setLoading(true);
            await allAPiServicesCall.addHotAlbums(payload, getAuthConfig(), navigate);
        } catch (error) {
            toast.error(`Error adding album: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            const fetchSearchResults = async () => {
                try {
                    setLoading(true);
                    const response = await axios.post('http://lyricsweb.com/api/v1/user/search', {
                        type: 'album',  // Change to search for albums instead of tracks
                        query: searchQuery,
                        page: currentPage,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const { albums } = response.data.data;
                    if (albums && albums.items) {
                        setSearchResults(albums.items);  // Handle album results
                        setTotalPages(Math.ceil(albums.total / 10));  // Assuming each page has 10 items
                    } else {
                        setSearchResults([]);
                        setTotalPages(1);
                    }

                } catch (error) {
                    console.error('Error fetching search results:', error);
                    setSearchResults([]);
                    setTotalPages(1);
                } finally {
                    setLoading(false);
                }
            };

            fetchSearchResults();
        } else {
            setSearchResults([]);
            setTotalPages(1);
        }
    }, [searchQuery, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <CommonLayout>
            <Container className="add-hot-album-container">
                <Form.Group controlId="searchAlbum">
                    <Form.Control
                        type="text"
                        placeholder="Search for albums..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='search-album-input'
                    />
                </Form.Group>

                <div className="search-results-container">
                    {loading ? (
                        <div className="spinner-container">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : searchQuery !== '' ? (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {searchResults.length > 0 ? searchResults.map(result => (
                                <Col key={result.id}>
                                    <Card className='card-content'>
                                        <Card.Img variant="top" src={result?.images?.length > 0 ? result?.images[0]?.url : '/assets/logo.png'} alt={result?.name || 'Album Image'} />
                                        <Card.Body>
                                            <Card.Title>{result?.name}</Card.Title>
                                            <Card.Text>Artist: {result?.artists.map(a => a.name).join(', ')}</Card.Text>
                                            <Form.Check
                                                type="checkbox"
                                                label="Hot Album"
                                                onChange={handleCheckboxChange}  // Fixed "Hot Album" selection
                                            />
                                            <Button variant="primary" onClick={() => handleSubmit(result)}>Submit</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : (
                                <div className="empty-message">No results found</div>
                            )}
                        </Row>
                    ) : (
                        <div className="empty-message">Please search for an album to add</div>
                    )}
                </div>
                {searchResults.length > 0 && (
                    <div className="pagination-container">
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                        <span>{currentPage} / {totalPages}</span>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                    </div>
                )}
            </Container>
        </CommonLayout>
    );
};

export default AddHotAlbum;
