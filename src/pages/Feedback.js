import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { playAgain } from '../redux/actions/fetchActions';

class Feedback extends Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    const msg = assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!';
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <p data-testid="feedback-text">{ msg }</p>
        <h3>Pontuação obtida:</h3>
        <h5 data-testid="feedback-total-score">{ score }</h5>
        <h3>Questões acertadas:</h3>
        <h5 data-testid="feedback-total-question">{ assertions }</h5>
        <button
          type="button"
          onClick={ this.playAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.ranking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
