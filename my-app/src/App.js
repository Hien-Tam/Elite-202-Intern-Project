import "./App.css";
import Searchbar from "./searchbar";
import { useState } from "react";
import LanguageSearcher from "./Languagesearcher";
import PokeButts from "./pokebutts";
import Evolution from "./Evolution";
import LanguageList from "./List";

function App() {
  const [Pokemon_search, setPokemon_search] = useState();
  const [pokemonData, setPokemonData] = useState();
  const [PokemonSpeciesData, setPokemonSpeciesData] = useState();
  const [PokemonEvolveData, setPokemonEvolveData] = useState();
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [Language, setLanguage] = useState("en");
  const getPokemonData = (random = false, CustomEvolveSearcher) => {
    let searchTerm;
    if (random) {
      searchTerm = Math.floor(Math.random() * 898 + 1);
    } else if (CustomEvolveSearcher) {
      searchTerm = CustomEvolveSearcher;
    } else {
      searchTerm = Pokemon_search.toLowerCase();
    }
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${searchTerm}/`)
      .then((res) => res.json())
      .then((result) => {
        setLoadingPokemon(false);
        setPokemonData(result);

        getPokemonSpeciesData(searchTerm);
      });
    const getPokemonSpeciesData = (searchTerm) => {
      setLoadingPokemon(true);

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchTerm}/`)
        .then((res) => res.json())
        .then((result) => {
          setLoadingPokemon(false);
          if (result?.evolution_chain?.url) {
            fetch(result?.evolution_chain.url)
              .then((res) => res.json())
              .then((evoResult) => {
                setPokemonEvolveData(evoResult);
              });
          }
          setPokemonSpeciesData(result);
        });
    };
  };
  var firstEvolutionPokeName = PokemonEvolveData?.chain?.species?.name;
  var secondEvolutionPokeName = PokemonEvolveData?.chain?.evolves_to;
  return (
    <div className="App">
      <header className="App-header">
      
          <h1 className="header"> Butt Pokedex </h1>
          {pokemonData && (
            <><div className="leftsidestuff">
    
    <p>Number: {pokemonData?.id}</p>
    <PokeButts pokemonData={pokemonData} />
    </div></>)}
          
        <LanguageList PokemonSpeciesData={PokemonSpeciesData} />
    
        <LanguageSearcher setLanguage={setLanguage} />
        <div className="name">
          <div>
            <h3>
              {
                (PokemonSpeciesData?.names.find(
                  ({ language }) => language.name === Language
                ))?.name
              }
            </h3>
          </div>
        </div>
        {pokemonData && (<>
        <div><Evolution getPokemonData={getPokemonData} firstEvolutionPokeName={firstEvolutionPokeName} secondEvolutionPokeName={secondEvolutionPokeName}/></div>
        </>)}
        <Searchbar
          setPokemon_search={setPokemon_search}
          Pokemon_search={Pokemon_search}
          getPokemonData={getPokemonData}
        />
      </header>
    </div>
  );
}

export default App;
