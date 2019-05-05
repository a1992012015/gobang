import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Header from './components/header/header';
import Notification from './components/notification';
import SwitchDefault from './components/switchDefault';
import LoadingComponent from './components/loadingComponent';

import styles from './App.module.scss';

const WebWorkGame = Loadable({
  loader: () => import('./page/webWorkGame/webWorkGame'),
  loading: LoadingComponent
});

const WebWorker = Loadable({
  loader: () => import('./page/webWorker/webWorker'),
  loading: LoadingComponent
});

const M3u8 = Loadable({
  loader: () => import('./page/m3u8'),
  loading: LoadingComponent
});

const Error = Loadable({
  loader: () => import('./page/error/error'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <section className={styles['App']}>
        <Header />

        <SwitchDefault>
          <Route exact={true} path='/' component={WebWorkGame} />
          <Route exact={true} path='/worker' component={WebWorker} />
          <Route path='/m3u8' component={M3u8} />
          <Route exact={true} path='/error' component={Error} />
        </SwitchDefault>

        <Notification />
      </section>
    );
  }
}

export default hot(module)(App);
