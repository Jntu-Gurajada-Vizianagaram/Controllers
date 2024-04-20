import React, { useEffect, useState } from 'react';
import '../css/Gallery.css';
import { CG } from './CG'; // Import the array of image objects from CG.js
import axios, { all } from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
const ips = require("../../api.json");
const api_ip = ips.server_ip;

function CarouselDisplay() {

  const [allimages,setAllImages]=useState([])
  const [carouselimages,setCarouselImages]=useState([])

const maincarousel = ()=>{
  try {
    axios.get(`${api_ip}/api/webadmin/carousel-images-preview`)
    .then((response)=>{
      console.log(response)
      setCarouselImages(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  } catch (error) {
    console.log(error)
  }
}

const allimgs = ()=>{
  try {
    axios.get(`${api_ip}/api/webadmin/allimages`)
    .then((response)=>{
      console.log(response)
      setAllImages(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  } catch (error) {
    console.log(error)
  }
}


  useEffect(()=>{
    maincarousel()
    allimgs()
  },[])

  const [selectedImage, setSelectedImage] = useState(null);

  const add_to_carousel =(image)=>{
    axios.get(`${api_ip}/api/webadmin/add-to-carousel/${image.id}`)
    .then((response)=>{
      console.log(response)
      allimgs()
      maincarousel()
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const remove_from_carousel =(image)=>{
    axios.get(`${api_ip}/api/webadmin/remove-from-carousel/${image.id}`)
    .then((response)=>{
      console.log(response)
      maincarousel()
      allimgs()
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const remove_image =(image)=>{
    axios.get(`${api_ip}/api/webadmin/removeimage/${image.id}`)
    .then((response)=>{
      console.log(response)
      maincarousel()
      allimgs()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">GALLERY</h1>
      <div className="image-gallery">
        <div className="image-scroll">
          {carouselimages.map((image, index) => (
            <img
              key={index}
              src={image.imglink}
              alt={`JNTUGV ${image.description}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      <div>
        {selectedImage && (
          <div className="enlarged-image">
            <img src={selectedImage.imglink} alt={`JNTUGV`} />
            <button onClick={handleClose}>Back</button>
          </div>
        )}
      </div>
      <div>
        
        <div className="eventsdisplay">

          {allimages !=""? <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow key={"Table Attributes"}>
                  <TableCell>S.NO</TableCell>
                  <TableCell>Notification Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Update Added By</TableCell>
                  <TableCell>Carousel Status</TableCell>
                  <TableCell>Carousel Action<br></br>(ADD/REMOVE)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allimages.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>
                      <img src={request.imglink} alt={request.event_name + "Thumbnail"} height={70} width={50}/>
                    </TableCell>
                    <TableCell>{request.submitted}</TableCell>
                    <TableCell>{request.admin_approval}</TableCell>
                    <TableCell>
                      { request.carousel_scrolling == 'yes'?
                      <Button variant="contained" onClick={() => remove_from_carousel(request)}>
                        remove 
                      </Button>:
                      <Button variant="contained" onClick={() => add_to_carousel(request)}>
                        Add 
                      </Button>
                      }
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => remove_image(request)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <div>
          <h1> No New Requests</h1>
          </div>}
        </div>
      </div>
      
    </div>
  );
}

export default CarouselDisplay;