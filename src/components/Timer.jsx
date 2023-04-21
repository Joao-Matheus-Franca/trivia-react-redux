import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerSeconds } from '../redux/actions/timerActions';

class Timer extends React.Component {
  iniciar = () => {
    const { dispatch } = this.props;
    const second = 1000;
    setTimeout(() => dispatch(timerSeconds()), second);
  };

  render() {
    const { timer, timerOn } = this.props;

    return (
      <div>
        {timerOn && timer > 0 && this.iniciar()}
        <h4>{timer}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.seconds,
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  timerOn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Timer);
