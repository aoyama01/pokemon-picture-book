import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData= async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
    }
    fetchPokemonData();
  }, []);  // コンポーネントを表示した初回のみ実行

  return (
    <>
      <h1>こんにちは</h1>
    </>
  );
}

export default App;
