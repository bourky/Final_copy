
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from "firebase/auth";
import {useEffect} from 'react';
import './HomePage.css';

// This acts as a conatainer for the homepage
function HomePage() {
  let globals = JSON.parse(document.cookie);
  
  useEffect(() => {
    console.log(JSON.parse(document.cookie).email);

    if (globals.email != undefined) {
      window.open("http://localhost:3000/MediaPage", "_self");
    }
  }, []);

  // Sets the pages width to the full screen
  let screen_width = window.outerWidth + "px";
  // Sets the pages height to the full screen
  let screen_height = (window.outerHeight - 135) + "px";
  const resultContainerStyle = {
    width: screen_width,
    height: screen_height,
    // backgroundColor: "blue",
  };

  const handleLogin = (event) => {
    window.open("http://localhost:3000/LogInPage", "_self");
  }
  
  return (
    <div style={resultContainerStyle} className="d-flex page_container">
      <h1 className="d-flex app_name">
        SEE/SAW
      </h1>
      
      <div className="d-flex aesthetic_container">        
        <div className="d-flex summary_container">
          <div className="summary">
            This web application uses the IMDB APIs to allow you to search for movies and see when a movie came, how long it is, its plot, and the actor starring in it.
            <br />
            You can also save these movies to a list of movies to be watched, and to a list of movies that you have already watched.
            <br />
            The user's homepage is the media page which has trailers of the upcoming movies and the reviews of the movies in theaters
            <br />
            <div className="d-flex login_button_container">
              <div className="d-flex button_frame">
                <div onClick={handleLogin} className="d-flex lbutton">
                  Sign in/Sign up
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
  export default HomePage;