import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CommonLayout from '../../../layouts/CommonLayout';
import { allAPiServicesCall } from '../../../services/apiServices';
import { getAuthConfig, getFormDataConfig } from '../../../services/apiUtils';

const AddNews = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImagePath, setCoverImagePath] = useState('');
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        let imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);
        setLoading(true);

        try {
            const response = await allAPiServicesCall.addNewsCoverPic(formData, getFormDataConfig(), navigate);
            setCoverImagePath(response.data.path);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonLayout>
            <div className="container mt-5" style={{ marginBottom: '6rem' }}>
                <h1 className="text-center mb-4">Add News</h1>
                {loading && (
                    <div className="d-flex justify-content-center mb-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                {!loading && (
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
                            />
                        </div>
                        {coverImagePath && (
                            <img src={coverImagePath} alt="Cover Preview" className="img-thumbnail cover-preview mb-3" />
                        )}
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
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                )}
            </div>
        </CommonLayout>
    );
};

export default AddNews;
