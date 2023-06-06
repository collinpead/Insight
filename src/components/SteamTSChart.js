import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import config from '../config.json'

const SteamTSChart = ({ route }) => {        

  const [options] = useState({
    chart: {
      id: "basic-line",
      toolbar: {
          show: false
      }
    },
    xaxis: {
      type: 'datetime',
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
    /* Color of the line on the chart. */
    colors: ['#182cde']
  })

  const [series, setSeries] = useState([{
      name: "series-1",
      data: []
  }])

  /* Establish a connection to the data sent from Express */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = []
        const newSeries = []
        
        const uri = 'http://' + config.server.ip + ":" + config.server.port + this.props.route
        const response = await fetch(uri);
        const records = await response.json();
        let index = 0;
        let sum = 0;

        if (records.length > 200) {
          records.forEach((record) => { 
            sum += record.current;
            if (index % 24 === 23) {
              list.push({x: record.timestamp, y: Math.floor(sum / 24)});
              sum = 0;
            }
            index++;
          })
        }
        else {
          records.forEach((record) => { 
            list.push({x: record.timestamp, y: record.current});
          })
        }
        newSeries.push({ data: list, name: "Steam Players"})
        
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
   