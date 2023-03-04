import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SteamPage from './pages/SteamPage';
import TwitchPage from './pages/TwitchPage';
import GamePage from './pages/GamePage';

/* On launch start with npm start AND npm run start-server. */
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/steam" element={<SteamPage/>}/>
        <Route path="/twitch" element={<TwitchPage/>}/>
        <Route path="/game/:gameName/:time" element={<GamePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
