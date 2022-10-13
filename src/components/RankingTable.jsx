import React, { Component } from 'react';

export default class RankingTable extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const data = localStorage.getItem('ranking');
    const ranking = JSON.parse(data);
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        {ranking.map((e, i) => (
          <div key={ i }>
            <img src={ e.picture } alt={ `player-${i}-avatar` } />
            <h2 data-testid={ `player-name-${i}` }>{e.name}</h2>
            <h3 data-testid={ `player-score-${i}` }>{e.score}</h3>
          </div>
        ))}
      </div>
    );
  }
}
