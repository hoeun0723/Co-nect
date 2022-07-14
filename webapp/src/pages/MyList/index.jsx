import React, { useState, useEffect } from 'react';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import teamApi from 'api/team';
import userApi from 'api/user';
import Tabs from 'components/Tabs';
import UserCard from 'components/UserCard';
import TeamCard from 'components/TeamCard';
import { TEAM, USER } from 'constant/route';
import * as S from './style';

export default function MyList() {
  const [listTabId, setListTabId] = useState(LIKES_ID);
  const [postTabId, setPostTabId] = useState(USER_ID);
  const [cards, setCards] = useState([]);

  const isUserList = postTabId === USER_ID;
  const CardComponent = isUserList ? UserCard : TeamCard;
  const clickLink = isUserList ? USER : TEAM;

  const fetcher = async (listId, postId) => {
    const activedFetcher = fetcherObj[postId][listId];
    const { value, isError, error } = await handleFetcher(activedFetcher);
    if (isError) {
      console.error(error);
    }
    setCards(value);
  };

  useEffect(() => {
    fetcher(listTabId, postTabId);
  }, [listTabId, postTabId]);

  return (
    <S.Container>
      <Tabs tabs={LIST_TYPE_TABS} activeTabId={listTabId} setActiveTab={setListTabId} />
      <Tabs tabs={POST_TYPE_TABS} activeTabId={postTabId} setActiveTab={setPostTabId} />
      <Cards cards={cards} CardComponent={CardComponent} clickLink={`${clickLink}/`} />
    </S.Container>
  );
}

const LIKES_ID = 'like';
const READS_ID = 'read';
const USER_ID = 'user';
const TEAM_ID = 'team';

const LIST_TYPE_TABS = [
  { id: LIKES_ID, title: '좋아요 누른 리스트' },
  { id: READS_ID, title: '읽은 목록' },
];

const POST_TYPE_TABS = [
  { id: USER_ID, title: '유저' },
  { id: TEAM_ID, title: '팀' },
];

const fetcherObj = {
  [USER_ID]: {
    [LIKES_ID]: userApi.GET_USER_LIKES,
    [READS_ID]: userApi.GET_USER_READS,
  },
  [TEAM_ID]: {
    [LIKES_ID]: teamApi.GET_TEAM_LIKES,
    [READS_ID]: teamApi.GET_TEAM_READS,
  },
};