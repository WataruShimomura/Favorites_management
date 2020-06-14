import axios from 'axios';
import UserDataObject from '../../data/UserDataPayload';
import UserDataRes from './data/UserDataRes';

const updataComment = async (
  userName: String,
  comment: String,
  starId: String
) => {
  const acount = userName;
  const repository = starId;
  const reqRepository = `https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/addComment?repository=${repository}`;
  const reqComment = `&comment=${comment}`;
  const reqAcount = `&acount=${acount}`;
  const req = reqRepository + reqComment + reqAcount;
  await axios.get(req);
};

export default updataComment;
