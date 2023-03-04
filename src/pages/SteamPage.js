import React, { useState } from "react";
import Navbar from '../components/Navbar';
import SteamTable from '../components/SteamTable';
import SearchResults from '../components/SearchResults';

/* On launch start with npm start AND npm run start-server. */
function SteamPage() {
  const [results, setResults] = useState([]);

  return (
    /* Determines the background color of the whole page*/
    <div>
      <Navbar setResults={setResults} showSearch={true}></Navbar>
      <SearchResults results={results}></SearchResults>
      <main className='text-center bg-gray-400 h-full'>
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

export default SteamPage;
