const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_TOKEN': {
    localStorage.setItem('token', action.token);
    return state;
  }
  default: {
    return state;
  }
  }
}

export default player;
