export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // 以下のプロミスチェーンが全て成功するまで待つ
    // APIを叩いてデータを持ってくるのを待ってあげるってこと
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
