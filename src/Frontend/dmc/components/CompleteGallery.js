import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/CompleteGallery.css';
import { CG } from './CG';
import { MdOutlineArrowBackIos } from "react-icons/md";


function CompleteGallery() {
  const images = CG ? [...CG].reverse() : [];
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image, description) => {
    setSelectedImage({ image, description });
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="complete-gallery-container">
      <h1>Gallery of JNTUGV</h1>
      {/* <Link to="/dmc" className="back-to-home"><MdOutlineArrowBackIos />Back to Homepage</Link> Link to the homepage */}
      <div className="image-grid">
        {images.map((imageObj, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={imageObj.image}
              alt={`JNTUGV ${images.length - index}`}
              className="grid-image"
              onClick={() => handleImageClick(imageObj.image, imageObj.description)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="enlarged-image" >
          <img src={selectedImage.image} alt={`JNTUGV`} />
          <p>{selectedImage.description}</p>
          <button onClick={handleClose}>Back</button>
        </div>
      )}
    </div>
  );
}

export default CompleteGallery;