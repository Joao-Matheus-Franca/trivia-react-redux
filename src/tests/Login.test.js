import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Settings from '../pages/Settings';
import mockFetch from './helpers/mockFetch';

describe('Login do player', () => {
  test('Verifica se o caminho do login está correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toEqual('/');
  });
  test('Verifica se a tela inicial é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    const loginElements = [emailInput, nameInput, playBtn, settingsBtn];

    loginElements.forEach((e) => expect(e).toBeInTheDocument());
  });
  test('Verifica se o botão play fica desabilitado quando necessário', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    expect(playBtn).toBeDisabled();

    userEvent.type(emailInput, 'email@email.com');

    expect(playBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(nameInput, 'nome');

    expect(playBtn).toBeDisabled();

    userEvent.type(emailInput, 'email@email.com');

    expect(playBtn).not.toBeDisabled();
  });
  test('Verifica se é feita uma requisição ao clicar no botão play', () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(nameInput, 'nome');

    userEvent.click(playBtn);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
  });
});
describe('Página de configurações', () => {
  test('Verifica se é redirecionado para página de configurações ao clicar no botão "settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsBtn = screen.getByTestId('btn-settings');

    userEvent.click(settingsBtn);

    expect(history.location.pathname).toBe('/Configurações');
  });
  test('Verifica se a página de configurações está sendo renderizada corretamente', () => {
    renderWithRouterAndRedux(<Settings />);

    const settingsTitle = screen.getByTestId('settings-title');

    expect(settingsTitle).toBeInTheDocument();
  });
});
