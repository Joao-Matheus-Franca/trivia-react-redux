import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    const number = -1;
    const maxNumber = 1;
    const array = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    array.sort(() => {
      if (Math.round(Math.random()) === maxNumber) {
        return number;
      }
      return number * number;
    });
    return (
      <>
        <Header />
        <h3 data-testid="question-category">{ questions[0].category }</h3>
        <h2 data-testid="question-text">{ questions[0].question }</h2>
        <div data-testid="answer-options" id="options">
          {
            array.map((e, i) => {
              if (e === questions[0].correct_answer) {
                return (
                  <button
                    key={ i }
                    type="button"
                    data-testid="correct-answer"
                  >
                    { e }
                  </button>
                );
              }
              return (
                <button
                  key={ i }
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                >
                  { e }
                </button>
              );
            })
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.data,
});

Game.propTypes = {
  questions: PropTypes.objectOf,
  category: PropTypes.string,
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Game);
