import React, { useState } from 'react';

function PokeButts({pokemonData}) {
  return (
    <img src={pokemonData?.sprites?.back_default} alt="logo" />
  );
}

export default PokeButts;