import React, { useState } from 'react';

function LanguageList({PokemonSpeciesData}) {
  return (
      <>
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
    </>
  );
}

export default LanguageList;