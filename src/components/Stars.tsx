import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
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

const Stares: React.FC<Props> = props => {
  const [userData, setUserData] = React.useState<UserDataObject>(
    defaultUserState
  );
  const [starList, setStarList] = React.useState<StarListObject[]>([
    defaultStarListState
  ]);
  const [defaultList, setDefaultList] = React.useState<StarListObject[]>([
    defaultStarListState
  ]);
  const [display, setDisplay] = React.useState(true);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    starList[index]._fieldsProto.comment.stringValue = e.target.value;
  };

  const UpdataComment = (index: number) => {
    const acount = userData._fieldsProto.login.stringValue;
    const repository = starList[index]._ref._path.segments[5];
    const reqRepository = `https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/addComment?repository=${repository}`;
    const reqComment = `&comment=${starList[index]._fieldsProto.comment.stringValue}`;
    const reqAcount = `&acount=${acount}`;
    const req = reqRepository + reqComment + reqAcount;
    axios.get(req);
    starList[index]._fieldsProto.comment.stringValue =
      starList[index]._fieldsProto.comment.stringValue;
    const newlist = [...starList];
    setStarList(newlist);
    setDisplay(true);
  };

  const deleteRepository = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const repository = starList[index]._ref._path.segments[5];
    const newDefaultList = [...defaultList];
    newDefaultList.splice(index, 1);
    setStarList(newDefaultList);
    setDefaultList(newDefaultList);
  };

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

  const commentDisplay = (display: boolean) => {
    display ? setDisplay(false) : setDisplay(true);
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

  const DeleteButton = styled(ButtonStyled)`
    background: #808000;
    color: #fff;
    position: relative;
    left: 90%;
  `;

  const StarList = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: #ddd;
    width: 100%;
    height: auto;
  `;

  const ListComponent = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    text-decoration: none;
    position: relative;
    z-index: 1;
  `;

  const StarListLayout = styled(ListComponent)`
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    padding: 15px;
    width: 29%;
  `;

  const ListDetails = styled.details`
    width: 20%;
    position: relative;
    z-index: 2;
    display: flex;
    cursor: pointer;
  `;

  const ListHedder = styled.h2`
    background: #fff;
    border-bottom: 1px solid #aaa;
  `;

  const ListTitl = styled.a`
    text-decoration: inherit;
    text-align: center;
    position: absolute;
  `;

  //     const ListMenu = styled.span`
  //   right: 10%
  //   `
  const ListLanguage = styled.span`
    background: #ddd;
    border-radius: 3px;
    border: 1px solid #aaa;
    padding: 3px;
  `;

  const ListMemo = styled.span`
    background: #fff;
    border-bottom: 1px solid #aaa;
  `;

  const CommentDetails = styled.details`
    border: 1px solid #aaa;
    width: 35%;
  `;
  const CommentSummary = styled.summary`
    position: relative;
    z-index: 2;
    padding: 0.5em;
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
      <StarList>
        {!starList.values == undefined && <p>リストがありません！！</p>}
        {starList.map((state, index) => {
          return (
            <StarListLayout>
              <ListDetails>
                <CommentSummary>...</CommentSummary>
                <input
                  type="button"
                  value="コメント更新"
                  onClick={e => {
                    commentDisplay(display);
                  }}
                />
                <DeleteButton
                  onClick={e => {
                    deleteRepository(e, index);
                  }}
                >
                  消去
                </DeleteButton>
              </ListDetails>
              <ListHedder>
                <UserIcon src={state._fieldsProto.ownerIcon.stringValue} />
                <ListTitl href={state._fieldsProto.url.stringValue}>
                  {state._fieldsProto.name.stringValue}
                </ListTitl>
              </ListHedder>
              <div>
                primaryLanguage：
                <ListLanguage>
                  {state._fieldsProto.primaryLanguage.stringValue}
                </ListLanguage>
              </div>
              <div>
                Memo：
                {display ? (
                  <ListMemo>{state._fieldsProto.comment.stringValue}</ListMemo>
                ) : (
                  <label>
                    <input
                      type="text"
                      placeholder="コメントを入力"
                      onChange={e => {
                        handleChange(e, index);
                      }}
                      onBlur={() => {
                        UpdataComment(index);
                      }}
                    />
                  </label>
                )}
              </div>
            </StarListLayout>
          );
        })}
      </StarList>
      <div>
        <a href="#">▲　ページトップへ</a>
      </div>
    </div>
  );
};

export default Stares;
