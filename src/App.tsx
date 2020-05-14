import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>
        GitHub_Stars管理ツール
      </h1>
      <Link to="/mainpage">
        <button>
          ログイン
        </button>
      </Link>
    </div>
  );
};

const Mainpage = () => {
  return (
    <div>
      <h1>
        お気に入り一覧
      </h1>
      並び替え<button>firter</button><button>sort</button>
      {stares()}
      <p>
        <Link to="/entry">
          <button>
            新規登録
        </button>
        </Link>
      </p>
      <Link to="/">
        <button>
          ログアウト
        </button>
      </Link>
    </div>
  );
};

const Entry = () => {
  return (
    <div>
      <h1>
        新規登録
      </h1>
      <p>
        <form>
          <label>
            URL:
    <input type="text" name="name" />
          </label>
          <label>
            メモ:
    <input type="text" name="name" />
          </label>
        </form>
      </p>
      <Link to="/mainpage">
        <button>
          登録
        </button>
      </Link>
    </div>
  );
};

const stares = () => {
  var list = [];
  //サンプルデータ
  var data = [
    {
      name: "smple1",
      resourcePath: "http*******",
      primaryLanguage: "Java",
      comment: "あとで確認する"
    },
    {
      name: "smple2",
      resourcePath: "http*******",
      primaryLanguage: "React",
      comment: "Hooks参考"
    }
  ];

  for (var i in data) {
    list.push(
      <div>
        <p>------------------------------</p>
        <li>リポジトリ名「{data[i].name}」</li>
        <li>URL       「{data[i].resourcePath}」</li>
        <li>使用言語「{data[i].primaryLanguage}」</li>
        <li>コメント「{data[i].comment}」<button>Edit</button></li>
        <button>消去</button>
        <p>------------------------------</p>
      </div>
    );
  }

  return (
    <ul>
      {list}
    </ul>
  );
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/mainpage" component={Mainpage} />
          <Route path="/entry" component={Entry} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;