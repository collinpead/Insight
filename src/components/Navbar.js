import React, { Component } from "react";
import '../App.css';

class Navbar extends Component {
    render() {
        return(
            <nav className='Nav bg-gray-800 text-4xl font-bold text-gray-400'>
                <h1 className='Logo fa-solid fa-chart-simple text-purple-500'></h1>
                <a href="/">
                    StreamInsight
                </a>
            </nav>
        )
    }
  }
  
  export default Navbar;
  