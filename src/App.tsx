import React from 'react';
import Stars from 'components/StarList';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserDataObject from '../data/UserData';

const Login: React.FC = () => {
  const [userData, setUserData] = React.useState<UserDataObject>();

  function Test() {
    const client = axios.create({
      baseURL: 'https://api.github.com/',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer d2b0858f0a5db5bf71887fba1452e72178ca4915'
      }
    });

    const query = `
    query {    
        user(login: "WataruShimomura") {
          avatarUrl
          url
          login
    starredRepositories{
      totalCount
      edges {
        node {
          id
          name
          url
          owner {
            login
            avatarUrl
            url
          }
          primaryLanguage{
            name
          }
        }
      }
    }
  }
}`;

    client.post('graphql', { query }).then(function(result) {
      setUserData(result.data);
    });
  }

  const out = () => {
    const test = JSON.stringify(userData);
    axios.post(
      'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/registration/',
      test,
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          Test();
        }}
      >
        set
      </button>
      <button
        onClick={() => {
          out();
        }}
      >
        out
      </button>
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
      <Stars userName="WataruShimomura" />
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
