import logo from './logo.svg';
import './App.css';
import Searchbar from './searchbar';
import { useState } from "react";


function App() {
  const [Pokemon_search, setPokemon_search] = useState('butt');
  const [pokemonData, setPokemonData] = useState();
  const [PokemonSpeciesData, setPokemonSpeciesData] = useState ();
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const getPokemonData = (random = false) => {let searchTerm; 
    if (random) {searchTerm = Math.floor(Math.random() * 898 + 1);} else {searchTerm = Pokemon_search.toLowerCase();}
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${searchTerm}/`)
  .then((res) => res.json())
  .then((result) => {
    setLoadingPokemon(false);
    setPokemonData(result);

    getPokemonSpeciesData(searchTerm)
  }
)
const getPokemonSpeciesData = (searchTerm) => {
  setLoadingPokemon(true);

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchTerm}/`)
    .then((res) => res.json())
    .then(
      (result) => {
        setLoadingPokemon(false);
        setPokemonSpeciesData(result);
      })

}}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Butt Pokedex</h1>
        </a>
        
        <Searchbar setPokemon_search={setPokemon_search} Pokemon_search={Pokemon_search} getPokemonData={getPokemonData}/>
        <p>Number: {pokemonData?.id}</p>
        <img src={pokemonData?.sprites?.back_default} alt="logo"/>
        {<ul>{PokemonSpeciesData?.names?.map((nameEntry) => {return (  <li key={nameEntry.language.name}>
                      {nameEntry.language.name} : {nameEntry.name}
                    </li>);})}</ul>}
      </header>
      
    </div>
  );
}

export default App;
