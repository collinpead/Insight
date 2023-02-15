import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const SteamTSChart = ({ route }) => {        

  const date = new Date();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  var past_week = [];

  /* Date label formatter */
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

  const [options, setOptions] = useState({
    chart: {
      id: "basic-line",
      toolbar: {
          show: false
      }
    },
    xaxis: {
      categories: past_week,
      labels: {
          style: {
              colors: Array(past_week.length).fill('#888888')
          }
      }
    },
    yaxis: {
      labels: {
          style: {
              colors: ['#888888']
          }
      }
    },
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
        const response = await fetch(route);
        const records = await response.json();
        records.forEach((record) => { list.push(record.viewers) })
        newSeries.push({ data: list, name: "series-2"})
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