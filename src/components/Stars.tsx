import axios from 'axios';
import RootObject from '../../data/StarlistPayload';
import React from 'react';

const stares: React.FC = () => {
    const [count, setCount] = React.useState<RootObject[]>();
    const list = [];
    const data = axios
        .get<RootObject[]>(
            'https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/getsStarelist'
        )
        .then(results => {
            const returnJson = results;
            console.log(returnJson.data[0]._fieldsProto.comment.stringValue);
            setCount(returnJson.data);
            return returnJson
        })
        .catch(error => {
            console.log('通信失敗');
            console.log(error);
            // 失敗したときは空のjsonを返す
        });

    console.log(count)

    for (const i in count) {
        list.push(
            <div>
                <p>------------------------------</p>
                <li>
                    {/* {count[i]._fieldsProto.url.stringValue}」 */}
                </li>
                {/* <li>URL 「{data[i]._fieldsProto.url.stringValue}」</li>
          <li>使用言語「{data[i]._fieldsProto.language.stringValue}」</li>
          <li>
            コメント「{data[i]._fieldsProto.comment.stringValue}」
            <button>Edit</button>
          </li>
          <li>対象ドキュメント「{data[i]._ref._path.segments[5]}」</li>
          <button>消去</button> */}
                <p>------------------------------</p>
            </div>
        );
    }

    return <ul>{list}</ul>;
};

export default stares