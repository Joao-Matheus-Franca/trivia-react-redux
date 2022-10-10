import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends React.Component {
  state = {
    correctAnswers: [],
    incorrectAnswers: [],
  };

  componentDidMount() {
    this.teste();
  }

  teste = () => {
    const { questions } = this.props;

    const corrects = questions.map((q) => q.correct_answer);
    const incorrects = questions.map((q) => q.incorrect_answers);

    this.setState({ correctAnswers: corrects, incorrectAnswers: incorrects });
  };

  handleClick = ({ target }) => {
    const { correctAnswers, incorrectAnswers } = this.state;
    const btns = document.querySelectorAll('.answer-btn');

    console.log(incorrectAnswers, target);

    btns.forEach((b) => {
      if (correctAnswers.some((a) => a === b.innerText)) {
        return b.classList.add('correta');
      }
      return b.classList.add('incorreta');
    });
  };

  randomAnswer = () => {
    const { questions } = this.props;
    const number = -1;
    const maxNumber = 1;
    const array = [
      questions[0].correct_answer,
      ...questions[0].incorrect_answers,
    ];
    array.sort(() => {
      if (Math.round(Math.random()) === maxNumber) {
        return number;
      }
      return number * number;
    });
    return array;
  };

  render() {
    const { questions, disabled } = this.props;
    return (
      <>
        <Header />
        <h3 data-testid="question-category">{questions[0].category}</h3>
        <h2 data-testid="question-text">{questions[0].question}</h2>
        <div data-testid="answer-options" className="options">
          {this.randomAnswer().map((e, i) => {
            if (e === questions[0].correct_answer) {
              return (
                <button
                  key={ i }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleClick }
                  className="answer-btn"
                  disabled={ disabled }
                >
                  {e}
                </button>
              );
            }
            return (
              <button
                key={ i }
                type="button"
                data-testid={ `wrong-answer-${i}` }
                onClick={ this.handleClick }
                className="answer-btn"
                disabled={ disabled }
              >
                {e}
              </button>
            );
          })}
          <Timer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.data,
  disabled: state.timer.btnDisabled,
});

Game.propTypes = {
  questions: PropTypes.objectOf,
  category: PropTypes.string,
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Game);
