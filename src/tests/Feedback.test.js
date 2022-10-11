import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import {
  stateWith5Assertions,
  stateWithoutAssertions,
} from './helpers/mockState';

describe('Página de feedback', () => {
  test('Verifica se a página está sendo renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />, stateWithoutAssertions, '/feedback');

    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const feedbackAssertions = screen.getByTestId('feedback-total-question');
    const playAgainBtn = screen.getByTestId('btn-play-again');
    const rankingBtn = screen.getByTestId('btn-ranking');

    const feedbackElements = [
      feedbackText,
      feedbackScore,
      feedbackAssertions,
      playAgainBtn,
      rankingBtn,
    ];

    feedbackElements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Verifica as informações de feedback aparecem corretamente para nenhuma questão acertada', () => {
    renderWithRouterAndRedux(<App />, stateWithoutAssertions, '/feedback');

    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const feedbackAssertions = screen.getByTestId('feedback-total-question');

    expect(feedbackText).toHaveTextContent('Could be better...');
    expect(feedbackAssertions).toHaveTextContent(0);
    expect(feedbackScore).toHaveTextContent(0);
  });
  test('Verifica as informações de feedback aparecem corretamente para 5 questões acertadas', () => {
    renderWithRouterAndRedux(<App />, stateWith5Assertions, '/feedback');

    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const feedbackAssertions = screen.getByTestId('feedback-total-question');

    expect(feedbackText).toHaveTextContent('Well Done!');
    expect(feedbackAssertions).toHaveTextContent(5);
    expect(feedbackScore).toHaveTextContent(186);
  });
  test('Verifica se o botão de play again redireciona para a página de login', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      stateWithoutAssertions,
      '/feedback',
    );

    const playAgainBtn = screen.getByTestId('btn-play-again');

    userEvent.click(playAgainBtn);

    expect(history.location.pathname).toEqual('/');
  });
  test('Verifica se o botão de ranking redireciona para a página de ranking', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      stateWithoutAssertions,
      '/feedback',
    );

    const rankingBtn = screen.getByTestId('btn-ranking');

    userEvent.click(rankingBtn);

    expect(history.location.pathname).toEqual('/ranking');
  });
});
