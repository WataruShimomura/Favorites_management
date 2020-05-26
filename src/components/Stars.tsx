import axios from 'axios';
import StarListObject from '../../data/StarlistPayload';
import React, { useState } from 'react';

const defaultState: StarListObject = {
    _fieldsProto: {
        comment: {
            stringValue: "",
            valueType: "",
        },
        language: {
            stringValue: "",
            valueType: "",
        },
        repositoryname: {
            stringValue: "",
            valueType: "",
        },
        url: {
            stringValue: "",
            valueType: "",
        },
    },
    _ref: {
        _path: {
            segments: ["", "", "", "", "", ""],
        },
    },
}

const Stares: React.FC = () => {

    let [starList, setStarList] = React.useState<StarListObject[]>([defaultState]);
    //フィルター機能を初期化するために使用する。
    let [defaultList, setDefaultList] = React.useState<StarListObject[]>([defaultState]);

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
                return returnJson
            })
            .catch(error => {
                console.log('通信失敗');
                console.log(error);
                // 失敗したときは空のjsonを返す
            });
    }, [])

    starList = starList as Array<StarListObject>

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        console.log('実行1');
        console.log(index);
        console.log(e.target.value);
        starList[index]._fieldsProto.comment.stringValue = e.target.value;
        // const newlist = [...starList];
        // setStarList(newlist)
        // console.log(starList[index]._fieldsProto.comment.stringValue);
    }

    console.log("defaultlist=" + defaultList[0]._fieldsProto.comment.stringValue);

    const UpdataComment = (e: React.MouseEvent<HTMLInputElement>, index: number) => {
        console.log('実行２');
        console.log(starList[index]._fieldsProto.comment.stringValue);
        const repository = starList[index]._ref._path.segments[5];
        console.log(repository);
        const reqRepository = 'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/addComment?repository=' + repository;
        const reqComment = '&comment=' + starList[index]._fieldsProto.comment.stringValue;
        const req = reqRepository + reqComment
        console.log(req);
        axios
            .get(req)
        starList[index]._fieldsProto.comment.stringValue = starList[index]._fieldsProto.comment.stringValue;
        const newlist = [...starList];
        setStarList(newlist)
    };

    const deleteRepository = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        console.log('実行3');
        const repository = starList[index]._ref._path.segments[5];
        console.log(repository);
    }

    const filterLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("フィルタ実行、対象は" + e.target.value);
        setStarList(defaultList)
        if (e.target.value != "all") {
            const sortList = [...defaultList].filter(function (item, index, array) {

                return (defaultList[index]._fieldsProto.language.stringValue == e.target.value);
            });
            setStarList(sortList)
        }
    }

    return <div>
        <h1>お気に入り一覧</h1>
      並び替え
      使用言語<select name="使用言語" onChange={((e) => { filterLanguage(e) })}>
            <option value="all">ALL</option>
            <option value="Java">Java</option>
            <option value="React">React</option>
        </select>
                リポジトリ名<select name="リポジトリ名">
            <option value="down">降順</option>
            <option value="up">昇順</option>
        </select>
        <ul>{
            starList.map(
                (state, index) => {
                    return (
                        <div>
                            <p>------------------------------</p>
                            <li>
                                リポジトリ名「{state._fieldsProto.repositoryname.stringValue}」
                    </li>
                            <li>URL 「{state._fieldsProto.url.stringValue}」</li>
                            <li>使用言語「{state._fieldsProto.language.stringValue}」</li>
                            <li>
                                コメント「{state._fieldsProto.comment.stringValue}」
                    <form>
                                    <label>
                                        <textarea name="message-body" placeholder="コメントを入力" onChange={((e) => { handleChange(e, index) })}></textarea>
                                    </label>
                                    <input type="button" value="コメント更新" onClick={((e) => { UpdataComment(e, index) })} />
                                </form>
                            </li>
                            <li>対象ドキュメント「{state._ref._path.segments[5]}」</li>
                            <button onClick={((e) => { deleteRepository(e, index) })}>消去</button>
                            <p>------------------------------</p>
                        </div>
                    )
                }
            )
        }</ul>;
    </div>
};

export default Stares