import React, {useState, useEffect, useRef} from 'react';
import Loading from '../Asset/Loading.gif'
import '../Styles/Home.css';
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";


function Home() {

  const [photos, setPhotos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const [{ user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  const fetchPhotos = async(pageNumber) => {
    const Access_Key = "Y81E5zFEZlOufQh3ZyEid2G6T_PTRPW5g95hu7eZasU"
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=10`)
    const data = await res.json()
    console.log(data);
    setPhotos(p => [...p, ...data])
    setLoading(true)
  }

  useEffect(() => {
    fetchPhotos(pageNumber)
  }, [pageNumber])
  
  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  const pageEnd = useRef();
  
  useEffect(() => {
    if(loading) {
      const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          
          loadMore();
         
        }

      },{threshold: 1});
      observer.observe(pageEnd.current)
    }
  }, [loading])

    return (
        <div className="home">
          <img
              className="home__logo"
              src='https://www.datingscout.com/b6/image/upload/ds/upload/reviews/ENG/shaadi/shaadi-logo.png' 
          />
          <Link to={!user && '/login'}>
            <button className="logoutButton" onClick={handleAuthenticaton}>Logout</button>
          </Link>
          
        {
            photos.map((photo, index) => (
            <div className="photos" key={index}>
            <img src={photo.urls.small} />
            <p>{photo.user.first_name + ' '+ photo.user.last_name}</p>

            </div>
            ))
        }

      <div className="loading">
        <img src={Loading} alt="" />
      </div>
      <h3>{photos.length}</h3>
      <button onClick={loadMore} ref={pageEnd}>
        Load More
      </button>
            
        </div>
    )
}

export default Home;
