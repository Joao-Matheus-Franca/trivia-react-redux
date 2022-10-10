import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { scoreSomar } from '../redux/actions/fetchActions';

class Game extends React.Component {
  state = {
    correctAnswers: [],
    incorrectAnswers: [],
    scorre: 0,
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
    const base = 10;
    const timer = 30;
    let dificuldade = 0;
    const { questions } = this.props;
    console.log(questions[0].difficulty);

    // logica incompleta pq eu estou usando o mesma pergunta
    switch (questions[0].difficulty) {
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

    const { correctAnswers, incorrectAnswers, scorre } = this.state;
    const { dispatch } = this.props;
    const btns = document.querySelectorAll('.answer-btn');
    if (target.getAttribute('data-testid') === 'correct-answer') {
    // problema mais ou menoos feito falta implementar a logica de maior pontuação dependendo do tempo * dificuldade

      const adicionar = scorre + (base + (timer * Number(dificuldade)));
      this.setState({ scorre: adicionar });
      dispatch(scoreSomar(scorre));
    }
    // Coloquei esse log aqui porque vamos precisar dessas informações no futuro
    // e o lint tava reclamando que não tava sendo usado em nenhum lugar
    // então taquei elas num console.log pra não perder as informações
    console.log(incorrectAnswers, target);

    btns.forEach((b) => {
      if (correctAnswers.some((a) => a === b.innerText)) {
        return b.classList.add('correta');
      }
      return b.classList.add('incorreta');
    });
  };

  render() {
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
    return (
      <>
        <Header />
        <h3 data-testid="question-category">{questions[0].category}</h3>
        <h2 data-testid="question-text">{questions[0].question}</h2>
        <div data-testid="answer-options" className="options">
          {array.map((e, i) => {
            if (e === questions[0].correct_answer) {
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.data,
  scorre: state.player.scorre,
  acetos: state.player.assertions,
});

Game.propTypes = {
  questions: PropTypes.objectOf,
  category: PropTypes.string,
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf,
  scorre: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Game);
