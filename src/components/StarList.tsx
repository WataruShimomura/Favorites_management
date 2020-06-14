import React from 'react';
import styled from 'styled-components';
import StarList from './StarItem';
import GetUserData from '../external/GetUserData';
import GetStarData from '../external/GetStarData';
import UserDataRes from '../../data/UserDataRes';
import StarDataRes from '../../data/StarDataRes';

const defaultUserState: UserDataRes = {
  url: '読み込み中...',
  avatarUrl: '読み込み中...',
  login: '読み込み中...'
};

const defaultStarListState: StarDataRes = {
  starId: '読み込み中...',
  ownerUrl: '読み込み中...',
  ownerIcon: '読み込み中...',
  primaryLanguage: '読み込み中...',
  ownerName: '読み込み中...',
  comment: '読み込み中...',
  url: '読み込み中...',
  name: '読み込み中...'
};

type Props = {
  userName: string;
};

const Stars: React.FC<Props> = props => {
  const [userData, setUserData] = React.useState<UserDataRes>(defaultUserState);
  const [starList, setStarList] = React.useState<StarDataRes[]>([
    defaultStarListState
  ]);
  const [defaultList, setDefaultList] = React.useState<StarDataRes[]>([
    defaultStarListState
  ]);
  const [primaryLanguages, setPrimaryLanguages] = React.useState<string[]>([]);

  // 子供のStarListに対して、自分自身を更新する関数を提供する
  const updateStarInformation = (index: number, after: StarDataRes) => {
    // コピーを作成
    const afterList = [...starList];
    // 更新後のstarをセット
    afterList[index] = after;
    setStarList(afterList);
  };

  const deleteStarList = (index: number) => {
    const repository = starList[index].starId;
    const newDefaultList = [...defaultList];
    newDefaultList.splice(index, 1);
    setStarList(newDefaultList);
    setDefaultList(newDefaultList);
  };

  //ユーザー情報とユーザーが持つお気に入りの一覧とその情報を取得
  React.useEffect(() => {
    const initialize = async () => {
      const userData = await GetUserData(props.userName);
      setUserData(userData);
      const starData = await GetStarData(props.userName);
      setStarList(starData);
      setDefaultList(starData);
      let languageList = starData.map(state => {
        return state.primaryLanguage;
      });
      const setLanguageList = languageList.filter(function(x, i, self) {
        return self.indexOf(x) === i;
      });

      setPrimaryLanguages(setLanguageList);
    };
    initialize();
  }, []);

  const filterLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStarList(defaultList);
    if (e.target.value != 'all') {
      const sortList = [...defaultList].filter(
        (item, index, array) =>
          defaultList[index].primaryLanguage == e.target.value
      );
      setStarList(sortList);
    }
  };

  const sortRepositoryname = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const line = [...starList].sort(function(a, b) {
      if (e.target.value == 'down') {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }

        return 0;
      }
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }

      return 0;
    });
    setStarList(line);
  };

  //styled-components
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

  const ListBack = styled.div`
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
          <UserIcon src={userData.avatarUrl} /> by{' '}
          <a href={userData.url}>{userData.login}</a>
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
          {primaryLanguages.map(state => {
            return <option value={state}>{state}</option>;
          })}
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
      <ListBack>
        {!starList.values && <p>リストがありません！！</p>}
        {starList.map((state, index) => {
          return (
            <StarList
              user={userData.login}
              stars={state}
              index={index}
              update={updateStarInformation}
              delete={deleteStarList}
            />
          );
        })}
      </ListBack>
      <div>
        <a href="#">▲　ページトップへ</a>
      </div>
    </div>
  );
};

export default Stars;
