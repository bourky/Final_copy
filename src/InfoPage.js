
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from "firebase/auth";
import {useState} from 'react';
import {useEffect} from 'react';
import Navbar from './Navbar';
import './InfoPage.css';

// This acts as a conatainer for the navigation bar
function InfoPage() {
    useEffect(() => {
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
        marginTop: "30px",
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor: "blue"
    };


    const url = window.location.href;
    const url_id_index = url.indexOf("#");
    let movie_id = url.substring(url_id_index + 1);
    let [title, setTitle] = useState(null);
    let [image_src, setImageSource] = useState("");
    let [tag_line, setTagLine] = useState("");
    let [releasedate, setReleaseDate] = useState("");
    let [runtime, setRuntime] = useState("");
    let [plot, setPlot] = useState("");
    let [directors, setDirectors] = useState("");
    let [stars, setStars] = useState("");

    //Runs only on the first render
    useEffect(() => {
        fetch("http://localhost:3001/details?movie_id=" + movie_id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
            }).then((res) => {
                console.log(res);
                if (res.status === 503) {
                //   setServerdata("Error, code: 503 (service unavailable): array creation failed");
                }                
                if (res.status === 500) {
                //   setServerdata("Error, code: 500 (internal server error): Server could not write or read file");
                }
                return res.json();
            }).then((details) => {
                console.log(details);
                if (details.title != null)
                {
                    setTitle(details.fullTitle);
                    setImageSource(details.image);
                    setTagLine(details.tagline);
                    setReleaseDate(details.releaseDate);
                    setRuntime(details.runtimeStr);
                    setPlot(details.plot);
                    setDirectors(details.directors);
                    setStars(details.stars);
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
        <div style={resultContainerStyle} className="d-flex">
            <div className="poster_and_title_container">
                <div className="d-flex title_container">
                    {title && <div>{title}</div>}
                </div>

                <div className="d-flex poster_container">
                    <img src={image_src} alt="Movie Poster" className="poster" />
                </div>

                <div className="d-flex tag_line_container">
                    <div>{tag_line}</div>
                </div>
            </div>

            <div className="d-flex details_container">
                <div className="d-flex info_type_container">
                    <div className="d-flex detail_type3">
                        Release Date:
                    </div>

                    <div className="d-flex detail_type4">
                        Runtime:
                    </div>

                    <div className="d-flex detail_type">
                        Plot:
                    </div>

                    <div className="d-flex detail_type2">
                        Director(s):
                    </div>

                    <div className="d-flex detail_type">
                        Star(s):
                    </div>
                </div>

                <div className="d-flex detail_container">
                    <div className="d-flex detail3">
                        {releasedate}
                    </div>

                    <div className="d-flex detail4">
                        {runtime}
                    </div>

                    <div className="d-flex detail5">
                        {plot}
                    </div>

                    <div className="d-flex detail2">
                        {directors}
                    </div>

                    <div className="d-flex detail">
                        {stars}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
  
export default InfoPage;
