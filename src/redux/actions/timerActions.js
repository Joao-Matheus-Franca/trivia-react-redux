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
