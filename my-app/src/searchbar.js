import React, { useState } from 'react';

function Searchbar({setPokemon_search, Pokemon_search, getPokemonData}) {
  return (
    <div className="App">
       
        <input onChange = {(e) => setPokemon_search(e.target.value)}/>
        <p>{Pokemon_search}</p>
        <button onClick={() => getPokemonData()}>SEARCH BUTT</button>
        <button onClick={() => getPokemonData(true)}>SURPRISE BUTTS</button>


    </div>
    
  );
}

export default Searchbar;