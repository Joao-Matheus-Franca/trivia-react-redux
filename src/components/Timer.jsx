import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerDisable, timerSeconds } from '../redux/actions/timerActions';

class Timer extends React.Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    const time = 500;
    setTimeout(() => {
      this.setState((prev) => ({ timer: prev.timer - 1 }));
    }, time);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const time = nextState.timer < 0;
    return !time;
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    const time = 500;
    if (prevState.timer >= 0) {
      setTimeout(() => {
        this.setState({ timer: prevState.timer - 1 });
        dispatch(timerSeconds(prevState.timer - 1));
      }, time);
    } if (prevState.timer === 0) {
      dispatch(timerDisable());
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <h4>{ timer }</h4>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.timer.seconds,
});

export default connect(mapStateToProps, null)(Timer);
