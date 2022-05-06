
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import {Link} from 'react-router-dom';
import {useState} from 'react';
import './Menu.css';

// This acts as a conatainer for the navigation bar
function Menu() {
  let globals = JSON.parse(document.cookie);
  let [username, setUsername] = useState(globals.username);

  return (
    <div>
      <button className="menu_container btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu">
        <img src="./menu-outline.svg" alt="Menu Icon" className="menu_icon" />
      </button>

      <div className="offcanvas offcanvas-start canvas_container" id="menu">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title overflow_style">{username}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <Link to="/MediaPage" className="nav-link">Media Page</Link>

          <Link to="/FriendListPage" className="nav-link">Friends List</Link>

          <Link to="/GamePage" className="nav-link">Game</Link>

          <Link to="/SettingsPage" className="nav-link">Settings</Link>

          <Link to="/ListsPage" className="nav-link">Lists</Link>

          <div>
            *Light Mode/Dark Mode*
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Menu;
