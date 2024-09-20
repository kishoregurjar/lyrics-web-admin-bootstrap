// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { faComments, faHeadphonesSimple, faHouse, faIdCard, faMessage, faMusic, faNewspaper, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from 'react-router-dom';
// import './MainNavigation.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { ROUTE_CONSTANT } from '../../routes/constant';

// const MainNavigation = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchType, setSearchType] = useState('track');
//     const [searchResults, setSearchResults] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const searchContainerRef = useRef(null);
//     const navigate = useNavigate();

//     const handleSearchQueryChange = (event) => {
//         setSearchQuery(event.target.value);
//         setCurrentPage(1);
//     };

//     const handleSearchTypeChange = (event) => {
//         setSearchType(event.target.value);
//         setSearchQuery('');
//         setSearchResults([]);
//         setCurrentPage(1);
//     };

//     useEffect(() => {
//         if (searchQuery.length > 0) {
//             const fetchSearchResults = async () => {
//                 try {
//                     const API_URL = 'http://localhost:3007/api/v1/user/search';
//                     const response = await axios.post(API_URL, {
//                         type: searchType,
//                         query: searchQuery,
//                         page: currentPage
//                     }, {
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     });
//                     setSearchResults(response.data.data.lyricfind.tracks.track);
//                 } catch (error) {
//                     console.error('Error fetching search results:', error);
//                 }
//             };

//             fetchSearchResults();
//         } else {
//             setSearchResults([]);
//         }
//     }, [searchQuery, searchType, currentPage]);

//     const handleNextPage = () => {
//         setCurrentPage(prevPage => prevPage + 1);
//     };

//     const handlePreviousPage = () => {
//         setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
//     };

//     const handleResultClick = (result) => {
//         let path = '';
//         if (searchType === 'track' || searchType === 'artist' || searchType === 'album') {
//             const isrc = result.isrcs ? (Array.isArray(result.isrcs.isrc) ? result.isrcs.isrc[0] : result.isrcs.isrc) : 'not-available';
//             path = `/lyrics/${isrc}`;
//         }

//         navigate(path);
//         setSearchQuery('');
//         setCurrentPage(1); // Reset to page 1 when a result is clicked
//     };

//     const renderSearchResults = () => {
//         return searchResults.map(result => {
//             const imageUrl = (searchType === "track") ? result?.album?.images && result?.album?.images?.length > 0 ? result?.album?.images[0]?.url : '' : result?.images && result?.images?.length > 0 ? result?.images[0]?.url : "";
//             const name = result?.title;
//             let additionalInfo = '';

//             if (searchType === 'track' || searchType === 'album') {
//                 additionalInfo = Array.isArray(result.artists.artist) ? result.artists.artist.map(artist => artist._).join(', ') : result.artists.artist._;
//             } else if (searchType === 'artist') {
//                 additionalInfo = result.genres ? result.genres.join(', ') : '';
//             }

//             return (
//                 <li key={result.id} onClick={() => handleResultClick(result)} style={{ cursor: 'pointer' }}>
//                     {imageUrl && (
//                         <img src={imageUrl} alt={name} style={{ width: '50px', height: '50px' }} />
//                     )}
//                     <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
//                         <strong>{name}</strong>
//                         {additionalInfo && (
//                             <span style={{ textDecoration: "none", color: 'black', marginLeft: 'auto' }}>{additionalInfo}</span>
//                         )}
//                     </div>
//                 </li>
//             );
//         });
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
//                 setSearchResults([]);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <Navbar expand="lg" className="bg-body-tertiary m-0 p-0 border-bottom">
//             <Container fluid className='navbar-container'>
//                 <Navbar.Brand as={Link} to="/">
//                     <img src="/assets/logo.png" alt="Company Logo" />
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <div className="search-container d-flex" ref={searchContainerRef}>
//                         <Form className="d-flex mx-2 my-2 my-lg-0" style={{ width: "100%" }}>
//                             <Form.Control
//                                 type="search"
//                                 placeholder="Search Songs..."
//                                 className="me-1"
//                                 aria-label="Search"
//                                 value={searchQuery}
//                                 onChange={handleSearchQueryChange}
//                             />
//                             <button className="button-outline-dark" type="button" onClick={() => setCurrentPage(1)}>Search</button>
//                         </Form>
//                         <div className="radio-buttons my-auto">
//                             <label>
//                                 <input
//                                     type='radio'
//                                     value='track'
//                                     checked={searchType === 'track'}
//                                     onChange={handleSearchTypeChange}
//                                 />
//                                 Track
//                             </label>
//                             <label>
//                                 <input
//                                     type='radio'
//                                     value='artist'
//                                     checked={searchType === 'artist'}
//                                     onChange={handleSearchTypeChange}
//                                 />
//                                 Artist
//                             </label>
//                             <label>
//                                 <input
//                                     type='radio'
//                                     value='album'
//                                     checked={searchType === 'album'}
//                                     onChange={handleSearchTypeChange}
//                                 />
//                                 Album
//                             </label>
//                         </div>
//                         {searchResults?.length > 0 && (
//                             <div className='search-results'>
//                                 <ul>
//                                     {renderSearchResults()}
//                                 </ul>
//                                 <div className='pagination'>
//                                     <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
//                                     <button onClick={handleNextPage}>Next</button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <Nav
//                         className="me-auto my-2 my-lg-0 text-uppercase mx-auto"
//                         navbarScroll
//                         style={{
//                             fontWeight: "700"
//                         }}
//                     >
//                         <Nav.Link as={Link} to="/" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faHouse} /> Home
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/testimonials" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faComments} /> Testimonials
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/hot-songs" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faHeadphonesSimple} /> Hot Songs
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/top-charts" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faMusic} /> Top Charts
//                         </Nav.Link>
//                         <NavDropdown title={<FontAwesomeIcon className="navbar-icons" icon={faUser} />} id="navbarScrollingDropdown" align="end">
//                             <NavDropdown.Item as={Link} to="/profile">
//                                 <FontAwesomeIcon icon={faIdCard} className='navbar-icons' /> Profile
//                             </NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item as={Link} to="/news">
//                                 <FontAwesomeIcon icon={faNewspaper} className='navbar-icons' /> News
//                             </NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item as={Link} to="/feedbacks">
//                                 <FontAwesomeIcon icon={faMessage} className='navbar-icons' /> Feedback
//                             </NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item as={Link} to={ROUTE_CONSTANT.AUTH.LOGIN} onClick={() => {
//                                 toast.info('You have been logged out');
//                                 localStorage.clear();
//                             }}>
//                                 <FontAwesomeIcon icon={faRightFromBracket} className='navbar-icons' /> Logout
//                             </NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default MainNavigation;
/*
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faComments, faHeadphonesSimple, faHouse, faIdCard, faMessage, faMusic, faNewspaper, faRightFromBracket, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import './MainNavigation.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ROUTE_CONSTANT } from '../../routes/constant';

const MainNavigation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('track');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSearchQuery('');
        setSearchResults([]);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            const fetchSearchResults = async () => {
                try {
                    const API_URL = 'https://lyricsweb.com/api/v1/user/search';
                    const response = await axios.post(API_URL, {
                        type: searchType,
                        query: searchQuery,
                        page: currentPage
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data.success) {
                        if (searchType === 'track') {
                            setSearchResults(response.data.data.tracks.items);
                        } else if (searchType === 'artist') {
                            setSearchResults(response.data.data.artists.items);
                        } else if (searchType === 'album') {
                            setSearchResults(response.data.data.albums.items);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, searchType, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
    };
    
    const handleResultClick = (result) => {
        let path = '';
        if (searchType === 'track') {
            const isrc = result.external_ids?.isrc || 'not-available';
            path = `/lyrics/${isrc}`;
        } else if (searchType === 'artist') {
            const artistId = result.id;
            path = `/artist/albums/${artistId}`;
        } else if (searchType === 'album') {
            const albumId = result.id;
            path = `/album/songs/${albumId}`;
        }
        
        navigate(path);
        setSearchQuery('');
        setCurrentPage(1); // Reset to page 1 when a result is clicked
    };

    const renderSearchResults = () => {
        return searchResults.map(result => {
            console.log(result)
            const imageUrl = result?.album?.images && result?.album?.images?.length > 0 ? result?.album?.images[0]?.url : result?.images && result?.images?.length > 0 ? result?.images[0]?.url : '';
            const name = result.name;
            let additionalInfo = '';

            if (searchType === 'track' || searchType === 'album') {
                additionalInfo = searchType === 'album' ? `Release Date: ${result.release_date}` : Array.isArray(result.artists) ? result.artists.map(artist => artist.name).join(', ') : result.artists.name;
            } else if (searchType === 'artist') {
                additionalInfo = result.genres ? result.genres.join(', ') : '';
            }

            return (
                <li key={result.id} onClick={() => handleResultClick(result)} style={{ cursor: 'pointer' }}>
                    {imageUrl && (
                        <img src={imageUrl} alt={name} style={{ width: '50px', height: '50px' }} />
                    )}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{name}</strong>
                        {additionalInfo && (
                            <span style={{ textDecoration: "none", color: 'black', marginLeft: 'auto' }}>{additionalInfo}</span>
                        )}
                    </div>
                    </li>
                );
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary m-0 p-0 border-bottom">
            <Container fluid className='navbar-container'>
                <Navbar.Brand as={Link} to="/">
                    <img src="/assets/logo.png" alt="Company Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <div className="search-container d-flex" ref={searchContainerRef}>
                        <Form className="d-flex mx-2 my-2 my-lg-0" style={{ width: "100%" }}>
                            <Form.Control
                                type="search"
                                placeholder="Search Songs..."
                                className="me-1"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                                />
                                <button className="button-outline-dark" type="button" onClick={() => setCurrentPage(1)}>Search</button>
                        </Form>
                        <div className="radio-buttons my-auto">
                            <label>
                                <input
                                    type='radio'
                                    value='track'
                                    checked={searchType === 'track'}
                                    onChange={handleSearchTypeChange}
                                />
                                Track
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='artist'
                                    checked={searchType === 'artist'}
                                    onChange={handleSearchTypeChange}
                                    />
                                    Artist
                                    </label>
                                    <label>
                                <input
                                type='radio'
                                    value='album'
                                    checked={searchType === 'album'}
                                    onChange={handleSearchTypeChange}
                                />
                                Album
                                </label>
                        </div>
                        {searchResults?.length > 0 && (
                            <div className='search-results'>
                                <ul>
                                    {renderSearchResults()}
                                </ul>
                                <div className='pagination'>
                                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                                    <button onClick={handleNextPage}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <Nav
                        className="me-auto my-2 my-lg-0 text-uppercase mx-auto"
                        navbarScroll
                        style={{
                            fontWeight: "700"
                        }}
                        >
                        <Nav.Link as={Link} to="/" className="nav-link-hover">
                            <FontAwesomeIcon className="navbar-icons" icon={faHouse} /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/testimonials" className="nav-link-hover">
                        <FontAwesomeIcon className="navbar-icons" icon={faComments} /> Testimonials
                        </Nav.Link>
                        <Nav.Link as={Link} to="/hot-songs" className="nav-link-hover">
                        <FontAwesomeIcon className="navbar-icons" icon={faHeadphonesSimple} /> Hot Songs
                        </Nav.Link>
                        <Nav.Link as={Link} to="/top-charts" className="nav-link-hover">
                            <FontAwesomeIcon className="navbar-icons" icon={faMusic} /> Top Charts
                        </Nav.Link>
                        <NavDropdown title={<FontAwesomeIcon className="navbar-icons" icon={faUser} />} id="navbarScrollingDropdown" align="end">
                        <NavDropdown.Item as={Link} to="/profile">
                                <FontAwesomeIcon icon={faIdCard} className='navbar-icons' /> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/news">
                                <FontAwesomeIcon icon={faNewspaper} className='navbar-icons' /> News
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/feedbacks">
                                <FontAwesomeIcon icon={faMessage} className='navbar-icons' /> Feedback
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/add-artist">
                                <FontAwesomeIcon icon={faUserPlus} className='navbar-icons' /> Add Artist Details
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to={ROUTE_CONSTANT.AUTH.LOGIN} onClick={() => {
                                toast.info('You have been logged out');
                                localStorage.clear();
                            }}>
                                <FontAwesomeIcon icon={faRightFromBracket} className='navbar-icons' /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavigation;

*/


// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { faComments, faHeadphonesSimple, faHouse, faIdCard, faMessage, faMusic, faNewspaper, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from 'react-router-dom';
// import './MainNavigation.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { ROUTE_CONSTANT } from '../../routes/constant';

// const MainNavigation = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchType, setSearchType] = useState('track');
//     const [searchResults, setSearchResults] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const searchContainerRef = useRef(null);
//     const navigate = useNavigate();

//     const handleSearchQueryChange = (event) => {
//         setSearchQuery(event.target.value);
//         setCurrentPage(1);
//     };

//     const handleSearchTypeChange = (event) => {
//         setSearchType(event.target.value);
//         setSearchQuery('');
//         setSearchResults([]);
//         setCurrentPage(1);
//     };

//     useEffect(() => {
//         if (searchQuery.length > 0) {
//             const fetchSearchResults = async () => {
//                 try {
//                     const API_URL = 'http://localhost:3007/api/v1/user/search';
//                     const response = await axios.post(API_URL, {
//                         type: searchType,
//                         query: searchQuery,
//                         page: currentPage
//                     }, {
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     });
//                     setSearchResults(response.data.data.lyricfind.tracks.track);
//                 } catch (error) {
//                     console.error('Error fetching search results:', error);
//                 }
//             };

//             fetchSearchResults();
//         } else {
//             setSearchResults([]);
//         }
//     }, [searchQuery, searchType, currentPage]);

//     const handleNextPage = () => {
//         setCurrentPage(prevPage => prevPage + 1);
//     };

//     const handlePreviousPage = () => {
//         setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
//     };

//     const handleResultClick = (result) => {
//         let path = '';
//         if (searchType === 'track' || searchType === 'artist' || searchType === 'album') {
//             const isrc = result.isrcs ? (Array.isArray(result.isrcs.isrc) ? result.isrcs.isrc[0] : result.isrcs.isrc) : 'not-available';
//             path = `/lyrics/${isrc}`;
//         }

//         navigate(path);
//         setSearchQuery('');
//         setCurrentPage(1); // Reset to page 1 when a result is clicked
//     };

//     const renderSearchResults = () => {
//         return searchResults.map(result => {
//             const imageUrl = (searchType === "track") ? result?.album?.images && result?.album?.images?.length > 0 ? result?.album?.images[0]?.url : '' : result?.images && result?.images?.length > 0 ? result?.images[0]?.url : "";
//             const name = result?.title;
//             let additionalInfo = '';

//             if (searchType === 'track' || searchType === 'album') {
//                 additionalInfo = Array.isArray(result.artists.artist) ? result.artists.artist.map(artist => artist._).join(', ') : result.artists.artist._;
//             } else if (searchType === 'artist') {
//                 additionalInfo = result.genres ? result.genres.join(', ') : '';
//             }

//             return (
//                 <li key={result.id} onClick={() => handleResultClick(result)} style={{ cursor: 'pointer' }}>
//                     {imageUrl && (
//                         <img src={imageUrl} alt={name} style={{ width: '50px', height: '50px' }} />
//                     )}
//                     <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
//                         <strong>{name}</strong>
//                         {additionalInfo && (
//                             <span style={{ textDecoration: "none", color: 'black', marginLeft: 'auto' }}>{additionalInfo}</span>
//                         )}
//                     </div>
//                 </li>
//             );
//         });
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
//                 setSearchResults([]);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <Navbar expand="lg" className="bg-body-tertiary m-0 p-0 border-bottom">
//             <Container fluid className='navbar-container'>
//                 <Navbar.Brand as={Link} to="/">
//                     <img src="/assets/logo.png" alt="Company Logo" />
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <div className="search-container d-flex" ref={searchContainerRef}>
//                         <Form className="d-flex mx-2 my-2 my-lg-0" style={{ width: "100%" }}>
//                             <Form.Control
//                                 type="search"
//                                 placeholder="Search Songs..."
//                                 className="me-1"
//                                 aria-label="Search"
//                                 value={searchQuery}
//                                 onChange={handleSearchQueryChange}
//                             />
//                             <button className="button-outline-dark" type="button" onClick={() => setCurrentPage(1)}>Search</button>
//                         </Form>
//                         <div className="radio-buttons my-auto">
//                             <label>
//                                 <input
//                                     type='radio'
//                                     value='track'
//                                     checked={searchType === 'track'}
//                                     onChange={handleSearchTypeChange}
//                                 />
//                                 Track
//                             </label>
//                             <label>
//                                 <input
//                                     type='radio'
//                                     value='artist'
//                                     checked={searchType === 'artist'}
//                                     onChange={handleSearchTypeChange}
//                                 />
//                                 Artist
//                             </label>
//                             <label>
//                                 <input
//                                     type='radio'
//                                     value='album'
//                                     checked={searchType === 'album'}
//                                     onChange={handleSearchTypeChange}
//                                 />
//                                 Album
//                             </label>
//                         </div>
//                         {searchResults?.length > 0 && (
//                             <div className='search-results'>
//                                 <ul>
//                                     {renderSearchResults()}
//                                 </ul>
//                                 <div className='pagination'>
//                                     <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
//                                     <button onClick={handleNextPage}>Next</button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <Nav
//                         className="me-auto my-2 my-lg-0 text-uppercase mx-auto"
//                         navbarScroll
//                         style={{
//                             fontWeight: "700"
//                         }}
//                     >
//                         <Nav.Link as={Link} to="/" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faHouse} /> Home
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/testimonials" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faComments} /> Testimonials
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/hot-songs" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faHeadphonesSimple} /> Hot Songs
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/top-charts" className="nav-link-hover">
//                             <FontAwesomeIcon className="navbar-icons" icon={faMusic} /> Top Charts
//                         </Nav.Link>
//                         <NavDropdown title={<FontAwesomeIcon className="navbar-icons" icon={faUser} />} id="navbarScrollingDropdown" align="end">
//                             <NavDropdown.Item as={Link} to="/profile">
//                                 <FontAwesomeIcon icon={faIdCard} className='navbar-icons' /> Profile
//                             </NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item as={Link} to="/news">
//                                 <FontAwesomeIcon icon={faNewspaper} className='navbar-icons' /> News
//                             </NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item as={Link} to="/feedbacks">
//                                 <FontAwesomeIcon icon={faMessage} className='navbar-icons' /> Feedback
//                             </NavDropdown.Item>
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item as={Link} to={ROUTE_CONSTANT.AUTH.LOGIN} onClick={() => {
//                                 toast.info('You have been logged out');
//                                 localStorage.clear();
//                             }}>
//                                 <FontAwesomeIcon icon={faRightFromBracket} className='navbar-icons' /> Logout
//                             </NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default MainNavigation;

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faComments, faHeadphonesSimple, faHouse, faIdCard, faMessage, faMusic, faNewspaper, faRightFromBracket, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import './MainNavigation.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ROUTE_CONSTANT } from '../../routes/constant';
import slugify from 'slugify';


const MainNavigation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('track');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSearchQuery('');
        setSearchResults([]);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            const fetchSearchResults = async () => {
                try {
                    const API_URL = 'https://lyricsweb.com/api/v1/user/search';
                    const response = await axios.post(API_URL, {
                        type: searchType,
                        query: searchQuery,
                        page: currentPage
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data.success) {
                        if (searchType === 'track') {
                            setSearchResults(response.data.data.tracks.items);
                        } else if (searchType === 'artist') {
                            setSearchResults(response.data.data.artists.items);
                        } else if (searchType === 'album') {
                            setSearchResults(response.data.data.albums.items);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };

            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, searchType, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
    };

    // const handleResultClick = (result) => {
    //     let path = '';
    //     if (searchType === 'track') {
    //         const isrc = result.external_ids?.isrc || 'not-available';
    //         path = `/lyrics/${isrc}`;
    //     } else if (searchType === 'artist') {
    //         const artistId = result.id;
    //         path = `/artist/albums/${artistId}`;
    //     } else if (searchType === 'album') {
    //         const albumId = result.id;
    //         path = `/album/songs/${albumId}`;
    //     }

    //     navigate(path);
    //     setSearchQuery('');
    //     setCurrentPage(1); // Reset to page 1 when a result is clicked
    // };
    const handleResultClick = (result) => {
        const slugifiedName = result.name.replace(/\s+/g, '-'); // Slugify artist name

        let path = '';
        let navigateOptions = {}; // To hold options for navigate

        if (searchType === 'track') {
            const isrc = result.external_ids?.isrc || 'not-available';
            path = `/lyrics/${isrc}`;
        } else if (searchType === 'artist') {
            const artistId = result.id;
            path = `/artist/albums/${slugifiedName}`;
            navigateOptions = { state: { artistId } }; // Set state if searchType is artist
        } else if (searchType === 'album') {
            const albumId = result.id;
            path = `/album/songs/${albumId}`;
        }

        navigate(path, navigateOptions); // Navigate with options (state if applicable)
        setSearchQuery('');
        setCurrentPage(1); // Reset to page 1 when a result is clicked
    };
    const renderSearchResults = () => {
        return searchResults.map(result => {
            console.log(result)
            const imageUrl = result?.album?.images && result?.album?.images?.length > 0 ? result?.album?.images[0]?.url : result?.images && result?.images?.length > 0 ? result?.images[0]?.url : '';
            const name = result.name;
            let additionalInfo = '';

            if (searchType === 'track' || searchType === 'album') {
                additionalInfo = searchType === 'album' ? `Release Date: ${result.release_date}` : Array.isArray(result.artists) ? result.artists.map(artist => artist.name).join(', ') : result.artists.name;
            } else if (searchType === 'artist') {
                additionalInfo = result.genres ? result.genres.join(', ') : '';
            }

            return (
                <li key={result.id} onClick={() => handleResultClick(result)} style={{ cursor: 'pointer' }}>
                    {imageUrl && (
                        <img src={imageUrl} alt={name} style={{ width: '50px', height: '50px' }} />
                    )}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{name}</strong>
                        {additionalInfo && (
                            <span style={{ textDecoration: "none", color: 'black', marginLeft: 'auto' }}>{additionalInfo}</span>
                        )}
                    </div>
                </li>
            );
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary m-0 p-0 border-bottom">
            <Container fluid className='navbar-container'>
                <Navbar.Brand as={Link} to="/">
                    <img src="/assets/logo.png" alt="Company Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <div className="search-container d-flex" ref={searchContainerRef}>
                        <Form className="d-flex mx-2 my-2 my-lg-0" style={{ width: "100%" }}>
                            <Form.Control
                                type="search"
                                placeholder="Search Songs..."
                                className="me-1"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                            <button className="button-outline-dark" type="button" onClick={() => setCurrentPage(1)}>Search</button>
                        </Form>
                        <div className="radio-buttons my-auto">
                            <label>
                                <input
                                    type='radio'
                                    value='track'
                                    checked={searchType === 'track'}
                                    onChange={handleSearchTypeChange}
                                />
                                Track
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='artist'
                                    checked={searchType === 'artist'}
                                    onChange={handleSearchTypeChange}
                                />
                                Artist
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='album'
                                    checked={searchType === 'album'}
                                    onChange={handleSearchTypeChange}
                                />
                                Album
                            </label>
                        </div>
                        {searchResults?.length > 0 && (
                            <div className='search-results'>
                                <ul>
                                    {renderSearchResults()}
                                </ul>
                                <div className='pagination'>
                                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                                    <button onClick={handleNextPage}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <Nav
                        className="me-auto my-2 my-lg-0 text-uppercase mx-auto"
                        navbarScroll
                        style={{
                            fontWeight: "700"
                        }}
                    >
                        <Nav.Link as={Link} to="/" className="nav-link-hover">
                            <FontAwesomeIcon className="navbar-icons" icon={faHouse} /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/testimonials" className="nav-link-hover">
                            <FontAwesomeIcon className="navbar-icons" icon={faComments} /> Testimonials
                        </Nav.Link>
                        <Nav.Link as={Link} to="/hot-songs" className="nav-link-hover">
                            <FontAwesomeIcon className="navbar-icons" icon={faHeadphonesSimple} /> Hot Albums
                        </Nav.Link>
                        <Nav.Link as={Link} to="/top-charts" className="nav-link-hover">
                            <FontAwesomeIcon className="navbar-icons" icon={faMusic} /> Top Charts
                        </Nav.Link>
                        <NavDropdown title={<FontAwesomeIcon className="navbar-icons" icon={faUser} />} id="navbarScrollingDropdown" align="end">
                            <NavDropdown.Item as={Link} to="/profile">
                                <FontAwesomeIcon icon={faIdCard} className='navbar-icons' /> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/news">
                                <FontAwesomeIcon icon={faNewspaper} className='navbar-icons' /> News
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/feedbacks">
                                <FontAwesomeIcon icon={faMessage} className='navbar-icons' /> Feedback
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/add-artist">
                                <FontAwesomeIcon icon={faUserPlus} className='navbar-icons' /> Add Artist Details
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to={ROUTE_CONSTANT.AUTH.LOGIN} onClick={() => {
                                toast.info('You have been logged out');
                                localStorage.clear();
                            }}>
                                <FontAwesomeIcon icon={faRightFromBracket} className='navbar-icons' /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavigation;



