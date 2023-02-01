import Navbar from '../components/Navbar';
import SteamTable from '../components/SteamTable';

/* On launch start with npm start AND npm run start-server. */
function App() {
  return (
    /* Determines the background color of the whole page*/
    <div className='text-center bg-gray-400 h-full'>
      <Navbar></Navbar>
      <main className=''>
          <h1 className='text-gray-800 font-bold'>Top Steam Games</h1>
          <div className='flex justify-center'>
            <SteamTable route='/steam/100' type={['expanded', 'steam']}></SteamTable>
          </div>
      </main>
      <footer className='Footer bg-gray-800 text-2xl font-bold text-gray-400'>
        © 2022
      </footer>
    </div>
  );
}

export default App;
