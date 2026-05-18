import { useState, useEffect } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  // Validate file
  const validateFile = (file) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Please select an image file (JPEG, PNG, WebP, or GIF)';
    }

    if (file.size > maxSizeInBytes) {
      return `File is too large. Maximum size is 5MB. Your file is ${(
        file.size /
        (1024 * 1024)
      ).toFixed(2)}MB`;
    }

    return null;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // User cancelled selection
    if (!file) return;

    // Clear old error
    setError('');

    // Validate file
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Save selected file
    setSelectedFile(file);

    // Revoke old preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Create new preview URL
    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  // Cleanup blob URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle upload
  const handleSubmit = () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    // Create FormData
    const formData = new FormData();

    // Append file
    formData.append('image', selectedFile);

    // Send to parent
    if (onUpload) {
      onUpload(formData);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* File Input */}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
      />

      {/* Error Message */}
      {error && (
        <p
          style={{
            color: 'red',
            marginTop: '10px',
            fontSize: '14px',
          }}
        >
          {error}
        </p>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Preview:</p>

          <img
            src={previewUrl}
            alt="Selected file preview"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '1px solid #ddd',
            }}
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedFile || !!error}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: !selectedFile || error ? 'not-allowed' : 'pointer',
          opacity: !selectedFile || error ? 0.6 : 1,
        }}
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;