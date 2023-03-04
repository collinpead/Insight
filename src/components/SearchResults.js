import React, { useState } from "react";
import '../App.css'
import './SearchResults.css'

const SearchBar = ({ results }) => {
    return (
        <div className="mr-10 mt-1">
            <ul className="ResultsList flex md:flex-grow justify-end p-2">
                { results.map((game, key) => {
                   return (
                    <a href={"/game/".concat(game.name).concat("/7/")}>
                        <li className="ResultItem bg-gray-800 text-gray-400 p-2 mb-1"> 
                            {game.name}
                        </li>
                    </a>
                )})}
            </ul>
        </div>
    );
};

export default SearchBar;