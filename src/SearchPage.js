
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from "firebase/auth";
import {useState} from 'react';
import {useEffect} from 'react';
import GlobalVariables from './GlobalVariables';
import see from './GlobalVariables';
import Navbar from './Navbar';
import './SearchPage.css';

// This acts as a conatainer for the navigation bar
function SearchPage() {
    let globals = JSON.parse(document.cookie);

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

    // HERE ARE SEVERAL CSS STYLING CONSTANTS
    // Sets the pages width to the full screen
    let screen_width = (window.outerWidth - 60) + "px";
    // Sets the pages height to the full screen
    let screen_height = (window.outerHeight - 160) + "px";
    const resultContainerStyle = {
        width: screen_width,
        height: screen_height,
        marginTop: "30px",
        flexDirection: "row",
        justifyContent: "center"
    };

    const imageStyle = {
        width: "60%",
        flexDirection: "row",
        justifyContent: "center",
    };

    const result_centering = {
        width: "40%",
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft: "11.3%"
    };

    const title_centering = {
        width: "60%",
        // backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "center"
    };

    // Sends user to a new page with the info of the movie the user clicked on
    const getInfo = (event) => {
        window.open("/InfoPage#" + event.target.id,"_self");
    };

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

        if (index_found === -1) {
            let url_split_index = event.target.id.indexOf(":", id_split_index + 1);
            let last_index = globals.see.length - 1;
            let movie_obj = {};
            movie_obj.movie_id = event.target.id.substring(0, id_split_index);
            movie_obj.movie_title = event.target.id.substring(id_split_index + 1, url_split_index);
            movie_obj.poster_url = event.target.id.substring(url_split_index + 1);
            // console.log(event.target.id.substring(0, id_split_index));
            // console.log(event.target.id.substring(id_split_index + 1, url_split_index));
            // console.log(event.target.id.substring(url_split_index + 1));
            globals.see.push(movie_obj);
            document.cookie = JSON.stringify(globals);
            event.target.innerHTML = "SEE -";
            // console.log(globals.see);
        }
        else {
            let shift_index = index_found;
            let last_index = globals.see.length - 1;
            globals.see[shift_index] = globals.see[last_index];
            let throw_away = globals.see.pop();
            document.cookie = JSON.stringify(globals);
            event.target.innerHTML = "SEE +";
            // console.log(globals.see);
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

        if (index_found === -1) {
            let url_split_index = event.target.id.indexOf(":", id_split_index + 1);
            let last_index = globals.saw.length - 1;
            let movie_obj = {};
            movie_obj.movie_id = event.target.id.substring(0, id_split_index);
            movie_obj.movie_title = event.target.id.substring(id_split_index + 1, url_split_index);
            movie_obj.poster_url = event.target.id.substring(url_split_index + 1);
            // console.log(event.target.id.substring(0, id_split_index));
            // console.log(event.target.id.substring(id_split_index + 1, url_split_index));
            // console.log(event.target.id.substring(url_split_index + 1));
            globals.saw.push(movie_obj);
            document.cookie = JSON.stringify(globals);
            event.target.innerHTML = "SAW -";
            // console.log(globals.saw);
        }
        else {
            let shift_index = index_found;
            let last_index = globals.saw.length - 1;
            globals.saw[shift_index] = globals.saw[last_index];
            let throw_away = globals.saw.pop();
            document.cookie = JSON.stringify(globals);
            event.target.innerHTML = "SAW +";
            // console.log(globals.saw);
        }
        console.log(globals.saw);
    };

    // Puts the response from the server's API call into divs and displays it to the user
    function addContainers (obj) {
        // formats the search result for it to be displayed
        return (
            <div>
                <div style={title_centering} className="d-flex">{obj.title}</div>
                <img id={obj.id} onClick={getInfo} style={imageStyle} className="d-flex interaction" src={obj.image} alt="Movie Poster" />
                <div className="button_container d-flex">
                    <div id={obj.id + ":" + obj.title + ":" + obj.image} onClick={updateSeeList} className="see_container d-flex" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Movie to see">
                        SEE {obj.see}
                    </div>

                    <div id={obj.id + ":" + obj.title + ":" + obj.image} onClick={updateSawList} className="saw_container d-flex" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Movie you saw">
                        SAW {obj.saw}
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }  

    // let [response]
    let [search_result, setSearchPage] = useState(null);
    const url = window.location.href;
    let search_url = url
    search_url = search_url.replace(/%20/g, " ");
    search_url = search_url.replace("3000", "3001");
    search_url = search_url.replace("SearchPage", "search");

    //Runs only on the first render
    useEffect(() => {
        fetch(search_url, {
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
            }).then((movies) => {
                // console.log(movies.results);
                if (movies.results != null)
                {
                    console.log(globals.see);
                    console.log(globals.saw);

                    for (let i = 0; i < movies.results.length; i++) {
                        let see_match = -1;
                        let saw_match = -1;
                        
                        for (let j = 0; j < globals.see.length; j++) {
                            if (globals.see[j].movie_id === movies.results[i].id) {
                                see_match = 1;
                            }
                        }
                        for (let k = 0; k < globals.saw.length; k++) {
                            if (globals.saw[k].movie_id === movies.results[i].id) {
                                saw_match = 1;
                            }
                        }                       
                        if (see_match === -1) {
                            movies.results[i].see = "+";
                        }
                        else {
                            movies.results[i].see = "-";
                        }
                        if (saw_match === -1) {
                            movies.results[i].saw = "+";
                        }
                        else {
                            movies.results[i].saw = "-";
                        }    
                    }
                    // console.log(movies.results); 
                    setSearchPage(movies.results.map(addContainers));
                }
                else {
                    setSearchPage((<div>404: Title not found</div>));
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
            <div className="results d-flex">
                <div style={resultContainerStyle} className="results d-flex">
                    <div style={result_centering} className="d-flex">
                        {search_result && <div>{search_result}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default SearchPage;
