/**
 *
 * App
 *
 */

import React from 'react';
import './App.scss';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <p className="app-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App.propTypes = {
};

export default App;
