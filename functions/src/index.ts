import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp();

interface UserData {
  data: {
    user: {
      avatarUrl: string;
      url: string;
      login: string;
      starredRepositories: {
        totalCount: Number;
        edges: {
          node: {
            id: string;
            name: string;
            url: string;
            owner: {
              login: string;
              avatarUrl: string;
              url: string;
            };
            primaryLanguage: {
              name: string;
            };
          };
        }[];
      };
    };
  };
}

interface starDataList {
  starId: string;
  name: string;
  url: string;
  primaryLanguage: string;
  ownerName: string;
  ownerUrl: string;
  ownerIcon: string;
  comment: string;
}

// ログイン処理、ログインIDの有無を確認するためuseridの一覧を取得する
export const getuserid = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const ref = admin.firestore().collection('/githubdb/userlist/userid');
    ref
      .get()
      .then(snapshot => {
        response.json(snapshot.docs);
      })
      .catch(error => {
        response.status(500).send(error);
      });
    console.log();
  });

// ログイン時のユーザー照会時に新規アカウントだった場合、新規アカウントを発行
export const registration = functions
  .region('asia-northeast1')
  .https.onRequest((req, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const userData: UserData = req.body;
    const userName = userData.data.user.login;
    const userinfo = {
      url: userData.data.user.url,
      avatarUrl: userData.data.user.avatarUrl,
      login: userData.data.user.login
    };
    const starData = {
      starId: userData.data.user.starredRepositories.edges[0].node.id,
      name: userData.data.user.starredRepositories.edges[0].node.name,
      url: userData.data.user.starredRepositories.edges[0].node.url,
      primaryLanguage:
        userData.data.user.starredRepositories.edges[0].node.primaryLanguage
          .name,
      ownerName:
        userData.data.user.starredRepositories.edges[0].node.owner.login,
      ownerUrl: userData.data.user.starredRepositories.edges[0].node.owner.url,
      ownerIcon:
        userData.data.user.starredRepositories.edges[0].node.owner.avatarUrl,
      comment: ''
    };

    var starList: [starDataList] = [starData];
    for (var i in userData.data.user.starredRepositories.edges) {
      starList[i] = {
        starId: userData.data.user.starredRepositories.edges[i].node.id,
        name: userData.data.user.starredRepositories.edges[i].node.name,
        url: userData.data.user.starredRepositories.edges[i].node.url,
        primaryLanguage:
          userData.data.user.starredRepositories.edges[i].node.primaryLanguage
            .name,
        ownerName:
          userData.data.user.starredRepositories.edges[i].node.owner.login,
        ownerUrl:
          userData.data.user.starredRepositories.edges[i].node.owner.url,
        ownerIcon:
          userData.data.user.starredRepositories.edges[i].node.owner.avatarUrl,
        comment: ''
      };
    }

    admin
      .firestore()
      .collection('/githubdb/userlist/userid')
      .doc(`${userName}`)
      .set(userinfo);

    for (i in starList) {
      admin
        .firestore()
        .collection('/githubdb/userlist/userid')
        .doc(`${userName}`)
        .collection('starlist')
        .doc(`${starList[i].starId}`)
        .set(starList[i]);
    }

    response.end();
  });

// 対象のユーザーの情報を取得する
export const getsUserData = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const user = request.query.userId;

    const ref = admin
      .firestore()
      .collection('/githubdb/userlist/userid')
      .doc(`${user}`);
    ref
      .get()
      .then(snapshot => {
        response.json(snapshot);
      })
      .catch(error => {
        response.status(500).send(error);
      });
  });

// 対象のユーザーのお気に入り一覧を取得する
export const getsStarelist = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const user = request.query.userId;

    const ref = admin
      .firestore()
      .collection('/githubdb/userlist/userid')
      .doc(`${user}`)
      .collection('starlist');
    ref
      .get()
      .then(snapshot => {
        response.json(snapshot.docs);
      })
      .catch(error => {
        response.status(500).send(error);
      });
  });

// 対象のリポジトリに入力したコメントを追加する
export const addComment = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const setRepository = request.query.repository;
    const setAcount = request.query.acount;
    const setComment = request.query.comment;
    const ref = admin
      .firestore()
      .collection('/githubdb/userlist/userid')
      .doc(`${setAcount}`)
      .collection('starlist');
    ref.doc(`${setRepository}`).update({
      comment: setComment
    });
  });

// このアプリ内で新規お気に入りリポジトリの追加登録を行う
export const addRepository = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const ref = admin
      .firestore()
      .collection('/articles/iymeeKlE29fg8OJKTJvJ/userid');
    ref
      .get()
      .then(snapshot => {
        response.json(snapshot.docs);
      })
      .catch(error => {
        response.status(500).send(error);
      });
  });

// 対象のリポジトリを消去する
export const deleteRepository = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const delRepository = request.query.repository;
    const ref = admin
      .firestore()
      .collection('/githubdb/userlist/userid/testacount/starlist/');
    ref.doc(`${delRepository}`).delete();
  });
