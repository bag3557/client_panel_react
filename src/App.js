import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/Auth';

import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/layouts/Dashboard';
import AddClient from './components/clients/AddClient';

import './App.css';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AppNavbar from './components/layouts/AppNavbar';
import Settings from './components/settings/Settings';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
              <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
              <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
              <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
              <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
              <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
            </Switch>
          </div>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
