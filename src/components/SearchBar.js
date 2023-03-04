import React, { useState, useEffect } from "react";
import '../App.css'

const SearchBar = ({ setResults, showSearch }) => {

    const [games, setGames] = useState([])

    /* Establish a connection to the data sent from Express */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = []
                const route = '/games'

                const response = await fetch(route);
                const records = await response.json();

                records.forEach((record) => {
                                                list.push({name: record.name})
                                            })
                setGames(list)
            }
            catch (error) {
                console.log("error", error);
            }
    };

    fetchData();
    }, []);

    const handleChange = (event) => {
        const searchValue = event.target.value;
        const newFilter = games.filter((value) => {
            return value.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        if (searchValue.length > 0)
            setResults(newFilter);
        else
            setResults([])
    };

    return (
        (showSearch ?
            <div className="GameSearch flex md:flex-grow justify-end" style={{position: "relative"}}>
                <input type="text" id="header-search" placeholder="Search games..." onChange={handleChange} className="Search bg-gray-100 text-gray-800 text-2xl"></input>
            </div>
        :
        <div></div>
        )
    );
};

export default SearchBar;