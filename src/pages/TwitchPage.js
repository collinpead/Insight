import Navbar from '../components/Navbar';
import TwitchTable from '../components/TwitchTable';

/* On launch start with npm start AND npm run start-server. */
function App() {
  return (
    /* Determines the background color of the whole page*/
    <div>
      <Navbar></Navbar>
      <main className='text-center bg-gray-400 h-full'>
          <h1 className='text-gray-800 font-bold'>Top Streamed Games</h1>
          <h2 className='text-gray-800 text-sm font-bold'> (available on Steam)</h2>
          <div className='flex justify-center'>
            <TwitchTable route='/twitch/100' type={['expanded', 'twitch']}></TwitchTable>
          </div>
      </main>
      <footer className='Footer bg-gray-800 text-2xl font-bold text-gray-400'>
        © 2022
      </footer>
    </div>
  );
}

export default App;
