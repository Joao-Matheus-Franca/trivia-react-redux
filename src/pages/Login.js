import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI, { getPlayerInfo } from '../redux/actions/fetchActions';
import { resetTimer } from '../redux/actions/timerActions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
    settings: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateBtn);
  };

  validateBtn = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      return this.setState({ isBtnDisabled: false });
    }
    return this.setState({ isBtnDisabled: true });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
    dispatch(getPlayerInfo(this.state));
    dispatch(resetTimer());
  };

  settingsBtn = () => {
    this.setState({ settings: true });
  };

  render() {
    const { isBtnDisabled, settings } = this.state;
    const { redirect } = this.props;
    return settings ? (
      <Redirect to={ { pathname: '/Configurações' } } />
    ) : (
      <>
        <h1>Login</h1>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isBtnDisabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        {redirect && <Redirect to="/jogo" />}
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsBtn }
        >
          settings
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  redirect: state.questions.redirect,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Login);
