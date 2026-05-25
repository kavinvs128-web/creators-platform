import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { showToast } from '../services/toast';
import ImageUpload from '../components/ImageUpload';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology',
    status: 'draft',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleUpload = async (imageFormData) => {
    setUploading(true);
    setUploadError('');

    try {
      const response = await api.post(
        '/api/upload',
        imageFormData
      );

      // Save Cloudinary URL
      setCoverImageUrl(response.data.url);

      showToast.success('Image uploaded successfully!');

      return response.data.url;

    } catch (err) {

      const message =
        err.response?.data?.message ||
        'Image upload failed';

      setUploadError(message);

      showToast.error(message);

    } finally {
      setUploading(false);
    }
  };

  // Handle post creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {

      const postData = {
        ...formData,
        coverImage: coverImageUrl,
      };

      const response = await api.post(
        '/api/posts',
        postData
      );

      if (response.data.success) {

        showToast.success(
          'Post created successfully!'
        );

        // Reset form
        setFormData({
          title: '',
          content: '',
          category: 'Technology',
          status: 'draft',
        });

        setCoverImageUrl(null);
        setUploadError('');

        navigate('/dashboard');
      }

    } catch (err) {

      showToast.apiError(err);

    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Create New Post</h1>

        <form onSubmit={handleSubmit} style={formStyle}>

          {/* Title */}
          <div style={fieldStyle}>
            <label>Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              style={inputStyle}
            />
          </div>

          {/* Content */}
          <div style={fieldStyle}>
            <label>Content</label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content..."
              rows="10"
              required
              style={textareaStyle}
            />
          </div>

          {/* Category */}
          <div style={fieldStyle}>
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Technology">
                Technology
              </option>

              <option value="Lifestyle">
                Lifestyle
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Food">
                Food
              </option>
            </select>
          </div>

          {/* Status */}
          <div style={fieldStyle}>
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </div>

          {/* Image Upload */}
          <ImageUpload onUpload={handleUpload} />

          {/* Upload Loading */}
          {uploading && (
            <p style={{ color: '#007bff' }}>
              Uploading image, please wait...
            </p>
          )}

          {/* Upload Error */}
          {uploadError && (
            <p style={{ color: 'red' }}>
              {uploadError}
            </p>
          )}

          {/* Preview Uploaded Image */}
          {coverImageUrl && (
            <img
              src={coverImageUrl}
              alt="Uploaded cover"
              style={previewStyle}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || uploading}
            style={buttonStyle}
          >
            {isLoading
              ? 'Creating...'
              : uploading
              ? 'Uploading...'
              : 'Create Post'}
          </button>

        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  padding: '2rem',
  backgroundColor: '#f5f5f5',
};

const formContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  fontFamily: 'inherit',
};

const textareaStyle = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  fontFamily: 'inherit',
  resize: 'vertical',
};

const previewStyle = {
  width: '100%',
  maxHeight: '250px',
  objectFit: 'cover',
  borderRadius: '8px',
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'background-color 0.3s',
};

export default CreatePost;