const DISABLE_BUTTON = 'DISABLE_BUTTON';
const SECONDS = 'SECONDS';

export function timerSeconds() {
  return {
    type: SECONDS,
  };
}

export function timerDisable() {
  return {
    type: DISABLE_BUTTON,
  };
}

export function stopTimer() {
  return {
    type: 'STOP_TIMER',
  };
}

export function resetTimer() {
  return {
    type: 'RESET_TIMER',
  };
}
