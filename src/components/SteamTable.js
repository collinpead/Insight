import React, { Component } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import '../App.css';

class SteamTable extends Component {

  constructor(props){
    super(props);
    this.state = {
        records: []
    }
  }
  
  route = this.props.route
  componentDidMount() {
    fetch(this.route)
    .then(res => res.json())
    .then(records => {
        this.setState({ records: records });
    });
  }
  
  columns = [
    { label: "Name", accessor: "name" },
    { label: "Current", accessor: "current" },
    { label: "Peak", accessor: "peak" },
  ];

  render() {
    return (
      /* Proper border spacing is important for good looking tables */
      <table className="Table border-spacing-x-2.5 border-spacing-y-1 bg-gray-800 text-white rounded shadow-md">
          <TableHead columns={this.columns} /> 
          <TableBody columns={this.columns} tableData={this.state.records}/>
        {this.props.type[0] === 'unexpanded' ?
        <tfoot key="tfoot" className="text-purple-500 text-center">
          <a href={`/${this.props.type[1]}`}> View More </a>
        </tfoot> :
        <tfoot key="tfoot"></tfoot>
        }
      </table>
    )}};

export default SteamTable;