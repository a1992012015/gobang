import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import styles from './video.module.scss';

export default class extends Component {
  render() {
    const name = '4747304-1-16';
    const url = `http://localhost:3000/video/${name}/video.m3u8`;
    return (
      <div className={styles['video']}>
        <ReactPlayer url={url} playing={true} controls={true} loop={true} />
      </div>
    );
  }
}
