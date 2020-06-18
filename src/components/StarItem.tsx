import React from 'react';
import styled from 'styled-components';
import UpdataComment from '../external/UpdataComment';
import { listTitleFormatter } from '../util/ListTitleFormatter';
import StarDataRes from '../../data/StarDataRes';

type Props = {
  user: String;
  stars: StarDataRes;
  index: number;
  update: (index: number, after: StarDataRes) => void;
  delete: (index: number) => void;
};

const StarList: React.FC<Props> = props => {
  const [display, setDisplay] = React.useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.stars.comment = e.target.value;
  };

  const updataComment = () => {
    UpdataComment(props.user, props.stars.comment, props.stars.starId);
    props.update(props.index, props.stars);
    setDisplay(true);
  };

  const deleteRepository = () => {
    props.delete(props.index);
  };

  const openDisplay = (display: boolean) => {
    display ? setDisplay(false) : setDisplay(true);
  };

  //styled-components
  const UserIcon = styled.img`
    border-radius: 10px;
    height: 30px;
    margin: 5px;
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

  const ListLayout = styled(ListComponent)`
    margin-top: 14px;
    margin-right: 10px;
    margin-bottom: 14px;
    margin-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    width: 22%;
  `;

  const ListDetails = styled.details`
    width: 10%;
    position: relative;
    z-index: 2;
    display: flex;
    cursor: pointer;
    font-size: 10px;
    float: right;
  `;

  const ListHeader = styled.div`
    background: #fff;
    border-bottom: 1px solid #aaa;
  `;

  const ListTitle = styled.a`
    text-decoration: inherit;
    text-align: center;
    position: relative;
    font-size: 23px;
  `;

  const ListLanguage = styled.span`
    background: #ddd;
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid #aaa;
    padding: 3px;
    margin: 10px;
  `;

  const ListMemoItem = styled.div`
    margin: 5px;
  `;

  const ListMemo = styled.span`
    background: #fff;
    border-bottom: 1px solid #aaa;
    margin-left: 10px;
  `;

  const CommentSummary = styled.summary`
    position: relative;
    z-index: 2;
    padding: 0.5em;

    &::-webkit-details-marker {
      display: none;
    }
  `;

  return (
    <ListLayout>
      <ListHeader>
        <UserIcon src={props.stars.ownerIcon} />
        <ListTitle href={props.stars.url}>
          {listTitleFormatter(props.stars.name)}
        </ListTitle>
        <ListLanguage>{props.stars.primaryLanguage}</ListLanguage>
        <ListDetails>
          <CommentSummary>...</CommentSummary>
          <input
            type="button"
            value="コメント更新"
            onClick={e => {
              openDisplay(display);
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
      </ListHeader>
      <div>
        <ListMemoItem>Memo</ListMemoItem>
      </div>
      <div>
        {display ? (
          <ListMemo>{props.stars.comment}</ListMemo>
        ) : (
          <label>
            <input
              type="text"
              placeholder="コメントを入力"
              onChange={e => {
                handleChange(e);
              }}
              onBlur={() => {
                updataComment();
              }}
            />
          </label>
        )}
      </div>
    </ListLayout>
  );
};

export default StarList;
