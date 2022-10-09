import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Game } />
      <Route exact path="/Configurações" component={ Settings } />
    </Switch>
  );
}
