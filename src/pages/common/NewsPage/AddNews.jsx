import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig, getFormDataConfig } from '../../../services/apiUtils';
import imageCompression from 'browser-image-compression';

const AddNews = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImagePath, setCoverImagePath] = useState('');
    const [formLoading, setFormLoading] = useState(false); // Loading for form submission
    const [imageLoading, setImageLoading] = useState(false); // Loading for image upload
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').reverse().join('-');

        const formData = {
            title,
            description,
            coverImg: coverImagePath,
            author,
            publishDate: formattedDate
        };

        try {
            await allAPiServicesCall.addNews(formData, getAuthConfig(), navigate);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit news.');
        } finally {
            setFormLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        let imageFile = e.target.files[0];

        if (imageFile?.size > 5 * 1024 * 1024) { // Check if file is larger than 3MB
            setError('Image size should not exceed 5 MB.');
            return;
        }

        const options = {
            maxSizeMB: 1, // Compress to 1MB
            maxWidthOrHeight: 1024, // Resize image to 1024x1024
            useWebWorker: true,
            fileType: imageFile.type,
        };

        try {
            setImageLoading(true);
            const compressedFile = await imageCompression(imageFile, options);

            const formData = new FormData();
            formData.append('image', compressedFile);

            const response = await allAPiServicesCall.addNewsCoverPic(formData, getFormDataConfig(), navigate);
            setCoverImagePath(response.data.path);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to upload image.');
        } finally {
            setImageLoading(false);
        }
    };

    return (
        <CommonLayout>
            <div className="container mt-5" style={{ marginBottom: '6rem' }}>
                <h1 className="text-center mb-4">Add News</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <ReactQuill value={description} onChange={setDescription} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cover Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="form-control"
                            accept="image/*"
                        />
                        {coverImagePath && (
                            <img src={coverImagePath} alt="Cover Preview" className="img-thumbnail cover-preview mb-3" />
                        )}
                        {imageLoading && (
                            <div className="d-flex justify-content-center mt-2">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary" disabled={imageLoading}>
                            {imageLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Loading...</span>
                                </>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
};

export default AddNews;
