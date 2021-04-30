import React, { useState } from 'react';

function Searchbar() {
  const [Pokemon_search, setPokemon_search] = useState('butt');
  return (
    <div className="App">
       
        <input onChange = {(e) => setPokemon_search(e.target.value)}/>
        <p>{Pokemon_search}</p>
    </div>
  );
}

export default Searchbar;