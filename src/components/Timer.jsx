import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerSeconds } from '../redux/actions/timerActions';

class Timer extends React.Component {
  componentDidMount() {
    this.iniciar();
  }

  iniciar = () => {
    const timeSubtraction = 1000;
    return setInterval(() => {
      this.controlTimer();
    }, timeSubtraction);
  };

  controlTimer = () => {
    const { dispatch, timer } = this.props;
    if (timer > 0) {
      dispatch(timerSeconds());
    }
  };

  render() {
    const { timer } = this.props;
    return (
      <h4>{ timer }</h4>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.seconds,
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Timer);
