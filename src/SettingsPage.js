
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signOut } from "firebase/auth";
import {useState} from 'react';
import {useEffect} from 'react';
import Navbar from './Navbar';
import './SettingsPage.css';

// This acts as a conatainer for the navigation bar
function SettingsPage() {
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
  //   backgroundColor: "blue",
  };

  const submitUser = (event) => {
    if (username_input === "") {
      setUsernameInput("Please enter a username");
      setErrorStyle({
        color: "red"
      });
    }
    else {
      console.log(username_input);
      let form_obj = {};
      form_obj.email = globals.email;
      form_obj.username = globals.username;
      form_obj.see = globals.see;
      form_obj.saw = globals.saw;
      form_obj.new_username = username_input;
      fetch("http://localhost:3001/username", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_obj)
      }).then((res) => {
        console.log(res);
        if (res.status === 409) {
          setResponseMessage("Error, code: 409 (conflict): Username already exists.");
          setErrorStyle2({
            color: "red"
          });
        }
        if (res.status === 503) {
          setResponseMessage("Error, code: 503 (service unavailable): array creation failed.");
          setErrorStyle2({
            color: "red"
          });
        }                
        if (res.status === 500) {
          setResponseMessage("Error, code: 500 (internal server error): Server could not write or read file.");
          setErrorStyle2({
            color: "red"
          });
        }
        if (res.status === 205) {
          setResponseMessage("Success, code: 205 (reset content): Username changed.");
          setErrorStyle2({
            color: "green"
          });

          console.log(globals);

          globals.username = username_input;
          document.cookie = JSON.stringify(globals);

          console.log(globals);
          console.log(JSON.parse(document.cookie));
        }
        return res;
      }).catch(err => {
        console.log(err);
        setResponseMessage("Something went wrong!");
        setErrorStyle2({
          color: "red"
        });
        return err;
      });
    }
  }

  const handleDelete = (event) => {
    let form_obj = {};
    form_obj.email = globals.email;
    form_obj.username = globals.username;
    form_obj.see = globals.see;
    form_obj.saw = globals.saw;

    fetch("http://localhost:3001/remove_user", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form_obj)
    }).then((res) => {
      console.log(res);
      if (res.status === 503) {
        setErrorStyle2({
          color: "red"
        });
        setResponseMessage("Error, code: 503 (service unavailable): array creation failed");
      }                
      if (res.status === 500) {
        setErrorStyle2({
          color: "red"
        });
        setResponseMessage("Error, code: 500 (internal server error): Server could not write or read file");
      }
      if (res.status === 204) {
        setErrorStyle2({
          color: "green"
        });
        setResponseMessage("Success, code: 204 (no content): Entry deleted in records");

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
          document.cookie = JSON.stringify({});

          console.log("Sign-out successful.");
        
          window.open("http://localhost:3000/", "_self");
        }).catch((error) => {
          console.log("An error happened.");
        });

      }
      return res;
    }).catch(err => {
      console.log(err);
      setResponseMessage("Something went wrong!");
      return err;
    });

  }

  let [error_style, setErrorStyle] = useState({
      color: "black"
  });
  let [error_style2, setErrorStyle2] = useState({
    color: "black"
  });
  let [username_input, setUsernameInput] = useState("");
  let [response_message, setResponseMessage] = useState("");

  const handleUserinput = (event) => {
    if (event.target.id === "user") {
      setUsernameInput(event.target.value);
    }
  }

  const clearField = (event) => {
      setUsernameInput("");
      setErrorStyle({
          color: "black"
      });
  }

  return (
    <div style={resultContainerStyle} className="d-flex log_form3">
      <Navbar />

      <div className="d-flex form_container3">
        <div className="d-flex form_centering3">
          <div className="d-flex sform3">
            <div className="d-flex form_label_container3">
                Change Username
            </div>

            <div className="d-flex username_label_container3">
                Username
            </div>

            <div onClick={clearField} className="d-flex username_field_container3">
                <input id="user" onChange={handleUserinput} value={username_input} style={error_style} type="text" className="d-flex username_field3" />
            </div>

            <div className="d-flex button_container3">
              <div id="change_username" onClick={submitUser} className="d-flex iubutton3">
                Enter
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex delete_container">
          <div className="d-flex delete_button">
            <div onClick={handleDelete} className="d-flex dbutton">
              Delete Account
            </div>
          </div>
        </div>

        <div className="d-flex response_container">
          {response_message && <div style={error_style2}>{response_message}</div>}
        </div>
      </div>
    </div>
  );
}
  
export default SettingsPage;
