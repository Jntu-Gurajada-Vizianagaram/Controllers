import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/CompleteGallery.css';
import { CG } from './CG';
import { MdOutlineArrowBackIos } from "react-icons/md";
import axios from 'axios';
const ips = require("../../api.json");
const api_ip = ips.server_ip;

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

  const all_images = () =>{
    try {
      axios.get(`${api_ip}/api/webadmin/allimages`)
      .then((response)=>{
        console.log(response.data)
        setImages(response.data)
      })
      
    } catch (error) {
      
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
              onClick={() => handleImageClick(imageObj.imglink, imageObj.description)}
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