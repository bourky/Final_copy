
// Import statements allow the use of assets from modules
// such as components (functions containing html), members 
// of objects in modules, and stylesheets
import {BrowserRouter} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';
import HomePage from './HomePage';
import MediaPage from './MediaPage';
import FriendListPage from './FriendListPage';
import GamePage from './GamePage';
import SettingsPage from './SettingsPage';
import ListsPage from './ListsPage';
import SearchPage from './SearchPage';
import FriendActivityPage from './FriendActivityPage';
import InfoPage from './InfoPage';
import LogInPage from './LogInPage';
import './App.css';

// This is the main component that holds the website
// Creating the navigation
function App() {
  return (
    //The browser router container hold the routes that allow
    //linking to pages within the website
    <BrowserRouter>
      <Routes>
        <Route index exact path="/" element={<HomePage />} />
        <Route path="/MediaPage" element={<MediaPage />} />
        <Route path="/FriendListPage" element={<FriendListPage />} />
        <Route path="/FriendActivityPage" element={<FriendActivityPage />} />
        <Route path="/GamePage" element={<GamePage />} />
        <Route path="/SettingsPage" element={<SettingsPage />} />
        <Route path="/ListsPage" element={<ListsPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/InfoPage" element={<InfoPage />} />
        <Route path="/LogInPage" element={<LogInPage />} />
      </Routes>
    </BrowserRouter>  
  );
}

// Allows for the code in the file to be used accross files
export default App;
