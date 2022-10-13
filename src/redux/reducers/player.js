const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
  case 'SCORRE_1':
    return {
      ...state,
      score: action.obj.score,
      assertions: action.obj.assertions,
    };
  case 'RESET_PLAYER':
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default: {
    return state;
  }
  }
}

export default player;
