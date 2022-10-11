import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { scoreSomar } from '../redux/actions/fetchActions';
import Timer from '../components/Timer';

class Game extends React.Component {
  state = {
    correctAnswers: [],
    incorrectAnswers: [],
    currentQuestionIndex: 0,
    isQuestionActive: true,
    scorre: 0,
    assertions: 0,
    everyAnswers: [],
  };

  componentDidMount() {
    this.teste();
    this.randomAnswer(0);
  }

  teste = () => {
    const { questions } = this.props;

    const corrects = questions.map((q) => q.correct_answer);
    const incorrects = questions.map((q) => q.incorrect_answers);

    this.setState({ correctAnswers: corrects, incorrectAnswers: incorrects });
  };

  nextQuestion = (i) => {
    const { history } = this.props;
    const maxQuestions = 4;
    if (i < maxQuestions) {
      this.setState({ currentQuestionIndex: i + 1, isQuestionActive: true });
      this.randomAnswer(i + 1);
      const btns = document.querySelectorAll('.answer-btn');
      btns.forEach((b) => {
        b.className = 'answer-btn';
      });
    } else {
      history.push('/feedback');
    }
  };

  handleClick = ({ target }) => {
    const {
      correctAnswers,
      incorrectAnswers,
      currentQuestionIndex,
      scorre,
      assertions,
    } = this.state;
    const btns = document.querySelectorAll('.answer-btn');
    const base = 10;
    let dificuldade = 0;
    const { questions } = this.props;
    console.log(questions[currentQuestionIndex].difficulty);

    // logica incompleta pq eu estou usando o mesma pergunta
    switch (questions[currentQuestionIndex].difficulty) {
    case 'easy':
      dificuldade = 1;
      break;
    case 'medium':
      dificuldade = 2;
      break;
    case 'hard':
      dificuldade = '3';
      break;
    default:
      dificuldade = 0;
    }
    const { dispatch, timer } = this.props;
    if (target.getAttribute('data-testid') === 'correct-answer') {
      const adicionar = scorre + (base + timer * Number(dificuldade));
      const assertionsSum = assertions + 1;
      this.setState({ scorre: adicionar, assertions: assertionsSum }, () => {
        const obj = { score: adicionar, assertions: assertionsSum };
        dispatch(scoreSomar(obj));
      });
    }
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

  randomAnswer = (i) => {
    const { questions } = this.props;
    const number = -1;
    const maxNumber = 1;
    const array = [
      questions[i].correct_answer,
      ...questions[i].incorrect_answers,
    ];
    array.sort(() => {
      if (Math.round(Math.random()) === maxNumber) {
        return number;
      }
      return number * number;
    });
    this.setState({ everyAnswers: array });
  };

  render() {
    const { questions, timer } = this.props;
    const { isQuestionActive, currentQuestionIndex, everyAnswers } = this.state;
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
            {everyAnswers.map((e, i) => {
              if (e === questions[currentQuestionIndex].correct_answer) {
                return (
                  <button
                    key={ i }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ this.handleClick }
                    className="answer-btn"
                    disabled={ timer === 0 }
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
                  disabled={ timer === 0 }
                >
                  {e}
                </button>
              );
            })}
          </div>
          {(!isQuestionActive || timer === 0) && (
            <button
              type="button"
              onClick={ () => this.nextQuestion(currentQuestionIndex) }
              data-testid="btn-next"
            >
              Next
            </button>
          )}
          <Timer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.data,
  scorre: state.player.scorre,
  acetos: state.player.assertions,
  timer: state.timer.seconds,
});

Game.propTypes = {
  questions: PropTypes.objectOf,
  category: PropTypes.string,
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf,
  scorre: PropTypes.number,
  assertions: PropTypes.number,
  timer: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Game);
