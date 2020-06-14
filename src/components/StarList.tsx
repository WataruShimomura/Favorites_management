import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StarListObject from '../../data/StarlistPayload';

type Props = {
  user: String;
  stars: StarListObject;
  index: number;
  update: (index: number, after: StarListObject) => void;
  delete: (index: number) => void;
};

const StarList: React.FC<Props> = props => {
  const [display, setDisplay] = React.useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.stars._fieldsProto.comment.stringValue = e.target.value;
  };

  const UpdataComment = () => {
    const acount = props.user;
    const repository = props.stars._ref._path.segments[5];
    const reqRepository = `https://asia-northeast1-githubdb-d71b1.cloudfunctions.net/addComment?repository=${repository}`;
    const reqComment = `&comment=${props.stars._fieldsProto.comment.stringValue}`;
    const reqAcount = `&acount=${acount}`;
    const req = reqRepository + reqComment + reqAcount;
    axios.get(req);
    props.stars._fieldsProto.comment.stringValue =
      props.stars._fieldsProto.comment.stringValue;
    props.update(props.index, props.stars);
    setDisplay(true);
  };

  const deleteRepository = () => {
    props.delete(props.index);
  };

  const commentDisplay = (display: boolean) => {
    display ? setDisplay(false) : setDisplay(true);
  };

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

  const DeleteButton = styled(ButtonStyled)`
    background: #808000;
    color: #fff;
    position: relative;
    left: 90%;
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

  const CommentSummary = styled.summary`
    position: relative;
    z-index: 2;
    padding: 0.5em;
  `;

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
          onClick={() => {
            deleteRepository();
          }}
        >
          消去
        </DeleteButton>
      </ListDetails>
      <ListHedder>
        <UserIcon src={props.stars._fieldsProto.ownerIcon.stringValue} />
        <ListTitl href={props.stars._fieldsProto.url.stringValue}>
          {props.stars._fieldsProto.name.stringValue}
        </ListTitl>
      </ListHedder>
      <div>
        primaryLanguage：
        <ListLanguage>
          {props.stars._fieldsProto.primaryLanguage.stringValue}
        </ListLanguage>
      </div>
      <div>
        Memo：
        {display ? (
          <ListMemo>{props.stars._fieldsProto.comment.stringValue}</ListMemo>
        ) : (
          <label>
            <input
              type="text"
              placeholder="コメントを入力"
              onChange={e => {
                handleChange(e);
              }}
              onBlur={() => {
                UpdataComment();
              }}
            />
          </label>
        )}
      </div>
    </StarListLayout>
  );
};

export default StarList;
