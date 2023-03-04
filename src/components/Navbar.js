import React, { Component } from "react";
import '../App.css';
import SearchBar from "./SearchBar";

const Navbar = ({ setResults , showSearch}) => {
        return(
            <div>
                <nav className='Nav bg-gray-800 text-4xl font-bold'>
                    <h1 className='Logo fa-solid fa-chart-simple text-purple-500' style={{position: "relative"}}></h1>
                    <a href="/" className="text-gray-400" style={{position: "relative"}}>
                        StreamInsight
                    </a>
                    <SearchBar setResults={setResults} showSearch={showSearch} className="SearchBox"/>
                </nav>
            </div>
        );
    };
  
  export default Navbar;
  