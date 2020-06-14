import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import StarList from './StarList';
import StarListObject from '../../data/StarlistPayload';
import UserDataObject from '../../data/UserDataPayload';

const defaultUserState: UserDataObject = {
  _fieldsProto: {
    url: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    avatarUrl: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    login: {
      stringValue: '読み込み中...',
      valueType: ''
    }
  },
  _ref: {
    _path: {
      segments: ['', '', '', '']
    }
  }
};

const defaultStarListState: StarListObject = {
  _fieldsProto: {
    starId: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    ownerUrl: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    ownerIcon: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    primaryLanguage: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    ownerName: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    comment: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    url: {
      stringValue: '読み込み中...',
      valueType: ''
    },
    name: {
      stringValue: '読み込み中...',
      valueType: ''
    }
  },
  _ref: {
    _path: {
      segments: ['', '', '', '', '', '']
    }
  }
};

type Props = {
  userName: string;
};

const Stars: React.FC<Props> = props => {
  const [userData, setUserData] = React.useState<UserDataObject>(
    defaultUserState
  );
  const [starList, setStarList] = React.useState<StarListObject[]>([
    defaultStarListState
  ]);
  const [defaultList, setDefaultList] = React.useState<StarListObject[]>([
    defaultStarListState
  ]);

  // 子供のStarListに対して、自分自身を更新する関数を提供する
  const updateStarInformation = (index: number, after: StarListObject) => {
    // コピーを作成
    const afterList = [...starList];
    // 更新後のstarをセット
    afterList[index] = after;
    setStarList(afterList);
  };

  const deleteStarList = (index: number) => {
    const repository = starList[index]._ref._path.segments[5];
    const newDefaultList = [...defaultList];
    newDefaultList.splice(index, 1);
    setStarList(newDefaultList);
    setDefaultList(newDefaultList);
  };

  React.useEffect(() => {
    axios
      .get<UserDataObject>(
        'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsUserData?userId=' +
          props.userName
      )
      .then(results => {
        const returnJson = results;
        setUserData(returnJson.data);

        return returnJson;
      })
      .catch(error => {
        console.log('通信失敗1');
        console.log(error);
      });

    axios
      .get<StarListObject[]>(
        'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsStarelist?userId=' +
          props.userName
      )
      .then(results => {
        const returnJson = results;
        setStarList(returnJson.data);
        setDefaultList(returnJson.data);

        return returnJson;
      })
      .catch(error => {
        console.log('通信失敗2');
        console.log(error);
      });
  }, []);

  const filterLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`フィルタ実行、対象は${e.target.value}`);
    setStarList(defaultList);
    if (e.target.value != 'all') {
      const sortList = [...defaultList].filter(
        (item, index, array) =>
          defaultList[index]._fieldsProto.primaryLanguage.stringValue ==
          e.target.value
      );
      setStarList(sortList);
    }
  };

  const sortRepositoryname = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const line = [...starList].sort(function(a, b) {
      if (e.target.value == 'down') {
        if (a._fieldsProto.name.stringValue < b._fieldsProto.name.stringValue) {
          return -1;
        }
        if (a._fieldsProto.name.stringValue > b._fieldsProto.name.stringValue) {
          return 1;
        }

        return 0;
      }
      if (a._fieldsProto.name.stringValue < b._fieldsProto.name.stringValue) {
        return 1;
      }
      if (a._fieldsProto.name.stringValue > b._fieldsProto.name.stringValue) {
        return -1;
      }

      return 0;
    });
    setStarList(line);
  };

  const Hedder = styled.h1`
    background: #24292e;
    color: hsla(0, 0%, 100%);
    margin: 0%;
    text-align: center;
    width: 100%;
    padding: 5px;
  `;

  const UserName = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const UserIcon = styled.img`
    border-radius: 10px;
    height: 30px;
    margin-right: 15px;
    text-align: center;
    width: 30px;
    vertical-align: middle;
  `;

  const ButtonStyled = styled.button`
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    border-radius: 3px;
    vertical-align: middle;
    cursor: pointer;
  `;

  const LoginButton = styled(ButtonStyled)`
    background: #668ad8;
    color: #fff;
    margin-left: 15px;
  `;

  const LogoutButton = styled(ButtonStyled)`
    background: #808000;
    color: #fff;
    margin-left: 15px;
  `;

  const SortTag = styled.div`
    padding: 5px;
  `;

  const SelectForm = styled.select`
    margin-right: 15px;
    margin-left: 15px;
  `;

  const StarListBack = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: #ddd;
    width: 100%;
    height: auto;
  `;

  return (
    <div>
      <Hedder>
        お気に入り一覧
        <UserName>
          <UserIcon src={userData._fieldsProto.avatarUrl.stringValue} /> by{' '}
          <a href={userData._fieldsProto.url.stringValue} target="_blank">
            {userData._fieldsProto.login.stringValue}
          </a>
          <LoginButton>新規リポジトリー登録</LoginButton>
          <LogoutButton>ログアウト</LogoutButton>
        </UserName>
      </Hedder>
      <SortTag>
        PrimaryLanguage:
        <SelectForm
          name="PrimaryLanguage"
          onChange={e => {
            filterLanguage(e);
          }}
        >
          <option value="all">ALL</option>
          <option value="Java">Java</option>
          <option value="React">React</option>
        </SelectForm>
        sort:
        <SelectForm
          name="リポジトリ名"
          onChange={e => {
            sortRepositoryname(e);
          }}
        >
          <option value="down">降順</option>
          <option value="up">昇順</option>
        </SelectForm>
      </SortTag>
      <StarListBack>
        {!starList.values == undefined && <p>リストがありません！！</p>}
        {starList.map((state, index) => {
          return (
            <StarList
              user={userData._fieldsProto.login.stringValue}
              stars={state}
              index={index}
              update={updateStarInformation}
              delete={deleteStarList}
            />
          );
        })}
      </StarListBack>
      <div>
        <a href="#">▲　ページトップへ</a>
      </div>
    </div>
  );
};

export default Stars;
