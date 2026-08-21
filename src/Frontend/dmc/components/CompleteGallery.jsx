import React, { useEffect, useState } from 'react';
import '../css/CompleteGallery.css';
import axios from 'axios';
import ips from "../../api.json";
const api_ip = (import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : ips.server_ip;;

function CompleteGallery() {
  // const images = CG ? [...CG].reverse() : [];
  const [images,setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image, description) => {
    setSelectedImage({ image, description });
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const all_images = async () =>{
    try {
      const response = await axios.get(`${api_ip}/api/webadmin/allimages`);
      setImages(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('accesser');
        window.location.replace('/login');
        return;
      }
      console.error('Unable to load gallery overview:', error.message);
      setImages([]);
    }
  }

useEffect(()=>{
  all_images()
},[])



  return (
    <div className="complete-gallery-container">
      <h1>Gallery of JNTUGV</h1>
      {/* <Link to="/dmc" className="back-to-home"><MdOutlineArrowBackIos />Back to Homepage</Link> Link to the homepage */}
      <div className="image-grid">
        {images.map((imageObj, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={imageObj.imglink}
              alt={`JNTUGV ${images.length - index}`}
              className="grid-image"
              loading="lazy"
              decoding="async"
              onClick={() => handleImageClick(imageObj.imglink, imageObj.description)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="enlarged-image" >
          <img src={selectedImage.image} alt={`JNTUGV`} loading="lazy" decoding="async" />
          <p>{selectedImage.description}</p>
          <button onClick={handleClose}>Back</button>
        </div>
      )}
    </div>
  );
}

export default CompleteGallery;
