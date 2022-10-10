import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const tokenSrc = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <header>
          <h1>TRYBETRIVIA</h1>
          <p data-testid="header-player-name">{name}</p>
          <img
            src={ tokenSrc }
            alt={ hash }
            className="avatar-img"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
