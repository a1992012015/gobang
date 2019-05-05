import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';

import SwitchDefault from '../../components/switchDefault';
import LoadingComponent from '../../components/loadingComponent';

const Upload = Loadable({
  loader: () => import('./upload/upload'),
  loading: LoadingComponent
});

const Audio = Loadable({
  loader: () => import('./audio/audio'),
  loading: LoadingComponent
});

const Video = Loadable({
  loader: () => import('./video/video'),
  loading: LoadingComponent
});

export default class extends Component {
  render() {
    const { match } = this.props;
    return (
      <SwitchDefault>
        <Route exact={true} path={match.path} component={Upload} />
        <Route exact={true} path={`${match.path}/audio`} component={Audio} />
        <Route exact={true} path={`${match.path}/video`} component={Video} />
      </SwitchDefault>
    );
  }
}
