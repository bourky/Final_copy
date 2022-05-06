
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { onAuthStateChange } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {  getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {useState} from 'react';
import {useEffect} from 'react';
import './LogInPage.css';


// This acts as a conatainer for the homepage
function LogInPage() {
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
    //   backgroundColor: "blue",
    };

    const authenticate = (event) => {
      console.log("test")
    }
  
    const changeAction = (event) => {
        if (event.target.id == "sign_up") {
            setSid("sign_in");
            setInUpButton("Sign up");
            setSignInUp("Sign in");
            setHideIt({
                visibility: "hidden"
            });
            clearField();
        }
        else {
            setSid("sign_up");
            setInUpButton("Sign in");
            setSignInUp("Sign up");   
            setHideIt({
                visibility: ""
            });
        }
    }

    const submitUser = (event) => {
        console.log(username_input);
        console.log(event.target.id);
        if (username_input === "" && event.target.id === "sign_up") {
            setUsernameInput("Please enter a username");
            setErrorStyle({
                color: "red"
            });
        }
        else if (username_input != "") {
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
            const provider = new GoogleAuthProvider();
            
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                let new_user = {
                    email: user.email,
                    username: username_input,
                    see: [],
                    saw: []
                };
                let obj_string = JSON.stringify(new_user);
                
                document.cookie = obj_string;

                console.log(JSON.parse(document.cookie));

                fetch("http://localhost:3001/new_user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: obj_string
                }).then((res) => {
                    console.log(res);
                    if (res.status === 409) {
                        setErrorStyle2({
                            color: "red"
                        });
                        setResponseMessage("Error, code: 409 (conflict): Account already exists");

                        signOut(auth).then(() => {
                            console.log("Sign-out successful.");
                          }).catch((error) => {
                            console.log("An error happened.");
                        });
                    }
                    if (res.status === 503) {
                        setErrorStyle2({
                            color: "red"
                        });
                        setResponseMessage("Error, code: 503 (service unavailable): array creation failed");

                        signOut(auth).then(() => {
                            console.log("Sign-out successful.");
                          }).catch((error) => {
                            console.log("An error happened.");
                        });
                    }                
                    if (res.status === 500) {
                        setErrorStyle2({
                            color: "red"
                        });
                        setResponseMessage("Error, code: 500 (internal server error): Server could not write or read file");

                        signOut(auth).then(() => {
                            console.log("Sign-out successful.");
                          }).catch((error) => {
                            console.log("An error happened.");
                        });
                    }
                    if (res.status === 201) {
                        setErrorStyle2({
                            color: "green"
                        });
                        setResponseMessage("Success, code: 201 (created): Account successfully created");

                        window.open("http://localhost:3000/MediaPage", "_self");
                    }
                    return res;
                }).catch(err => {
                    console.log(err);
                    setErrorStyle2({
                        color: "green"
                    });
                    setResponseMessage("Something went wrong!");
                    return err;
                });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        }
        else {
            console.log("else");
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
            const provider = new GoogleAuthProvider();
            
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(user.email);

                fetch("http://localhost:3001/login?email=" + user.email, {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json'
                    }
                    }).then((res) => {
                        console.log(res);
                        if (res.status === 503) {
                            setErrorStyle2({
                                color: "red"
                            });
                            setResponseMessage("Error, code: 503 (service unavailable): array creation failed");

                            signOut(auth).then(() => {
                                console.log("Sign-out successful.");
                              }).catch((error) => {
                                console.log("An error happened.");
                            });
                        }                
                        if (res.status === 500) {
                            setErrorStyle2({
                                color: "red"
                            });
                            setResponseMessage("Error, code: 500 (internal server error): Server could not write or read file");

                            signOut(auth).then(() => {
                                console.log("Sign-out successful.");
                              }).catch((error) => {
                                console.log("An error happened.");
                            });
                        }
                        if (res.status === 404) {
                            setErrorStyle2({
                                color: "red"
                            });
                            setResponseMessage("No account registered under this email, please use the 'Sign up' option.");

                            signOut(auth).then(() => {
                                console.log("Sign-out successful.");
                              }).catch((error) => {
                                console.log("An error happened.");
                            });
                        }
                        if (res.status === 202) {
                            setErrorStyle2({
                                color: "green"
                            });
                            setResponseMessage("Logging in successfully.");
                        }
                        return res.json();
                    }).then((global_variables) => {

                        console.log(global_variables);

                        // console.log(global_variables.records_arr === undefined);

                        if (!(global_variables.records_arr === undefined)) {
                            // console.log(global_variables.records_arr[0].email);
                            // console.log(global_variables.records_arr[0].username);
                            // console.log(global_variables.records_arr[0].see);
                            // console.log(global_variables.records_arr[0].saw);
                            let new_user = {
                                email: global_variables.records_arr[0].email,
                                username: global_variables.records_arr[0].username,
                                see: global_variables.records_arr[0].see,
                                saw: global_variables.records_arr[0].saw
                            };
                            let obj_string = JSON.stringify(new_user);
                            
                            document.cookie = obj_string;
            
                            console.log(JSON.parse(document.cookie));

                            window.open("http://localhost:3000/MediaPage", "_self");
                        }
    
                    }).catch(err => {
                        console.log(err);
                        setErrorStyle2({
                            color: "green"
                        });
                        setResponseMessage("Something went wrong!");
                        return err;
                    });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        }
    }

    let [hideIt, setHideIt] = useState({
        visibility: ""
    });
    let [error_style, setErrorStyle] = useState({
        color: "black"
    });
    let [error_style2, setErrorStyle2] = useState({
        color: "black"
    });    
    let [sign_in_up, setSignInUp] = useState("Sign up");
    let [in_up_button, setInUpButton] = useState("Sign in");
    let [sid, setSid] = useState("sign_up");
    let [username_input, setUsernameInput] = useState("");
    let [password_input, setPasswordInput] = useState("");
    let [response_message, setResponseMessage] = useState("");

    const handleUserinput = (event) => {
        if (event.target.id === "user") {
            setUsernameInput(event.target.value);
        }
        else {
            setPasswordInput(event.target.value);
        }
    }

    const clearField = (event) => {
        setUsernameInput("");
        setErrorStyle({
            color: "black"
        });
    }

    return (
        <div style={resultContainerStyle} className="d-flex log_form2">
          {/* {sign_in_up && <div>{sign_in_up}</div>} */}
            <div className="d-flex form_container2">
                <div className="d-flex form_centering2">
                    <div className="d-flex sform2">
                        <div className="d-flex form_label_container2">
                            {sign_in_up}
                        </div>

                        <div style={hideIt} className="d-flex username_label_container2">
                            Username
                        </div>

                        <div onClick={clearField} style={hideIt} className="d-flex username_field_container2">
                            <input id="user" onChange={handleUserinput} value={username_input} style={error_style} type="text" className="d-flex username_field2" />
                        </div>

                        <div className="d-flex button_container2">
                            <div id={sid} onClick={submitUser} className="d-flex iubutton2">
                                Enter
                            </div>

                            <div id={sid} onClick={changeAction} className="d-flex iubutton2">
                                {in_up_button}
                            </div>
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
  
  export default LogInPage;