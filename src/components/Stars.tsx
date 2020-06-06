import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import StarListObject from '../../data/StarlistPayload';
import Test from './Test';

const defaultState: StarListObject = {
    _fieldsProto: {
        comment: {
            stringValue: '読み込み中...',
            valueType: ''
        },
        language: {
            stringValue: '読み込み中...',
            valueType: ''
        },
        repositoryname: {
            stringValue: '読み込み中...',
            valueType: ''
        },
        url: {
            stringValue: '読み込み中...',
            valueType: ''
        }
    },
    _ref: {
        _path: {
            segments: ['', '', '', '', '', '読み込み中...']
        }
    }
};

type Props = {
    userName: string
}

const Stares: React.FC<Props> = (props) => {
    const [starList, setStarList] = React.useState<StarListObject[]>([
        defaultState
    ]);
    // フィルター機能を初期化するために使用する。
    const [defaultList, setDefaultList] = React.useState<StarListObject[]>([
        defaultState
    ]);

    React.useEffect(() => {
        axios
            .get<StarListObject[]>(
                'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsStarelist'
            )
            .then(results => {
                const returnJson = results;
                console.log(returnJson.data[0]._fieldsProto.comment.stringValue);
                setStarList(returnJson.data);
                setDefaultList(returnJson.data);

                return returnJson;
            })
            .catch(error => {
                console.log('通信失敗');
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
                    defaultList[index]._fieldsProto.language.stringValue == e.target.value
            );
            setStarList(sortList);
        }
    };

    const sortRepositoryname = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const line = [...starList].sort(function (a, b) {
            if (e.target.value == 'down') {
                if (
                    a._fieldsProto.repositoryname.stringValue <
                    b._fieldsProto.repositoryname.stringValue
                ) {
                    return -1;
                }
                if (
                    a._fieldsProto.repositoryname.stringValue >
                    b._fieldsProto.repositoryname.stringValue
                ) {
                    return 1;
                }

                return 0;
            }
            if (
                a._fieldsProto.repositoryname.stringValue <
                b._fieldsProto.repositoryname.stringValue
            ) {
                return 1;
            }
            if (
                a._fieldsProto.repositoryname.stringValue >
                b._fieldsProto.repositoryname.stringValue
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
                    <UserIcon src="https://avatars0.githubusercontent.com/u/40754318?u=317d1aa7e970bafb23e4dd909767c94a26707c71&v=4" />
          by <a href="https://github.com/UndyingSugimoto?tab=stars">Watason</a>
                    <Button>新規リポジトリー登録</Button>
                    <Button onClick={e => { Test() }}>ログアウト</Button>
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
                                    <UserIcon src="https://avatars0.githubusercontent.com/u/40754318?u=317d1aa7e970bafb23e4dd909767c94a26707c71&v=4" />
                                    <ListTitl href={state._fieldsProto.url.stringValue}>
                                        {state._fieldsProto.repositoryname.stringValue}
                                    </ListTitl>
                                </ListHedder>
                                <tr>●　{state._fieldsProto.language.stringValue}</tr>
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
