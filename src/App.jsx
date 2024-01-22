import React, { useEffect, useState } from "react";
import './index.css';
import {Form, FormControl} from 'react-bootstrap'
import axios from 'axios'
import {Button} from 'react-bootstrap'
const API_URL = 'https://api.unsplash.com/search/photos'
const IMAGES_PER_PAGE = 20


const App = () => {
  const [searchvalue, setsearchvalue] = useState(' ')
  const [images, setImages] = useState([]);
  const [totalpage, setTotalpage] = useState(1);
  const [page, setPage] = useState(1)

  useEffect(()=>{
    fetchimages();
  },[page]);

  const fetchimages = async () => {
    try{
      const {data} = await axios.get(`${API_URL}?query=${
        searchvalue
      }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
        process.env.REACT_APP_IMAGE_API_KEY
      }`
   );
  // console.log('data', data)
   setImages(data.results);
   setTotalpage(data.total_pages)
    }
   catch (error){
    console.log(error)
   }
  }
  const getimage = (event) =>{
    console.log(searchvalue)
    event.preventDefault();
    fetchimages()
  }

  const handleselect = (selection) => {
    setsearchvalue(selection)
    fetchimages()
    console.log(page)
  }

 

  return (
    <>
      <div className="conatiner">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={getimage}>
          <FormControl 
          type='search'
          placeholder="Search for an image"
          className="search-input"
          value={searchvalue}
          onChange={(e)=>setsearchvalue(e.target.value)}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={()=>handleselect('nature')}>Nature</div>
        <div onClick={()=>handleselect('cars')}>Cars</div>
        <div onClick={()=>handleselect('bikes')}>Bikes</div>
        <div onClick={()=>handleselect('birds')}>Birds</div>
      </div>
      <div className="images">
        {
        images.map( (image) => {
          return (
          <img 
          key = {image.id}
          src = {image.urls.small}
          alt = {image.alt_description}
          className="image"
          />
          )})}
      </div>
      <div className="buttons">
        {page >1 && <Button onClick={()=>setPage(page-1)}>Previous</Button>}
        {page < totalpage && <Button onClick={()=>setPage(page+1)}>next</Button>}
      </div>
    </div>

    </>
  )
}

export default App;
