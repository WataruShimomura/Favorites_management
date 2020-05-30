import React from 'react';
import Stars from 'components/Stars'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>GitHub_Stars管理ツール</h1>
      <Link to="/mainpage">
        <button>ログイン</button>
      </Link>
    </div>
  );
};

const Entry = () => {
  return (
    <div>
      <h1>新規登録</h1>
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
        <button>登録</button>
      </Link>
    </div>
  );
};

const Mainpage = () => {
  return (
    <div>
      <Stars></Stars>
    </div>
  );
};

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
