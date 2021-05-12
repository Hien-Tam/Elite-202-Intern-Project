import logo from "./logo.svg";
import "./App.css";
import Searchbar from "./searchbar";
import { useState } from "react";

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
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Butt Pokedex</h1>
        </a>

        <Searchbar
          setPokemon_search={setPokemon_search}
          Pokemon_search={Pokemon_search}
          getPokemonData={getPokemonData}
        />
        <p>Number: {pokemonData?.id}</p>
        <img src={pokemonData?.sprites?.back_default} alt="logo" />
        {
          <ul>
            {PokemonSpeciesData?.names?.map((nameEntry) => {
              return (
                <li key={nameEntry.language.name}>
                  {nameEntry.language.name} : {nameEntry.name}
                </li>
              );
            })}
          </ul>
        }
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ja-Hrkt">Japanese (no kanji)</option>
          <option value="ko">Korean</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="zh-Hans">Chinese (simplified)</option>
        </select>
        <div className="name">
          <div>
            <h3>
              {
                (PokemonSpeciesData?.names.find(
                  ({ language }) => language.name === Language
                )).name
              }
            </h3>
          </div>
        </div>
        {
          <p>
            <button
              onClick={() => getPokemonData(false, firstEvolutionPokeName)}
            >
              EVOLUTION CHAIN
            </button>{" "}
            {firstEvolutionPokeName}
          </p>
        }
        {secondEvolutionPokeName?.length > 0 && (
          <>
            <p>
              <ul>
                {secondEvolutionPokeName?.map((evolvesto) => {
                  return (
                    <li
                      onClick={() =>
                        getPokemonData(false, evolvesto.species.name)
                      }
                    >
                      {evolvesto.species.name}
                    </li>
                  );
                })}
              </ul>
              {secondEvolutionPokeName[0]?.evolves_to?.length > 0 && (
                <>
                  <p>
                    <ul>
                      {secondEvolutionPokeName?.map((evolvesto) => {
                        return (
                          <>
                            {evolvesto.evolves_to?.map((evolvestoto) => (
                              <li
                                onClick={() =>
                                  getPokemonData(
                                    false,
                                    evolvestoto?.species?.name
                                  )
                                }
                              >
                                {evolvestoto?.species?.name}
                              </li>
                            ))}
                          </>
                        );
                      })}
                    </ul>
                  </p>
                </>
              )}
            </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
