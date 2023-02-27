import { useParams } from 'react-router-dom';
import { useState } from 'react'
import Navbar from '../components/Navbar';
import SteamTSChart from '../components/SteamTSChart';
import TwitchTSChart from '../components/TwitchTSChart';
import CombinedTSChart from '../components/CombinedTSChart';
import '../App.css';

function App() {
  const params = useParams()
  const game_route = "/game/".concat(params.gameName).concat("/").concat(params.time)
  const twitch_route = "/twitch/".concat(params.gameName).concat("/").concat(params.time)

  console.log(game_route)

  const [activeButton, setActiveButton] = useState(process_time(params.time))

  /* Returns the appropriate time index for the active button state. Default to 7D. */
  function process_time(time) {
    if(time === '1')
      return 0
    else if (time === '3')
      return 1
    else if (time === '30')
      return 3
    else if (time === '90')
      return 4
    else
      return 2
  }

  function Btn1() {
    setActiveButton(0)
    window.history.replaceState(null, "React App", `/game/${params.gameName}/1/`)
    window.location.reload(false)
  }

  function Btn2() {
    setActiveButton(1)
    window.history.replaceState(null, "React App", `/game/${params.gameName}/3/`)
    window.location.reload(false)
  }

  function Btn3() {
    setActiveButton(2)
    window.history.replaceState(null, "React App", `/game/${params.gameName}/7/`)
    window.location.reload(false)
  }

  function Btn4() {
    setActiveButton(3)
    window.history.replaceState(null, "React App", `/game/${params.gameName}/30/`)
    window.location.reload(false)
  }

  function Btn5() {
    setActiveButton(4)
    window.history.replaceState(null, "React App", `/game/${params.gameName}/90/`)
    window.location.reload(false)
  }

  return (
    /* Determines the background color of the whole page*/
    <div className='bg-gray-400'>
      <Navbar></Navbar>
      <main className='text-center h-full'>
          <div className='text-gray-800 text-lg font-bold'>
            <h1 className='text-3xl'> {params.gameName} </h1>
            <row className='Row'>
              <button className={`Button text-gray-400 rounded ${!(activeButton === 0) ? 'bg-gray-800' : 'bg-purple-800 text-white'}`}
               onClick={ () => Btn1()}>
                1D
              </button>
              <button className={`Button text-gray-400 rounded ${!(activeButton === 1) ? 'bg-gray-800' : 'bg-purple-800 text-white'}`}
               onClick={ () => Btn2()}>
                3D
              </button>
              <button className={`Button text-gray-400 rounded ${!(activeButton === 2) ? 'bg-gray-800' : 'bg-purple-800 text-white'}`}
               onClick={ () => Btn3()}>
                7D
              </button>
              <button className={`Button text-gray-400 rounded ${!(activeButton === 3) ? 'bg-gray-800' : 'bg-purple-800 text-white'}`}
               onClick={ () => Btn4()}>
                30D
              </button>
              <button className={`Button text-gray-400 rounded ${!(activeButton === 4) ? 'bg-gray-800' : 'bg-purple-800 text-white'}`}
               onClick={ () => Btn5()}>
                90D
              </button>
            </row>
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
              <CombinedTSChart steam_route={game_route} twitch_route={twitch_route}/>
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
