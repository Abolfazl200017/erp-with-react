import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { getAllFiles } from '../../services/filesService';

export const FilesContainer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial images from the API on mount
    getAllFiles()
      .then((fetchedImages) => {
        const formattedImages = fetchedImages.map((img) => ({
          id: img.id,
          url: img.url,
          thumbnailUrl: img.thumbnailUrl,
          title: img.title,
        }));
        setImages(formattedImages);
      })
      .catch((error) => console.error('Failed to fetch initial files:', error))
      .finally(() => setLoading(false));
  }, []);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    URL.revokeObjectURL(id); // Clean up URL object if it’s a file
  };

  const accept: Accept = { 'image/*': [] };
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <Box>
      {/* Dropzone area */}
      <Box {...getRootProps()} sx={{ border: '2px dashed #888', padding: '20px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
        <input data-testid="dropzone" {...getInputProps()} />
        <Typography>فایل خود را اینجا بارگزاری نمایید</Typography>
      </Box>

      {/* Loading indicator */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2, mt: 2 }}>
          {images.map((img) => (
            <Box key={img.id} sx={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
              <IconButton
                size="small"
                onClick={() => handleDeleteImage(img.id)}
                sx={{ position: 'absolute', top: 4, left: 4, color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {/* Display either the URL or the file preview */}
              <Box
                component="img"
                src={img.file ? img.id : img.url}
                alt={img.title || 'uploaded preview'}
                sx={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FilesContainer;
