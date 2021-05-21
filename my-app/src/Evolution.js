import React, { useState } from 'react';
import "./App.css"

function Evolution({getPokemonData,firstEvolutionPokeName,secondEvolutionPokeName}) {
  return (
    <>
    {
        <p>
          <div className="Evolution"
            onClick={() => getPokemonData(false, firstEvolutionPokeName)}
          >
            EVOLUTION CHAIN
          </div>{" "}
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
                  className="Evolution"
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
                            className="Evolution"
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
    </>
  );
}

export default Evolution;