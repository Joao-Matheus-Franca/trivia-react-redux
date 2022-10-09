const INITIAL_STATE = {
  data: [],
  redirect: false,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_API': {
    return { data: action.json, redirect: true };
  }
  case 'ERROR_API': {
    localStorage.setItem('token', '');
    return { data: [] };
  }
  default: {
    return state;
  }
  }
}

export default questions;
