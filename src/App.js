import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Reports from './components/Reports';
import apiClient from './services/api';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };

  const logout = () => {
    apiClient.post('/signout').then(response => {
      if(response.status === 204 ) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })
  };
  const authLink = loggedIn
  ? <button onClick = { logout } className = "nav-link btn btn-link">Выйти</button>
  : <NavLink to = '/signin' className = "nav-link">Войти</NavLink>;
  
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to='/' className="nav-link">ASRO</NavLink>
          </li>
          <li className="nav-item">
            {authLink}
          </li>
        </ul>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <Switch>
          <Route path='/' exact render={props => (
            <Reports {...props} loggedIn={loggedIn} />
          )} />
          <Route path='/signin' render={props => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
