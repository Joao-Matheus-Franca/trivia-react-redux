const INITIAL_STATE = {
  data: [],
  redirect: false,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_API': {
    return { ...state, data: action.json, redirect: true };
  }
  case 'ERROR_API': {
    localStorage.setItem('token', '');
    return { ...state, data: [] };
  }
  case 'PLAY_AGAIN': {
    return { ...state, redirect: false };
  }
  default: {
    return state;
  }
  }
}

export default questions;
