import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Register component here
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Dashboard } />
    </Switch>
  );
}

export default connect(null, null)(App);
