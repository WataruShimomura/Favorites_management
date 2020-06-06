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
        },
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
    userName: string
}

const Stares: React.FC<Props> = (props) => {
    const [userData, setUserData] = React.useState<UserDataObject>(
        defaultUserState);
    const [starList, setStarList] = React.useState<StarListObject[]>([
        defaultStarListState
    ]);
    // フィルター機能を初期化するために使用する。
    const [defaultList, setDefaultList] = React.useState<StarListObject[]>([
        defaultStarListState
    ]);

    React.useEffect(() => {
        axios
            .get<UserDataObject>(
                'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsUserData?userId=' + props.userName
            )
            .then(results => {
                const returnJson = results;
                setUserData(returnJson.data);

                return returnJson;
            })
            .catch(error => {
                console.log('通信失敗1');
                console.log(error);
                // 失敗したときは空のjsonを返す
            });

        axios
            .get<StarListObject[]>(
                'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsStarelist?userId=' + props.userName
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
                // 失敗したときは空のjsonを返す
            });
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => {
        console.log('実行1');
        console.log(index);
        console.log(e.target.value);
        starList[index]._fieldsProto.comment.stringValue = e.target.value;
        // const newlist = [...starList];
        // setStarList(newlist)
        // console.log(starList[index]._fieldsProto.comment.stringValue);
    };

    console.log(`defaultlist=${defaultList[0]._fieldsProto.comment.stringValue}`);

    const UpdataComment = (
        e: React.MouseEvent<HTMLInputElement>,
        index: number
    ) => {
        console.log('実行２');
        console.log(starList[index]._fieldsProto.comment.stringValue);
        const repository = starList[index]._ref._path.segments[5];
        console.log(repository);
        const reqRepository = `https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/addComment?repository=${repository}`;
        const reqComment = `&comment=${starList[index]._fieldsProto.comment.stringValue}`;
        const req = reqRepository + reqComment;
        console.log(req);
        axios.get(req);
        starList[index]._fieldsProto.comment.stringValue =
            starList[index]._fieldsProto.comment.stringValue;
        const newlist = [...starList];
        setStarList(newlist);
    };

    const deleteRepository = (
        e: React.MouseEvent<HTMLButtonElement>,
        index: number
    ) => {
        console.log('実行3');
        const repository = starList[index]._ref._path.segments[5];
        console.log(repository);
    };

    const filterLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`フィルタ実行、対象は${e.target.value}`);
        setStarList(defaultList);
        if (e.target.value != 'all') {
            const sortList = [...defaultList].filter(
                (item, index, array) =>
                    defaultList[index]._fieldsProto.primaryLanguage.stringValue == e.target.value
            );
            setStarList(sortList);
        }
    };

    const sortRepositoryname = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const line = [...starList].sort(function (a, b) {
            if (e.target.value == 'down') {
                if (
                    a._fieldsProto.name.stringValue <
                    b._fieldsProto.name.stringValue
                ) {
                    return -1;
                }
                if (
                    a._fieldsProto.name.stringValue >
                    b._fieldsProto.name.stringValue
                ) {
                    return 1;
                }

                return 0;
            }
            if (
                a._fieldsProto.name.stringValue <
                b._fieldsProto.name.stringValue
            ) {
                return 1;
            }
            if (
                a._fieldsProto.name.stringValue >
                b._fieldsProto.name.stringValue
            ) {
                return -1;
            }

            return 0;
        });
        setStarList(line);
    };

    return (
        <div>
            <Hedder>
                お気に入り一覧
        <UserName>
                    <UserIcon src={userData._fieldsProto.avatarUrl.stringValue} /> by <a href={userData._fieldsProto.url.stringValue}>{userData._fieldsProto.login.stringValue}</a>
                    <Button>新規リポジトリー登録</Button>
                    <Button>ログアウト</Button>
                </UserName>
            </Hedder>
      使用言語
            <select
                name="使用言語"
                onChange={e => {
                    filterLanguage(e);
                }}
            >
                <option value="all">ALL</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
            </select>
      sort
            <select
                name="リポジトリ名"
                onChange={e => {
                    sortRepositoryname(e);
                }}
            >
                <option value="down">降順</option>
                <option value="up">昇順</option>
            </select>
            <StarList>
                {starList.map((state, index) => {
                    return (
                        <div>
                            <List>
                                <ListHedder>
                                    <UserIcon src={state._fieldsProto.ownerIcon.stringValue} />
                                    <ListTitl href={state._fieldsProto.url.stringValue}>
                                        {state._fieldsProto.name.stringValue}
                                    </ListTitl>
                                </ListHedder>
                                <tr>●　{state._fieldsProto.primaryLanguage.stringValue}</tr>
                                <tr>
                                    Comment
                  <ListMemo>{state._fieldsProto.comment.stringValue}</ListMemo>
                                    <p>
                                        <label>
                                            <textarea
                                                name="message-body"
                                                placeholder="コメントを入力"
                                                onChange={e => {
                                                    handleChange(e, index);
                                                }}
                                            />
                                        </label>
                                        <input
                                            type="button"
                                            value="コメント更新"
                                            onClick={e => {
                                                UpdataComment(e, index);
                                            }}
                                        />
                                    </p>
                                </tr>
                                <button
                                    onClick={e => {
                                        deleteRepository(e, index);
                                    }}
                                >
                                    消去
                </button>
                            </List>
                        </div>
                    );
                })}
            </StarList>
            <div>
                <a href="#">ページトップへ</a>
            </div>
        </div>
    );
};

const Hedder = styled.h1`
  background: #24292e;
  color: hsla(0, 0%, 100%);
  margin: 0%;
  text-align: center;
`;

const UserName = styled.div`
  margin: 15px;
  text-underline-position: under;
`;
const UserIcon = styled.img`
  border-radius: 10px;
  height: 30px;
  margin-right: 15px;
  text-align: center;
  width: 30px;
`;
const Button = styled.button`
  margin: 15px;
`;

const StarList = styled.ul`
  background: #c0c0c0;
  display: flex;
  flex-direction: row;
  padding: 15px;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: row;
`;

const List = styled.div`
  background: #cfff;
  border-radius: 10px;
  box-shadow: 5px 5px grey;
  display: block;
  margin: 15px;
  padding: 15px;
  text-decoration: none;
  width: 450px;
`;

const ListHedder = styled.h2`
  background: #fff;
  border-radius: 10px;
`;

const ListTitl = styled.a`
  position: fixed;
`;
const ListMemo = styled.div`
  background: #fff;
  border-radius: 10px;
`;

export default Stares;
