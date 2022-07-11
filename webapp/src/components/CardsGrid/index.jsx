import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

Cards.propTypes = {
  CardComponent: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  clickLink: PropTypes.string,
};

export default function Cards({ CardComponent, cards, clickLink }) {
  const navaigate = useNavigate();
  const handleClickCardComponent = (cardId) => {
    console.log(cardId);
    clickLink && navaigate(clickLink + cardId);
  };
  return (
    <S.Cards>
      {cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map(({ id, ...cardInfo }) => (
          <CardComponent
            key={id}
            onClick={() => handleClickCardComponent(id)}
            cardInfo={{ ...cardInfo, id }}
          />
        ))
      )}
    </S.Cards>
  );
}
