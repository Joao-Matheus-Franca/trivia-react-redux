import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
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

  render() {
    const { isBtnDisabled } = this.state;
    return (
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
        >
          Jogar
        </button>
      </>
    );
  }
}

export default Login;
