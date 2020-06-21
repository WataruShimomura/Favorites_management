import React from 'react';
import styled from 'styled-components';
import UpdataComment from '../external/UpdataComment';
import { listTitleFormatter } from '../util/ListTitleFormatter';
import StarDataRes from '../../data/StarDataRes';
import icon from './../static/memuicon.png';

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
    width: 25px;
    position: relative;
    z-index: 0;
    display: flex;
    cursor: pointer;
    font-size: 10px;
    float: right;
    text-align: center;
    border-radius: 10px;

    &:hover {
      background: #eee;
      border-radius: 3px;
    }
  `;

  const ListMenu = styled.div`
    width: 100px;
    background: #fff;
    text-align: center;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    float: right;
    border-radius: 10px;
  `;

  const MenuContents = styled.div`
    cursor: pointer;
    margin: 10px;
    font-size: 11px;
    text-align: center;
    border-bottom: 1px solid #ddd;

    &:hover {
      background: #eee;
      box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.4);
      border-radius: 3px;
    }
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
          <CommentSummary>
            <img src={icon} width="13" height="13" />
          </CommentSummary>
          <ListMenu>
            <MenuContents
              onClick={e => {
                openDisplay(display);
              }}
            >
              メモ編集
            </MenuContents>
            <MenuContents
              onClick={() => {
                deleteRepository();
              }}
            >
              お気に入り消去
            </MenuContents>
          </ListMenu>
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
              placeholder={props.stars.comment}
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
