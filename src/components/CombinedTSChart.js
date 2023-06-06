import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import config from '../config.json';

const CombinedTSChart = ({ steam_route, twitch_route }) => {        
  
  const [options] = useState({
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

        const steam_uri = 'http://' + config.server.ip + ":" + config.server.port + this.props.route
        const steam_response = await fetch(steam_uri);
        const steam_records = await steam_response.json();
        let index = 0;
        let sum = 0;
        let hoursInWeek = 168;

        /* Switch from hourly to daily cumulative average when plotting 30 day or 90 day charts */
        if (steam_records.length > hoursInWeek) {
          steam_records.forEach((record) => { 
            sum += record.current;
            if (index % 24 === 23) {
              steam_list.push({x: record.timestamp, y: Math.floor(sum / 24)});
              sum = 0;
            }
            index++;
          })
        }
        else {
          steam_records.forEach((record) => { 
            steam_list.push({x: record.timestamp, y: record.current});
          })
        }
        const new_steam_series = { data: steam_list, type: "line", name: "Steam Players", colors: ['#9f53e8'] };

        const twitch_uri = 'http://' + config.server.ip + ":" + config.server.port + this.props.route;
        const twitch_response = await fetch(twitch_uri);
        const twitch_records = await twitch_response.json();
        index = 0;
        sum = 0;


        if (twitch_records.length > hoursInWeek) {
          twitch_records.forEach((record) => { 
            sum += record.viewers;
            if (index % 24 === 23) {
              twitch_list.push({x: record.timestamp, y: Math.floor(sum / 24)});
              sum = 0;
            }
            index++;
          })
        }
        else {
          twitch_records.forEach((record) => { 
            twitch_list.push({x: record.timestamp, y: record.viewers});
          })
        }
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
   
export default CombinedTSChart;
   