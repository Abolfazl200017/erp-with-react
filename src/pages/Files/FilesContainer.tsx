import { Box, IconButton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';

export const FilesContainer = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Retrieve images from localStorage on mount
    const savedImages = JSON.parse(localStorage.getItem('images')) || [];
    setImages(savedImages);
  }, []);

  useEffect(() => {
    // Save images to localStorage whenever they change
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    URL.revokeObjectURL(id); // Clean up URL object
  };

  const accept: Accept = { 'image/*': [] };
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <Box>
      {/* Dropzone area */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #888',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input data-testid="dropzone" {...getInputProps()} />
        <Typography>فایل خود را اینجا بارگزاری نمایید</Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          gap: 2,
          mt: 2,
        }}
      >
        {images.map((img) => (
          <Box
            key={img.id}
            sx={{
              position: 'relative',
              width: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleDeleteImage(img.id)}
              sx={{
                position: 'absolute',
                top: 4,
                left: 4,
                color: 'white',
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Box
              component="img"
              src={img.id}
              alt="uploaded preview"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilesContainer;
