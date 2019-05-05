import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import styles from './navigationList.module.scss';

class NavigationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '/',
      navigation: [
        {
          path: '/',
          name: '五子棋',
          label: '/'
        },
        {
          path: '/worker',
          name: 'Worker',
          label: '/worker'
        },
        {
          path: '/m3u8',
          name: 'm3u8',
          label: '/m3u8'
        }
      ]
    };
  }

  componentDidMount() {
    const {
      history: {
        location: { pathname }
      }
    } = this.props;
    this.changeNavigationSelected(pathname);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      const {
        history: {
          location: { pathname }
        }
      } = this.props;
      this.changeNavigationSelected(pathname);
    }
  }

  handleChange = (event, value) => {
    this.props.history.push(value);
  };

  changeNavigationSelected = pathname => {
    const index = pathname.indexOf('/', 1) !== -1 ? pathname.indexOf('/', 1) : pathname.length;
    const value = pathname.slice(0, index);
    this.setState({ value });
  };

  render() {
    const { value, navigation } = this.state;
    return (
      <BottomNavigation value={value} onChange={this.handleChange} showLabels className={styles['navigation-list']}>
        {navigation.map(item => {
          return (
            <BottomNavigationAction
              value={item.label}
              key={`navigationList${item.label}`}
              classes={{
                selected: styles['navigation-action-selected'],
                root: styles['navigation-action-root']
              }}
              label={item.name}
            />
          );
        })}
      </BottomNavigation>
    );
  }
}

export default NavigationList;
