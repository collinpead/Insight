import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

/* On launch start with npm start AND npm run start-server. */
function App() {
let params = useParams()
  return (
    /* Determines the background color of the whole page*/
    <div>
      <Navbar></Navbar>
      <main className='text-center bg-gray-400 h-full'>
          <div className='text-gray-800 text-lg font-bold'>
            <h1> Pending Game Info...</h1>
            <h2> {params.gameName} </h2>
          </div>
      </main>
      <footer className='Footer bg-gray-800 text-2xl font-bold text-gray-400'>
        © 2022
      </footer>
    </div>
  );
}

export default App;
