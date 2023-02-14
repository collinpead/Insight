import React, { Component } from "react";
import Chart from "react-apexcharts";

class TimeSeriesChart extends Component {

    constructor(props) {
        super(props);

        this.UpdateChart = this.UpdateChart.bind(this);

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

        this.state = {
        records: [],
        options: {
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
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70]
          }
        ],
      };
    }
    /* Establish a connection to the data sent from Express */
    route = this.props.route
    componentDidMount() {
        fetch(this.route)
        .then(res => res.json())
        .then(records => {
            this.setState({ records: records })
        })
    }

    /* Update the chart with data received from Express */
    UpdateChart() {
        const newData = []
        const newSeries = []

        this.state.records.forEach((record) => {
            newData.push(record.current)
        })
        newSeries.push({ data: newData, name: 'series-2'})
    
        this.setState({
            series: newSeries
        })
    }

    /*  */
    render() {
      return (
        <div className="Chart bg-gray-800 text-gray-400">
            <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            width="500"
            />
        <button onClick={this.UpdateChart}>Update!</button>
        </div>
      );
    }
  }
   
   export default TimeSeriesChart;