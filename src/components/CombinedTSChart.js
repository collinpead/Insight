import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const SteamTSChart = ({ steam_route, twitch_route }) => {        
  /*   const date = new Date();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  var past_week = [];

  for (let i = 7; i > 0; i--)
  {
      if (mm < 10 && (dd - i) < 10)
          past_week.push("0".concat((mm.toString()) + "/0" + (dd - i).toString()))
      else if (mm < 10)
          past_week.push("0".concat((mm.toString()) + "/" + (dd - i).toString()))
      else if ((dd - i) < 10)
          past_week.push("".concat((mm.toString()) + "/0" + (dd - i).toString()))
      else
          past_week.push("".concat((mm.toString()) + "/" + (dd - i).toString()))

  } 
  */
  const [options, setOptions] = useState({
    chart: {
      id: "basic-line",
      toolbar: {
          show: false
      }
    },
    xaxis: {
      type: 'datetime',
      categories: [],
      labels: {
          style: {
              colors: '#888888'
          }
      }
    },
    yaxis: {
      labels: {
          style: {
              colors: '#888888'
          }
      }
    },
    legend: {
      labels: {
        colors: '#888888'
      }
    },
    colors: ['#182cde' ,'#7214f7']
  })

  const [series, setSeries] = useState([{
        name: "series-1",
        type: "line",
        data: [],
        colors: ['#9f53e8']
    },
    {
        name: "series-2",
        type: "line",
        data: [],
        colors: ['#9f53e8']
    }
    ])

  /* Establish a connection to the data sent from Express */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const steam_list = []
        const twitch_list = []

        const steam_response = await fetch(steam_route);
        const steam_records = await steam_response.json();

        steam_records.forEach((record) => { 
                                            steam_list.push({x: record.timestamp, y: record.current})
                                          })
        const new_steam_series = { data: steam_list, type: "line", name: "Steam Players", colors: ['#9f53e8'] }

        const twitch_response = await fetch(twitch_route);
        const twitch_records = await twitch_response.json();

        twitch_records.forEach((record) => {
                                            twitch_list.push({x: record.timestamp, y: record.viewers})
                                           })
        const new_twitch_series = { data: twitch_list, type: "line", name: "Twitch Viewers", colors: ['#9f53e8'] }
        
        const newSeries = []
        newSeries.push(new_steam_series)
        newSeries.push(new_twitch_series)
        setSeries(newSeries)
      }
      catch (error) {
        console.log("error", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="Chart bg-gray-800 text-gray-400">
        <Chart
        options={options}
        series={series}
        type="line"
        width="500"
        />

    </div>
  );
};
   
   export default SteamTSChart;