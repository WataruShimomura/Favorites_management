import axios from 'axios';
import UserDataObject from '../../data/UserDataPayload';
import UserDataRes from './data/UserDataRes';

const getUserData = async (userName: String) => {
  const userData = await axios
    .get<UserDataObject>(
      'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsUserData?userId=' +
        userName
    )
    .then(results => {
      const returnJson = results;
      return returnJson.data;
    })
    .catch(error => {
      return null;
    });

  var userDataRes: UserDataRes = {
    url: '読み込み中...',
    avatarUrl: '読み込み中...',
    login: '読み込み中...'
  };

  if (userData !== null) {
    userDataRes = shapingUserData(userData);
  }

  return userDataRes;
};

const shapingUserData = (userData: UserDataObject) => {
  const userDataRes: UserDataRes = {
    url: userData._fieldsProto.url.stringValue,
    avatarUrl: userData._fieldsProto.avatarUrl.stringValue,
    login: userData._fieldsProto.login.stringValue
  };

  return userDataRes;
};

export default getUserData;
