import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import StarlistPayload from '../data/StarlistPayload';

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

  // const data = [
  //   {
  //     "_fieldsProto": {
  //       "comment": {
  //         "stringValue": "testmemo",
  //         "valueType": "stringValue"
  //       },
  //       "language": {
  //         "stringValue": "Java",
  //         "valueType": "stringValue"
  //       },
  //       "repositoryname": {
  //         "stringValue": "testrepositoryname",
  //         "valueType": "stringValue"
  //       },
  //       "url": {
  //         "stringValue": "localhost:8080",
  //         "valueType": "stringValue"
  //       }
  //     },
  //     "_ref": {
  //       "_firestore": {
  //         "_settings": {
  //           "projectId": "githubdb-d71b1",
  //           "firebaseVersion": "8.12.1",
  //           "libName": "gccl",
  //           "libVersion": "3.8.0 fire/8.12.1",
  //           "servicePath": "firestore.googleapis.com",
  //           "port": 443,
  //           "clientConfig": {},
  //           "scopes": [
  //             "https://www.googleapis.com/auth/cloud-platform",
  //             "https://www.googleapis.com/auth/datastore"
  //           ]
  //         },
  //         "_settingsFrozen": true,
  //         "_serializer": {
  //           "allowUndefined": false
  //         },
  //         "_projectId": "githubdb-d71b1",
  //         "registeredListenersCount": 0,
  //         "_lastSuccessfulRequest": 1589968338413,
  //         "_backoffSettings": {
  //           "initialDelayMs": 100,
  //           "maxDelayMs": 60000,
  //           "backoffFactor": 1.3
  //         },
  //         "_preferTransactions": false,
  //         "_clientPool": {
  //           "concurrentOperationLimit": 100,
  //           "maxIdleClients": 1,
  //           "activeClients": {},
  //           "terminated": false,
  //           "terminateDeferred": {
  //             "promise": {
  //               "domain": {
  //                 "domain": null,
  //                 "_events": {},
  //                 "_eventsCount": 3,
  //                 "members": []
  //               }
  //             }
  //           }
  //         }
  //       },
  //       "_path": {
  //         "segments": [
  //           "githubdb",
  //           "userlist",
  //           "userid",
  //           "testacount",
  //           "starlist",
  //           "testRepositoryid"
  //         ],
  //         "projectId": "githubdb-d71b1",
  //         "databaseId": "(default)"
  //       },
  //       "_converter": {}
  //     },
  //     "_serializer": {
  //       "allowUndefined": false
  //     },
  //     "_readTime": {
  //       "_seconds": 1589968338,
  //       "_nanoseconds": 375721000
  //     },
  //     "_createTime": {
  //       "_seconds": 1589707579,
  //       "_nanoseconds": 96026000
  //     },
  //     "_updateTime": {
  //       "_seconds": 1589707579,
  //       "_nanoseconds": 96026000
  //     }
  //   },
  //   {
  //     "_fieldsProto": {
  //       "comment": {
  //         "stringValue": "testmemo2",
  //         "valueType": "stringValue"
  //       },
  //       "language": {
  //         "stringValue": "React",
  //         "valueType": "stringValue"
  //       },
  //       "repositoryname": {
  //         "stringValue": "testname2",
  //         "valueType": "stringValue"
  //       },
  //       "url": {
  //         "stringValue": "testurl",
  //         "valueType": "stringValue"
  //       }
  //     },
  //     "_ref": {
  //       "_firestore": {
  //         "_settings": {
  //           "projectId": "githubdb-d71b1",
  //           "firebaseVersion": "8.12.1",
  //           "libName": "gccl",
  //           "libVersion": "3.8.0 fire/8.12.1",
  //           "servicePath": "firestore.googleapis.com",
  //           "port": 443,
  //           "clientConfig": {},
  //           "scopes": [
  //             "https://www.googleapis.com/auth/cloud-platform",
  //             "https://www.googleapis.com/auth/datastore"
  //           ]
  //         },
  //         "_settingsFrozen": true,
  //         "_serializer": {
  //           "allowUndefined": false
  //         },
  //         "_projectId": "githubdb-d71b1",
  //         "registeredListenersCount": 0,
  //         "_lastSuccessfulRequest": 1589968338413,
  //         "_backoffSettings": {
  //           "initialDelayMs": 100,
  //           "maxDelayMs": 60000,
  //           "backoffFactor": 1.3
  //         },
  //         "_preferTransactions": false,
  //         "_clientPool": {
  //           "concurrentOperationLimit": 100,
  //           "maxIdleClients": 1,
  //           "activeClients": {},
  //           "terminated": false,
  //           "terminateDeferred": {
  //             "promise": {
  //               "domain": {
  //                 "domain": null,
  //                 "_events": {},
  //                 "_eventsCount": 3,
  //                 "members": []
  //               }
  //             }
  //           }
  //         }
  //       },
  //       "_path": {
  //         "segments": [
  //           "githubdb",
  //           "userlist",
  //           "userid",
  //           "testacount",
  //           "starlist",
  //           "testRepositoryid2"
  //         ],
  //         "projectId": "githubdb-d71b1",
  //         "databaseId": "(default)"
  //       },
  //       "_converter": {}
  //     },
  //     "_serializer": {
  //       "allowUndefined": false
  //     },
  //     "_readTime": {
  //       "_seconds": 1589968338,
  //       "_nanoseconds": 375721000
  //     },
  //     "_createTime": {
  //       "_seconds": 1589806947,
  //       "_nanoseconds": 434569000
  //     },
  //     "_updateTime": {
  //       "_seconds": 1589806947,
  //       "_nanoseconds": 434569000
  //     }
  //   }
  // ]

  const data: StarlistPayload = axios.get('https://us-central1-githubdb-d71b1.cloudfunctions.net/getsStarelist')

  for (var i in data) {
    list.push(
      <div>
        <p>------------------------------</p>
        <li>リポジトリ名「{data[i]._fieldsProto.repositoryname.stringValue}」</li>
        <li>URL       「{data[i]._fieldsProto.url.stringValue}」</li>
        <li>使用言語「{data[i]._fieldsProto.language.stringValue}」</li>
        <li>コメント「{data[i]._fieldsProto.comment.stringValue}」<button>Edit</button></li>
        <li>対象ドキュメント「{data[i]._ref._path.segments[5]}」</li>
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