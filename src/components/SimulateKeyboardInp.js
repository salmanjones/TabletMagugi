import React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { SimulateKeyboard } from 'components';

import { commonStyles } from 'styles';
const imgConfirmBtn = require('@imgPath/search-text.png');
export class SimulateKeyboardInp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      number: props.number.toString(),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ number: nextProps.number });
  }

  onBack = () => {
    this.setState({ number: this.state.number.slice(0, -1) });
  };

  onClear = () => {
    this.setState({ number: '' });
  };

  onConfirm = () => {
    this.props.onConfirm && this.props.onConfirm(this.state.number);
  };

  onPress = num => {
    let number = this.state.number;
    if (number.length > 11) return;
    this.setState({ number: number.toString() + num.toString() });
  };

  render() {
    const { onConfirm, display } = this.props;
    const { number } = this.state;
    return (
      <View
        style={[
          commonStyles.simulateKeyboardInpContent,
          { display: display ? 'flex' : 'none' },
        ]}
      >
        <Text style={commonStyles.simulateKeyboardInp}>{number}</Text>
        <SimulateKeyboard
          onPress={this.onPress}
          onBack={this.onBack}
          onClear={this.onClear}
        />
        <TouchableOpacity style={commonStyles.btnbox} onPress={this.onConfirm}>
          <Image resizeMethod="resize"
            source={imgConfirmBtn}
            style={commonStyles.searchBtnImg}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
