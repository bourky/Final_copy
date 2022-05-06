
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from "firebase/auth";
import {useEffect} from 'react';
import Navbar from './Navbar';
import './FriendActivityPage.css';

// This acts as a conatainer for the navigation bar
function FriendActivityPage() {
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

  // Sets the pages height to the full screen
  let screen_width = window.outerWidth + "px";
  const fixedWidthStyle = {
    width: screen_width,
  };
  
  return (
    <div style={fixedWidthStyle}>
      <Navbar />
      Test FriendActivity
    </div>
  );
}
  
export default FriendActivityPage;
