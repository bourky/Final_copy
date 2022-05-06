
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from "firebase/auth";
import {useState} from 'react';
import {useEffect} from 'react';
import GlobalVariables from './GlobalVariables';
import Navbar from './Navbar';
import './ListsPage.css';

// This acts as a conatainer for the navigation bar
function ListsPage() {
  let globals = JSON.parse(document.cookie);
  
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
    marginTop: "30px",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "blue",
    overflow: "scroll"
  };

  // Sends user to a new page with the info of the movie the user clicked on
  const getInfo = (event) => {
    window.open("/InfoPage#" + event.target.id,"_self");
  };

  let [see_list_div, setSeeListDiv] = useState(null);
  let [saw_list_div, setSawListDiv] = useState(null);

  // Adds a toggle to the watch and already watched lists and a toggle for the respective buttons
  const updateSeeList = (event) => {
    // console.log(event.target.id);

    let id_split_index = event.target.id.indexOf(":");
    let index_found = -1;

    for (let i = 0; i < globals.see.length; i++) {
      // console.log();
      if (globals.see[i].movie_id === event.target.id.substring(0, id_split_index)) {
        index_found = i;
        // console.log("found: " + index_found);
      }
    }
    if (index_found != -1) {
      let shift_index = index_found;
      let last_index = globals.see.length - 1;
      globals.see[shift_index] = globals.see[last_index];
      let throw_away = globals.see.pop();
      document.cookie = JSON.stringify(globals);
      event.target.innerHTML = "SEE +";
      // console.log(GlobalVariables.see);
      setSeeListDiv(globals.see.map(addContainers1));
    }
    console.log(globals.see);
  };

  // Adds a toggle to the watch and already watched lists and a toggle for the respective buttons
  const updateSawList = (event) => {
    // console.log(event.target.id);

    let id_split_index = event.target.id.indexOf(":");
    let index_found = -1;

    for (let i = 0; i < globals.saw.length; i++) {
      // console.log();
      if (globals.saw[i].movie_id === event.target.id.substring(0, id_split_index)) {
        index_found = i;
        // console.log("found: " + index_found);
      }
    }

    if (index_found != -1) {
      let shift_index = index_found;
      let last_index = globals.saw.length - 1;
      globals.saw[shift_index] = globals.saw[last_index];
      let throw_away = globals.saw.pop();
      document.cookie = JSON.stringify(globals);
      event.target.innerHTML = "SAW +";
      // console.log(GlobalVariables.saw);
      setSawListDiv(globals.saw.map(addContainers2));
    }
    console.log(globals.saw);
  };


  // Puts the response from the server's API call into divs and displays it to the user
  function addContainers1 (obj) {
    // formats the search result for it to be displayed
    return (
      <div>
        <div className="d-flex title2">{obj.movie_title}</div>
        <div className="poster_centering d-flex">
          <img id={obj.movie_id} onClick={getInfo} className="d-flex interaction2 poster2" src={obj.poster_url} alt="Movie Poster" />
        </div>
        <div className="button_container2 d-flex">
          <div onClick={updateSeeList} id={obj.movie_id + ":" + obj.movie_title + ":" + obj.poster_url} className="see_container2 d-flex" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Movie to see">
            SEE -
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }  

  // Puts the response from the server's API call into divs and displays it to the user
  function addContainers2 (obj) {
    // formats the search result for it to be displayed
    return (
      <div>
        <div className="d-flex title2">{obj.movie_title}</div>
        <div className="poster_centering d-flex">
          <img id={obj.movie_id} onClick={getInfo} className="d-flex interaction2 poster2" src={obj.poster_url} alt="Movie Poster" />
        </div>
        <div className="button_container2 d-flex">
          <div onClick={updateSawList} id={obj.movie_id + ":" + obj.movie_title + ":" + obj.poster_url} className="saw_container2 d-flex" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Movie you saw">
            SAW -
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }  
  
  //Runs only on the first render
  useEffect(() => {
    if (globals.see.length != 0) {
      setSeeListDiv(globals.see.map(addContainers1));
    }
    else {
      setSeeListDiv((<div>There are no movies to see</div>));
    }
    if (globals.saw.length != 0) {
      setSawListDiv(globals.saw.map(addContainers2));
    }
    else {
      setSawListDiv((<div>There are no movies you saw</div>));
    }
    console.log("setting divs");
    let obj = {};
    obj = document.cookie;
    console.log(JSON.parse(document.cookie));
  }, []);


  return (
    <div>
      <Navbar />

      <div style={resultContainerStyle} className="d-flex">
        <div className="see_list_container d-flex">
          {see_list_div && <div>{see_list_div}</div>}
        </div>

        <div className="saw_list_container d-flex">
         {saw_list_div && <div>{saw_list_div}</div>}
        </div>
      </div>
    </div>
  );
}
  
export default ListsPage;
