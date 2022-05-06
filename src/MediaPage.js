
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from "firebase/auth";
import {useState} from 'react';
import {useEffect} from 'react';
import Navbar from './Navbar'
import './MediaPage.css';

// This acts as a conatainer for the navigation bar
function MediaPage() {
  useEffect(() => {
    console.log(JSON.parse(document.cookie));
    
    // My web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyC7x34Mopv05Sjnsy1U8tGl0DJZqDRYuY8",
      authDomain: "cot4930-movies-project.firebaseapp.com",
      projectId: "cot4930-movies-project",
      storageBucket: "cot4930-movies-project.appspot.com",
      messagingSenderId: "536785905310",
      appId: "1:536785905310:web:dc73ee17411c84418ebd8f"
    };
    
    const firebase_app = initializeApp(firebaseConfig);
    const auth = getAuth(firebase_app);
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user === null) {
        window.open("http://localhost:3000/LogInPage", "_self");
      }
    });
  }, []);

  // Sets the pages width to the full screen
  let screen_width = window.outerWidth + "px";
  // Sets the pages height to the full screen
  let screen_height = (window.outerHeight - 135) + "px";
  const resultContainerStyle = {
    width: screen_width,
    height: screen_height,
    marginTop: "60px",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "blue",
    paddingTop: "35px"
  };

  let [trailers, setTrailers] = useState([]);
  let [yt_div, setYtDiv] = useState(null);
  let [bo_div, setBoDiv] = useState(null);

  // Puts the response from the server's API call into divs and displays it to the user
  function addContainers1 (url_obj) {
    // formats the search result for it to be displayed
    return (
      <div className={url_obj.tag}>
        <iframe width="420" height="250" src={url_obj.url}>
        </iframe>
      </div>
    );
  }  

  // Puts the response from the server's API call into divs and displays it to the user
  function addContainers2 (obj) {
    // formats the search result for it to be displayed
    return (
      <div className="d-flex review_container2">
        <div className="d-flex title_container2">{obj.movie_title}</div>
        <div className="d-flex rating_container2">Rating: {obj.rating}</div>
        <div className="d-flex review_container2">
          {obj.review}
          <br />
          <br />
          <div className="d-flex rev_info_container2">
            - {obj.author}, {obj.publisher}
          </div>
        </div>
        <br />
      </div>
    );
  }  

  //Runs only on the first render
  useEffect(() => {
    fetch("http://localhost:3001/trailers?get=new", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        // console.log(res);
        if (res.status === 503) {
        //   setServerdata("Error, code: 503 (service unavailable): array creation failed");
        }                
        if (res.status === 500) {
        //   setServerdata("Error, code: 500 (internal server error): Server could not write or read file");
        }
        return res.json();
      }).then((new_movie) => {
        // console.log(new_movie.trailers);

        let url_obj_array = [];

        for (let i = 0; i < new_movie.trailers.length; i++) {
          let ctag = "";
          if (i === 0) {
            ctag = "carousel-item active";
          }
          else {
            ctag = "carousel-item";
          }
          url_obj_array.push({
            url: "https://www.youtube.com/embed/" + JSON.parse(new_movie.trailers[i]).videoUrl.substring(JSON.parse(new_movie.trailers[i]).videoUrl.indexOf("?v=") + 3),
            tag: ctag
          });
        }

        // console.log(url_obj_array);

        if (url_obj_array.length != 0)
        { 
          setYtDiv(url_obj_array.map(addContainers1));
        }
      }).catch(err => {
        console.log(err);
      // setServerdata("Something went wrong!");
        return err;
      }
    );
  }, []);

  //Runs only on the first render
  useEffect(() => {
    fetch("http://localhost:3001/box_office?get=out_now", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        // console.log(res);
        if (res.status === 503) {
          setYtDiv("Error, code: 503 (service unavailable): array creation failed");
          setBoDiv("Error, code: 503 (service unavailable): array creation failed");
        }                
        if (res.status === 500) {
          setYtDiv("Error, code: 500 (internal server error): Server could not write or read file");
          setBoDiv("Error, code: 500 (internal server error): Server could not write or read file");
        }
        if (res.status === 401) {

        }
        return res.json();
      }).then((metacritic) => {
        console.log(metacritic);

        let mr_obj_array = [];

        for (let i = 0; i < metacritic.reviews.length; i++) {
          console.log(metacritic.reviews[i].items); 

          if (metacritic.reviews[i].items.length === 0) {
            mr_obj_array.push({
              movie_title: metacritic.reviews[i].title,
              rating: "No ratings yet",
              review: "No reviews yet",
              author: "None",
              publisher: "None"
            });
          }
          else {
            for (let j = 0; j < metacritic.reviews[i].items.length; j++) {
              mr_obj_array.push({
                movie_title: metacritic.reviews[i].title,
                rating: metacritic.reviews[i].items[j].rate,
                review: metacritic.reviews[i].items[j].content,
                author: metacritic.reviews[i].items[j].author,
                publisher: metacritic.reviews[i].items[j].publisher
              });
            }
          }
        }

        console.log(mr_obj_array);

        if (mr_obj_array.length != 0)
        { 
          setBoDiv(mr_obj_array.map(addContainers2));
        }
        else {
          setBoDiv(<div>No Content</div>);
        }
      }).catch(err => {
        console.log(err);
      // setServerdata("Something went wrong!");
        return err;
      }
    );
  }, []);
  
  return (
    <div>
      <Navbar />
      <div style={resultContainerStyle} className="d-flex media_container">
        <div className="d-flex trailer_container">
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {yt_div && <div>{yt_div}</div>}
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        <div className="d-flex box_office_container">
          <div className="d-flex out_now">
            Out Now:
          </div>

          <div className="d-flex reviews">
            {bo_div && <div>{bo_div}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default MediaPage;
