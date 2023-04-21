const INITIAL_STATE = {
  btnDisabled: false,
  seconds: 30,
  timerOn: true,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SECONDS': {
    return {
      ...state,
      seconds: state.seconds - 1,
    };
  }
  case 'STOP_TIMER': {
    return { ...state, timerOn: false };
  }
  case 'RESET_TIMER': {
    return { ...state, seconds: 30, timerOn: true };
  }
  default: {
    return state;
  }
  }
}

export default questions;
