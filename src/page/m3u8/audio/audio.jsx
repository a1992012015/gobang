import React, { Component } from 'react';
import { Howl, Howler } from 'howler';
import { BigNumber } from 'bignumber.js';
import { Button } from '@material-ui/core';

import styles from './audio.module.scss';

class AudioPlayer extends Component {
  sound = null;
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      play: false,
      volume: 50,
      loop: false,
      totalTime: '00:00',
      nowTime: '00:00',
      time: 0
    };
  }

  componentDidMount() {
    const name = '片岡真央 岩田恭明 - カッシーワのテーマ';
    const url = `http://localhost:3000/video/${name}/video.m3u8`;
    this.sound = new Howl({
      src: [url],
      onend: this.onend,
      onplay: this.onplay
    });
    Howler.volume(0.5);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.sound.pause();
  }

  onplay = () => {
    const totalTime = this.formatTime(this.sound.duration());
    this.setState({ totalTime });
  };

  formatTime = time => {
    const secs = Math.round(time);
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = secs - minutes * 60 || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  setTime = () => {
    this.timer = setInterval(() => {
      const week = Math.round(this.sound.seek());
      const duration = Math.round(this.sound.duration());
      const nowTime = this.formatTime(this.sound.seek());
      const time = Math.round(
        new BigNumber(week)
          .dividedBy(duration)
          .multipliedBy(100)
          .toNumber()
      );
      this.setState({
        nowTime: nowTime,
        time: time
      });
    }, 1000);
  };

  onend = () => {
    const { loop } = this.state;
    if (!loop) {
      this.setState({
        play: false
      });
      clearInterval(this.timer);
    }
  };

  play = () => {
    const { play } = this.state;
    if (!play) {
      this.sound.play();
      this.setTime();
    } else {
      this.sound.pause();
      clearInterval(this.timer);
    }
    this.setState({
      play: !play
    });
  };

  changeVolume = value => {
    this.setState({
      volume: value
    });
    Howler.volume(value / 100);
  };

  onLoop = () => {
    const { loop } = this.state;
    this.setState({
      loop: !loop
    });
    this.sound.loop(!loop);
  };

  changeTime = value => {
    const duration = Math.round(this.sound.duration());
    const time = new BigNumber(value)
      .dividedBy(100)
      .multipliedBy(duration)
      .toNumber();
    this.sound.seek(time);
  };

  formatter = () => {
    const { nowTime } = this.state;
    return nowTime;
  };

  render() {
    const { play, volume, loop, totalTime, nowTime, time } = this.state;
    return (
      <div className={styles['audio']}>
        <Button variant='contained' component='span' onClick={this.play}>
          play
        </Button>
        <Button variant='contained' component='span' onClick={this.onLoop}>
          onLoop
        </Button>
      </div>
    );
  }
}

export default AudioPlayer;
