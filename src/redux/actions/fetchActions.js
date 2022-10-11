const GET_TOKEN = 'GET_TOKEN';
const GET_API = 'GET_API';
const ERROR_API = 'ERROR_API';
const GET_PLAYER_INFO = 'GET_PLAYER_INFO';
const SCORRE_1 = 'SCORRE_1';
const PLAY_AGAIN = 'PLAY_AGAIN';

const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export function scoreSomar(obj) {
  return {
    type: SCORRE_1,
    obj,
  };
}

function requestToken(token) {
  return {
    type: GET_TOKEN,
    token,
  };
}

function requestAPI(json) {
  return {
    type: GET_API,
    json,
  };
}

function errorAPI() {
  return {
    type: ERROR_API,
  };
}

function fetchAPI() {
  return async (dispatch) => {
    const response = await fetch(ENDPOINT);
    const token = await response.json();
    dispatch(requestToken(token.token));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const dataQuestions = await fetchQuestions.json();
    if (dataQuestions.results.length === 0) {
      dispatch(errorAPI());
    }
    if (dataQuestions.results.length > 0) {
      dispatch(requestAPI(dataQuestions.results));
    }
  };
}

export function playAgain() {
  return {
    type: PLAY_AGAIN,
  };
}

export function getPlayerInfo(info) {
  return {
    type: GET_PLAYER_INFO,
    info,
  };
}

export default fetchAPI;
