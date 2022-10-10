const INITIAL_STATE = {
  btnDisabled: false,
  seconds: 30,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SECONDS': {
    return {
      ...state,
      seconds: state.seconds - 1,
    };
  }
  case 'DISABLE_BUTTON': {
    return { btnDisabled: true };
  }
  default: {
    return state;
  }
  }
}

export default questions;
