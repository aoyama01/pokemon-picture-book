export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // 以下のプロミスチェーンが全て成功するまで待つ
    // APIを叩いてデータを持ってくるのを待ってあげるってこと
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json(res))
      .then((data) => {
        // console.log(data);
        resolve(data);
      });
  });
};
