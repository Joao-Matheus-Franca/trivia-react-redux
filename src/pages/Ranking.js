import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playAgain } from '../redux/actions/fetchActions';
import RankingTable from "../components/RankingTable";

class Ranking extends React.Component {
  goHome = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.goHome }
          data-testid="btn-go-home"
        >
          Tela inicial
        </button>
        <RankingTable />
      </>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
