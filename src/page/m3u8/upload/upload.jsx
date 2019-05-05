import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { uploadApi } from '../../../services/m3u8Service';

import styles from './upload.module.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mes: []
    };
  }

  componentDidMount() {
    const mySocket = new WebSocket('ws://192.168.180.19:3000', 'echo-protocol');

    mySocket.onopen = data => {
      console.log('onopen', data);
      mySocket.send('Hello WebSockets!');
    };

    mySocket.onclose = data => {
      console.log('onclose', data);
    };

    mySocket.onmessage = ({ data }) => {
      try {
        const { mes } = this.state;
        const res = JSON.parse(data);
        mes.push(res.data.msg);
        this.setState({ mes });
      } catch (e) {
        console.log(e);
      }
    };

    mySocket.onerror = data => {
      console.log('onerror', data);
    };
  }

  fileChanges = e => {
    this.setState({ mes: [] });
    const data = new FormData();
    data.append('file', e.target.files[0]);
    uploadApi(data)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { mes } = this.state;
    return (
      <div className={styles['upload']}>
        <div className={styles['upload-link']}>
          <NavLink to='/m3u8/audio'>
            <Button variant='contained' color='primary'>
              audio
            </Button>
          </NavLink>

          <NavLink to='/m3u8/video'>
            <Button variant='contained' color='secondary'>
              video
            </Button>
          </NavLink>
        </div>

        <input accept='video/*,audio/*' className={styles['input']} id='contained-button-file' multiple onChange={this.fileChanges} type='file' />
        <label htmlFor='contained-button-file'>
          <Button variant='contained' component='span'>
            Upload
          </Button>
        </label>
        {mes.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  }
}
