import Navbar from '../components/Navbar';
import TwitchTable from '../components/TwitchTable';
import SteamTable from '../components/SteamTable';

/* On launch start with npm start AND npm run start-server. */
function Home() {
  return (
    /* Determines the background color of the whole page*/
    <div>
      <Navbar></Navbar>
      <main className='text-center bg-gray-400 h-full'>
          <h1 className='text-gray-800 text-lg font-bold'>Top Steam Games</h1>
          <div className='flex justify-center'>
            <SteamTable route={'/steam/10'} type={['unexpanded', 'steam']}></SteamTable>
          </div>
        <h2 className='text-gray-800 text-lg font-bold'>Top Streamed Games</h2>
        <h3 className='text-gray-800 text-sm font-bold'> (available on Steam)</h3>
        <div className='flex justify-center'>
          <TwitchTable route={'/twitch/10'} type={['unexpanded', 'twitch']}></TwitchTable>
        </div>
      </main>
      <footer className='Footer bg-gray-800 text-2xl font-bold text-gray-400'>
        © 2022
      </footer>
    </div>
  );
}

export default Home;