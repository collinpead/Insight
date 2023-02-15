import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SteamTSChart from '../components/SteamTSChart';
import TwitchTSChart from '../components/TwitchTSChart';
import '../App.css';

/* On launch start with npm start AND npm run start-server. */
function App() {
let params = useParams()
let game_route = "/game/".concat(params.gameName)
let twitch_route = "/twitch/".concat(params.gameName)
  return (
    /* Determines the background color of the whole page*/
    <div className='bg-gray-400'>
      <Navbar></Navbar>
      <main className='text-center h-full'>
          <div className='text-gray-800 text-lg font-bold'>
              <h1 className='text-3xl'> {params.gameName} </h1>
            <row className='Row'>
              <h2 className='ChartLabels text-2xl'> Steam Players </h2>
              <h3 className='ChartLabels text-2xl'> Twitch Viewers </h3>
            </row>
            <row className='Row'>
              <SteamTSChart route={game_route}/>
              <TwitchTSChart route={twitch_route}/>
            </row>
            
            <row className='Row'>
              <h3 className='ChartLabels text-2xl'> Combined </h3>
            </row>
            <row className='Row'>
              <SteamTSChart route={game_route}/>
            </row>
          </div>
      </main>
      <footer className='Footer bg-gray-800 text-2xl font-bold text-gray-400'>
        © 2022
      </footer>
    </div>
  );
}

export default App;
