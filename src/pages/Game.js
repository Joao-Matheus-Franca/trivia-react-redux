import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import { scoreSomar } from '../redux/actions/fetchActions';
import Timer from '../components/Timer';
import { resetTimer, stopTimer } from '../redux/actions/timerActions';

class Game extends React.Component {
  state = {
    correctAnswers: [],
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

    this.setState({ correctAnswers: corrects });
  };

  nextQuestion = (i) => {
    const { history, dispatch } = this.props;
    const maxQuestions = 4;
    dispatch(resetTimer());
    if (i < maxQuestions) {
      this.setState({ currentQuestionIndex: i + 1, isQuestionActive: true });
      this.randomAnswer(i + 1);
      const btns = document.querySelectorAll('.answer-btn');
      btns.forEach((b) => {
        b.className = 'answer-btn';
      });
    } else {
      this.sentToLocalStorage();
      history.push('/feedback');
    }
  };

  sentToLocalStorage = () => {
    const { scorre } = this.state;
    const { gravatarEmail, name } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const storage = localStorage.getItem('ranking');
    const playerData = { name, score: scorre, picture };

    if (!storage) {
      localStorage.setItem('ranking', JSON.stringify([playerData]));
    } else {
      const newStorage = JSON.parse(storage);
      localStorage.setItem(
        'ranking',
        JSON.stringify([...newStorage, playerData]),
      );
    }
  };

  handleClick = ({ target }) => {
    const { correctAnswers, currentQuestionIndex, scorre, assertions } = this.state;
    const { dispatch, timer } = this.props;
    const btns = document.querySelectorAll('.answer-btn');
    const base = 10;
    let dificuldade = 0;
    const { questions } = this.props;
    dispatch(stopTimer());

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

    // console.log(incorrectAnswers, target);

    btns.forEach((b) => {
      if (correctAnswers[currentQuestionIndex].match(b.innerText)) {
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
    const { questions, timer, timerOn } = this.props;
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
          <Timer timerOn={ timerOn } />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  questions: state.questions.data,
  scorre: state.player.scorre,
  acetos: state.player.assertions,
  timer: state.timer.seconds,
  timerOn: state.timer.timerOn,
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
