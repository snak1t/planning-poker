import React from 'react';
import { connect } from 'react-redux';
import { pick, map, addIndex } from 'ramda';
import ChatContainer from '../Chat/chat.container';
const indexedMap = addIndex(map);

export const PlayersContainer = ({ players: { all: players } }) => {
  const displayPlayers = indexedMap((p, id) => (
    <li key={id}>User = {p.login}, score = {JSON.stringify(p.score)}</li>
  ));
  return (
    <div>
      <ul>
        {displayPlayers(players)}
      </ul>
      <ChatContainer />
    </div>
  );
};

const mapStateToProps = pick(['players']);

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);
