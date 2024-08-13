import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './SearchForm.css';
import CommonLayout from '../../../layouts/CommonLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const searchItem = async () => {
        setLoading(true);
        try {
            let response = await axios.post('https://lyricsweb.com/api/v1/user/search', {
                type: "artist",
                query: searchTerm,
                page: "1",
                limit: "50"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setSearchData(response?.data?.data?.artists?.items || []);
        } catch (error) {
            console.log(error);
            toast.error('Error fetching search results');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            searchItem();
        } else {
            setSearchData([]);
        }
    }, [searchTerm]);

    const handleFileChange = async (event, artistId) => {
        const file = event.target.files[0];

        if (!file) {
            toast.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('artistId', artistId);

        setLoading(true);
        try {
            const response = await axios.post('https://lyricsweb.com/api/v1/admin/upload-artist-csv-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success(response?.data?.message);
                setSearchData([])
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error(error?.response?.data?.message);
            setSearchData([]);
            setSearchTerm('')
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonLayout>
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            <Form.Group controlId="searchSong" className='w-75 m-auto mt-2'>
                <Form.Control
                    type="text"
                    placeholder="Search for artist..."
                    value={searchTerm}
                    onChange={handleChange}
                    className='search-song-input dark-input'
                />
            </Form.Group>
            <ul className='artist-list w-75 mx-auto'>
                {searchData.map((artist) => (
                    <li key={artist.id} className='artist-item'>
                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <img src={artist.images[0]?.url} alt={artist.name} className='artist-image' />
                            <div className='artist-details'>
                                <h5 className='artist-name'>{artist.name}</h5>
                                <p className='artist-followers'>{artist.followers.total} followers</p>
                            </div>
                        </a>
                        <div className='button-container'>
                            <Button onClick={() => setSelectedArtistId(artist.id)}>Choose File</Button>
                            {selectedArtistId === artist.id && (
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={(event) => handleFileChange(event, artist.id)}
                                    className='file-input'
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </CommonLayout>
    );
}

export default SearchForm;
