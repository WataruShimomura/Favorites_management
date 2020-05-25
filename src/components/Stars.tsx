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

    const list = [];

    React.useEffect(() => {
        axios
            .get<StarListObject[]>(
                'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsStarelist'
            )
            .then(results => {
                const returnJson = results;
                console.log(returnJson.data[0]._fieldsProto.comment.stringValue);
                setStarList(returnJson.data);
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
        setStarList(starList)
        console.log(starList[index]._fieldsProto.comment.stringValue);
    }

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
        setStarList(starList)
    };

    const deleteRepository = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        console.log('実行3');
        const repository = starList[index]._ref._path.segments[5];
        console.log(repository);
    }

    return <ul>{
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
};

export default Stares