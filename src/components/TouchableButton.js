import React, { PureComponent, Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import { homeStyles } from 'styles';

const disableImage = require('@imgPath/index-border-will.png');

export class ToggleImageBackground extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isActive != this.props.isActive;
  }

  render() {
    const { isActive, style, children, disable = false } = this.props;
    return (
      <ImageBackground
        source={
          disable
            ? disableImage
            : isActive
              ? require('@imgPath/index-border-active.png')
              : require('@imgPath/index-border.png')
        }
        style={style}
      >
        {children}
      </ImageBackground>
    );
  }
}
