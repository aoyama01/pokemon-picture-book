import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]); // _pokemonDataを入れたいので，空の配列で用意しておく

  useEffect(() => {
    // すべてのポケモンのデータを取得
    const fetchPokemonData = async () => {
      // getAllPokemonでPromise使ってるからasyncとawaitが必要
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      // console.log(res.results);
      setLoading(false); // データの読み込みが終わったらfalseに変更
    };
    fetchPokemonData();
  }, []); // コンポーネントを表示した初回のみ実行

  // 各ポケモンの詳細データを取得
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      // map関数で全てのポケモンをフェッチしているのでPromise.allとしている
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData)
  };

  console.log(pokemonData);

  return (
    <>
      <h1>こんにちは</h1>
      {loading ? (
        <h1>ロード中．．．</h1>
      ) : (
        <h1>ポケモンデータを取得しました</h1>
      )}
    </>
  );
}

export default App;
