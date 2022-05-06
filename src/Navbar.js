
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signOut } from "firebase/auth";
import {useState} from 'react';
import Menu from './Menu';
import './Navbar.css';

// This acts as a conatainer for the navigation bar
function Navbar() {
  let globals = JSON.parse(document.cookie);

  // Sets the pages height to the full screen
  let screen_width = window.outerWidth + "px";
  const fixedWidthStyle = {
    width: screen_width,
    position: "fixed",
    top: "0px"
  };

  // When submit is pressed, the code checks if all fields are filled (shows an error if not),
  // then sends the request, and displays the response from the server
  const handleFormSubmit = (event) => {
    // Prevents the showing of the request in the browser url bar
    event.preventDefault();
    // This checks for if the 'enter' key was pressed to submit the search
    // or if the search button was clicked
    if (event.key === "Enter" || event.target.id === "searchbutton1"  || event.target.id === "searchbutton2") {
      if (search_field === "" || search_field === "Search" || search_field === "'Search Field' field must be filled") {
        setErrorstyle({color: "red"});
        setSearchField("'Search Field' field must be filled");
      }
      // Stores the request parameters from the input field into a local variable
      else {
        let search = search_field;
        setSearchField("");
        console.log(search);
        window.open("/SearchPage?search_term=" + search,"_self");
      }
    }
  }

  // puts the users keystrokes into the field
  const handleUserinput = (event) => {
    if (event.target.id === "searchbar") {
      setErrorstyle({color: "black"});
      setSearchField(event.target.value);
    }
  }

  // Resets the value in the search field to 'Search
  const resetField = (event) => {
    if (event.target.value === "") {
      setErrorstyle({color: "black"});
      setSearchField("Search");
    }
  }

  // Clears the error message from the field when it is clicked
  const clearField = (event) => {
    if (event.target.value === "'Search Field' field must be filled") {
      setSearchField("");
      setErrorstyle({color: "black"});
    }
    if (event.target.value === "Search") {
      setSearchField("");
      setErrorstyle({color: "black"});
    }
  } 

  // Initializes all the dynamic parts of the website such as user input, styling, and server responses
  let [search_field, setSearchField] = useState("Search");
  let [error_style, setErrorstyle] = useState({
    color: "black"
  });

  const handleSignOut = (event) => {
    console.log("signing out");
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
    signOut(auth).then(() => {
      console.log("Sign-out successful.");

      let form_obj = {};
      form_obj.email = globals.email;
      form_obj.username = globals.username;
      form_obj.see = globals.see;
      form_obj.saw = globals.saw;

      fetch("http://localhost:3001/logout", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_obj)
      }).then((res) => {
          console.log(res);
          // if (res.status === 409) {
          //     setServerdata("Error, code: 409 (conflict): Entry already exists in records");
          // }
          // if (res.status === 503) {
          //     setServerdata("Error, code: 503 (service unavailable): array creation failed");
          // }                
          // if (res.status === 500) {
          //     setServerdata("Error, code: 500 (internal server error): Server could not write or read file");
          // }
          // if (res.status === 205) {
          // }
          return res;
      }).catch(err => {
          console.log(err);
          // setServerdata("Something went wrong!");
          return err;
      });
      document.cookie = JSON.stringify({});
      
      window.open("http://localhost:3000/", "_self");
    }).catch((error) => {
      console.log("An error happened.");
    });
  }
  
  return (
    <div style={fixedWidthStyle} className="navigation_container d-flex menu_z_index">
      {/* This is the menu component that hold the html for the menu*/}
      <Menu />

      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid nav_contents">
          <div className="navbar-nav site_name_container">
            <h1 className="nav-link site_name">See/Saw</h1>
          </div>

          <div className="searchbar_container d-flex">
            <div className="search">
              <input style={error_style} onBlur={resetField} onClick={clearField} onKeyUp={handleFormSubmit} value={search_field} onChange={handleUserinput} type="text" id="searchbar" name="searchbar" className="searchbar" />
            </div>

            <div onClick={handleFormSubmit} id="searchbutton1" className="button d-flex">
              <img src="./search.svg" alt="Search Icon" id="searchbutton2" className="search_icon" />
            </div>
          </div>

          <div className="login_container d-flex">
            <div onClick={handleSignOut} className="sign_out_button d-flex">
              Sign Out
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
  
export default Navbar;
