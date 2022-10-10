import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    correctAnswers: [],
    incorrectAnswers: [],
    currentQuestionIndex: 0,
    isQuestionActive: true,
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

  nextQuestion = (i) => {
    const maxQuestions = 4;
    if (i < maxQuestions) {
      this.setState({ currentQuestionIndex: i + 1, isQuestionActive: true });
      const btns = document.querySelectorAll('.answer-btn');
      btns.forEach((b) => {
        b.className = 'answer-btn';
      });
    }
  };

  handleClick = ({ target }) => {
    const { correctAnswers, incorrectAnswers, currentQuestionIndex } = this.state;
    const btns = document.querySelectorAll('.answer-btn');

    // Coloquei esse log aqui porque vamos precisar dessas informações no futuro
    // e o lint tava reclamando que não tava sendo usado em nenhum lugar
    // então taquei elas num console.log pra não perder as informações
    
    console.log(incorrectAnswers, target);

    btns.forEach((b) => {
      if (correctAnswers[currentQuestionIndex] === b.innerText) {
        b.className = 'answer-btn correta';
      } else {
        b.className = 'answer-btn incorreta';
      }
    });
    this.setState({ isQuestionActive: false });
  };

  render() {
    const { currentQuestionIndex, isQuestionActive } = this.state;
    const { questions } = this.props;
    const number = -1;
    const maxNumber = 1;
    const array = [
      questions[currentQuestionIndex].correct_answer,
      ...questions[currentQuestionIndex].incorrect_answers,
    ];
    array.sort(() => {
      if (Math.round(Math.random()) === maxNumber) {
        return number;
      }
      return number * number;
    });
    return (
      <>
        <Header />
        <div className="quiz-container">
          <h3 data-testid="question-category">
            {questions[currentQuestionIndex].category}
          </h3>
          <h2 data-testid="question-text">
            {questions[currentQuestionIndex].question}
          </h2>
          <div data-testid="answer-options" className="options">
            {array.map((e, i) => {
              if (e === questions[currentQuestionIndex].correct_answer) {
                return (
                  <button
                    key={ i }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ this.handleClick }
                    className="answer-btn"
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
                >
                  {e}
                </button>
              );
            })}
          </div>
          {!isQuestionActive && (
            <button
              type="button"
              onClick={ () => this.nextQuestion(currentQuestionIndex) }
              data-testid="btn-next"
            >
              Next
            </button>
          )}
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
