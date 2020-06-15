import axios from 'axios';
import StarListObject from './data/StarlistPayload';
import StarDataRes from '../../data/StarDataRes';

const getStarData = async (userName: String) => {
  const starData = await axios
    .get<StarListObject[]>(
      'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsStarelist?userId=' +
        userName
    )
    .then(results => {
      const returnJson = results;
      return returnJson.data;
    })
    .catch(error => {
      return null;
    });

  return starData ? shapingStarData(starData) : [];
};

const shapingStarData = (userData: StarListObject[]) => {
  const starDataRes: StarDataRes[] = [];

  userData.map((state, index) => {
    starDataRes[index] = {
      starId: state._fieldsProto.starId.stringValue,
      ownerUrl: state._fieldsProto.ownerUrl.stringValue,
      ownerIcon: state._fieldsProto.ownerIcon.stringValue,
      primaryLanguage: state._fieldsProto.primaryLanguage.stringValue,
      ownerName: state._fieldsProto.ownerName.stringValue,
      comment: state._fieldsProto.comment.stringValue,
      url: state._fieldsProto.url.stringValue,
      name: state._fieldsProto.name.stringValue
    };
  });

  return starDataRes;
};

export default getStarData;
