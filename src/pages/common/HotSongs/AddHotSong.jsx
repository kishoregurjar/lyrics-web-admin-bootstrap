// import React, { useState, useEffect } from 'react';
// import CommonLayout from '../../../layouts/CommonLayout';
// import { useNavigate } from 'react-router-dom';
// import './AddHotAlbum.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { allAPiServicesCall } from '../../../services/apiServices';
// import { getAuthConfig } from '../../../services/apiUtils';
// import { Form, Button, Card, Row, Col, Image, Spinner, Container } from 'react-bootstrap';

// const AddHotSong = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [selectedStatuses, setSelectedStatuses] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const navigate = useNavigate();

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const handleCheckboxChange = (event, status) => {
//         const isChecked = event.target.checked;
//         setSelectedStatuses(prevStatuses =>
//             isChecked ? [...prevStatuses, status] : prevStatuses.filter(s => s !== status)
//         );
//     };

//     const handleSubmit = async (result) => {
//         if (selectedStatuses.length === 0) {
//             toast.error('Please select at least one status');
//             return;
//         }

//         let isrc = '';
//         if (result.isrcs) {
//             isrc = Array.isArray(result.isrcs.isrc) ? result.isrcs.isrc[0] : result.isrcs.isrc;
//         } else {
//             toast.error("ISRC not available for the selected result");
//             return;
//         }

//         const payload = {
//             isrcKey: isrc,
//             status: selectedStatuses
//         };

//         try {
//             setLoading(true);
//             const response = await allAPiServicesCall.addHotSongs(payload, getAuthConfig(), navigate);
//         } catch (error) {
//             toast.error(`Error adding song: ${error.message}`);
//         } finally {
//             setLoading(false);
//             setSelectedStatuses([]);
//         }
//     };

//     useEffect(() => {
//         if (searchQuery.length > 0) {
//             const fetchSearchResults = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await axios.post('http://localhost:3007/api/v1/user/search', {
//                         type: 'track',
//                         query: searchQuery,
//                         page: currentPage,
//                     }, {
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     });
//                     console.log(response.data.data, "response")
//                     const { tracks } = response.data.data;
//                     if (tracks && tracks.items) {
//                         setSearchResults(tracks.items);
//                         setTotalPages(tracks.total);
//                     } else {
//                         setSearchResults([]);
//                         setTotalPages(1);
//                     }

//                 } catch (error) {
//                     console.error('Error fetching search results:', error);
//                     setSearchResults([]);
//                     setTotalPages(1);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchSearchResults();
//         } else {
//             setSearchResults([]);
//             setTotalPages(1);
//         }
//     }, [searchQuery, currentPage]);

//     const handleNextPage = () => {
//         setCurrentPage(prevPage => prevPage + 1);
//     };

//     const handlePreviousPage = () => {
//         setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
//     };

//     return (
//         <CommonLayout>
//             <Container className="add-hot-song-container">
//                 <Form.Group controlId="searchSong">
//                     <Form.Control
//                         type="text"
//                         placeholder="Search for songs..."
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         className='search-song-input'
//                     />
//                 </Form.Group>

//                 <div className="search-results-container">
//                     {loading ? (
//                         <div className="spinner-container">
//                             <Spinner animation="border" role="status">
//                                 <span className="sr-only">Loading...</span>
//                             </Spinner>
//                         </div>
//                     ) : searchQuery !== '' ? (
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             {searchResults.length > 0 ? searchResults.map(result => (
//                                 <Col key={result.id}>
//                                     <Card className='card-content'>
//                                         <Card.Img variant="top" src={result?.album?.images?.length > 0 ? result?.album?.images[0]?.url : '/assets/logo.png'} alt={result?.title || 'Song Image'} />
//                                         <Card.Body>
//                                             <Card.Title>{result?.title}</Card.Title>
//                                             {/* <Card.Text>Artist: {Array.isArray(result?.artists?.artist) ? result?.artists?.artist.map(a => a._).join(', ') : result?.artists?.artist._}</Card.Text> */}
//                                             <Form.Check
//                                                 type="checkbox"
//                                                 label="Hot Album"
//                                                 onChange={(e) => handleCheckboxChange(e, 'hotAlbum')}
//                                             />
//                                             <Form.Check
//                                                 type="checkbox"
//                                                 label="Top Chart"
//                                                 onChange={(e) => handleCheckboxChange(e, 'topChart')}
//                                             />
//                                             <Button variant="primary" onClick={() => handleSubmit(result)}>Submit</Button>
//                                         </Card.Body>
//                                     </Card>
//                                 </Col>
//                             )) : (
//                                 <div className="empty-message">No results found</div>
//                             )}
//                         </Row>
//                     ) : (
//                         <div className="empty-message">Please search for a song to add</div>
//                     )}
//                 </div>
//                 {searchResults.length > 0 && (
//                     <div className="pagination-container">
//                         <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
//                         <span>{currentPage} / {totalPages}</span>
//                         <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
//                     </div>
//                 )}
//             </Container>
//         </CommonLayout>
//     );
// };

// export default AddHotSong;


import React, { useState, useEffect } from 'react';
import CommonLayout from '../../../layouts/CommonLayout';
import { useNavigate } from 'react-router-dom';
import './AddHotAlbum.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig } from '../../../services/apiUtils';
import { Form, Button, Card, Row, Col, Image, Spinner, Container } from 'react-bootstrap';

const AddHotSong = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCheckboxChange = (event, status) => {
        const isChecked = event.target.checked;
        setSelectedStatuses(prevStatuses =>
            isChecked ? [...prevStatuses, status] : prevStatuses.filter(s => s !== status)
        );
    };

    const handleSubmit = async (result) => {
        if (selectedStatuses.length === 0) {
            toast.error('Please select at least one status');
            return;
        }
        // console.log(result?.id, "result")
        let songId = result?.id
        // let isrc = '';
        // if (result.external_ids && result.external_ids.isrc) {
        //     isrc = result.external_ids.isrc;
        // } else {
        //     toast.error("ISRC not available for the selected result");
        //     return;
        // }

        const payload = {
            isrcKey: songId,
            status: selectedStatuses
        };

        try {
            setLoading(true);
            const response = await allAPiServicesCall.addHotSongs(payload, getAuthConfig(), navigate);
        } catch (error) {
            toast.error(`Error adding song: ${error.message}`);
        } finally {
            setLoading(false);
            setSelectedStatuses([]);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            const fetchSearchResults = async () => {
                try {
                    setLoading(true);
                    const response = await axios.post('https://lyricsweb.com/api/v1/user/search', {
                        type: 'track',
                        query: searchQuery,
                        page: currentPage,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const { tracks } = response.data.data;
                    if (tracks && tracks.items) {
                        setSearchResults(tracks.items);
                        setTotalPages(Math.ceil(tracks.total / 10)); // Assuming each page has 10 items
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
            <Container className="add-hot-song-container">
                <Form.Group controlId="searchSong">
                    <Form.Control
                        type="text"
                        placeholder="Search for songs..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='search-song-input'
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
                                        <Card.Img variant="top" src={result?.album?.images?.length > 0 ? result?.album?.images[0]?.url : '/assets/logo.png'} alt={result?.name || 'Song Image'} />
                                        <Card.Body>
                                            <Card.Title>{result?.name}</Card.Title>
                                            <Card.Text>Artist: {result?.artists.map(a => a.name).join(', ')}</Card.Text>
                                            <Form.Check
                                                type="checkbox"
                                                label="Hot Album"
                                                onChange={(e) => handleCheckboxChange(e, 'hotAlbum')}
                                            />
                                            <Form.Check
                                                type="checkbox"
                                                label="Top Chart"
                                                onChange={(e) => handleCheckboxChange(e, 'topChart')}
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
                        <div className="empty-message">Please search for a song to add</div>
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

export default AddHotSong;
