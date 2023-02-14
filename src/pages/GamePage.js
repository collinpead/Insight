import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TimeSeriesChart from '../components/TimeseriesChart';
import '../App.css';

/* On launch start with npm start AND npm run start-server. */
function App() {
let params = useParams()
let game_route = "/game/".concat(params.gameName)
  return (
    /* Determines the background color of the whole page*/
    <div>
      <Navbar></Navbar>
      <main className='text-center bg-gray-400 h-full'>
          <div className='text-gray-800 text-lg font-bold'>
            <h1> {params.gameName} </h1>
            <h2> Steam Players </h2>
            <TimeSeriesChart route={game_route}/>
            <h3> Twitch Viewers </h3>
            <TimeSeriesChart route={game_route}/>
            <h3> Combined </h3>
            <TimeSeriesChart route={game_route}/>
          </div>
      </main>
      <footer className='Footer bg-gray-800 text-2xl font-bold text-gray-400'>
        © 2022
      </footer>
    </div>
  );
}

export default App;
