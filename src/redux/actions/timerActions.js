const DISABLE_BUTTON = 'DISABLE_BUTTON';
const SECONDS = 'SECONDS';

export function timerSeconds(restante) {
  return {
    type: SECONDS,
    value: restante,
  };
}

export function timerDisable() {
  return {
    type: DISABLE_BUTTON,
  };
}
