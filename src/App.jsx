import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]); // _pokemonDataを入れたいので，空の配列で用意しておく
  const [prevURL, setPrevURL] = useState(''); // 次のページのURLを格納するための状態変数を管理
  const [nextURL, setNextURL] = useState(''); // 次のページのURLを格納するための状態変数を管理

  // データ読込時のローディング設定
  useEffect(() => {
    // すべてのポケモンのデータを取得する関数
    const fetchPokemonData = async () => {
      // ポケモン20匹分のデータを含むjsonを取得
      let res = await getAllPokemon(initialURL); // getAllPokemonでPromise使ってるからasyncとawaitが必要

      loadPokemon(res.results); // jsonデータから，各ポケモンの能力値データ(results)を取得
      console.log(res);
      setNextURL(res.next); // 次の20匹のデータへのリンクを格納
      // setPrevURL(data.previous); // null ← これ書いたら初回のローディングが成功しない
      // console.log(res.results);
      setLoading(false); // データの読み込みが終わったらfalseに変更
    };
    fetchPokemonData();
  }, []); // コンポーネントを表示した初回のみ実行

  // 各ポケモンの詳細データを取得する関数
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      // map関数で全てのポケモンをフェッチしているのでPromise.allとしている
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  // 前のページのデータを取得する関数
  const handlePrevPage = async () => {
    console.log('handlePrevPageが発生');
    if (!prevURL) return; // prevURLが空の場合に早期リターン

    setLoading(true);
    try {
      let data = await getAllPokemon(prevURL); // 次のページのURLを格納するための状態変数が必要
      console.log('dataを取得');
      console.log(data);
      setPrevURL(data.previous);
      setNextURL(data.next);
      await loadPokemon(data.results);
    } catch (error) {
      console.error('次のページの取得に失敗しました:', error);
    } finally {
      setLoading(false); // ロードが完了
    }
  };

  // 次のページのデータを取得する関数
  const handleNextPage = async () => {
    console.log('handleNextPageが発生');
    if (!nextURL) return; // nextURLが空の場合に早期リターン

    setLoading(true);
    try {
      let data = await getAllPokemon(nextURL); // 次のページのURLを格納するための状態変数が必要
      console.log('dataを取得');
      console.log(data);
      setPrevURL(data.previous);
      setNextURL(data.next);
      await loadPokemon(data.results);
    } catch (error) {
      console.error('次のページの取得に失敗しました:', error);
    } finally {
      setLoading(false); // ロードが完了
    }
  };

  return (
    <>
      <Navbar />
      <div className='App'>
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
