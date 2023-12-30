import React from 'react';
import '../../css/dmc_css/DMC.css';
import { FcMultipleCameras } from 'react-icons/fc';
import { FcGallery } from 'react-icons/fc';

const PhotoGallery = () => {
  // Sample array of photo URLs
  const photos = [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/photo3.jpg',
    // Add more photo URLs as needed
  ];

  return (
    <div style={{ display: 'flex', overflowX: 'auto', maxWidth: '100%' }}>
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Photo ${index + 1}`}
          style={{ width: '200px', height: 'auto', margin: '0 5px' }}
        />
      ))}
    </div>
  );
};

const DMC = () => {
  return (
    <div className='dmc-main'>
      <div className="title">
        DIGITAL MONITORING CELL(DMC)
      </div>
      <div className="link">
        <div>
          <a href="Upload">
            <FcGallery /> GALLERY
          </a>
        </div>
        <div>
          <a href="Upload">
            <FcMultipleCameras /> Upload Photos
          </a>
        </div>
      </div>
      {/* Include the PhotoGallery component here */}
      <PhotoGallery />
    </div>
  );
};

export default DMC;
