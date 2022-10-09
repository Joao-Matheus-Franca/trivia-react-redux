const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_TOKEN': {
    localStorage.setItem('token', action.token);
    return state;
  }
  case 'GET_PLAYER_INFO':
    return {
      ...state,
      name: action.info.name,
      gravatarEmail: action.info.email,
    };
  default: {
    return state;
  }
  }
}

export default player;
