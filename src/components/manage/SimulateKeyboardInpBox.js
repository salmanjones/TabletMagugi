import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {commonStyles} from '../../styles';

export class SimulateKeyboardInpBox extends React.PureComponent {
  constructor(props){
    super(props);

    this.state={
      pressKey:''
    }
  }

  pressKey(type,key){
    if(type=='num'){
      this.props.onPress(key);
    }else if(type=='del'){
      this.props.onBack();
    }else if(type=='clear'){
      this.props.onClear();
    }

    this.setState((prevState, props)=>{
      return {
        ...prevState,
        pressKey:key
      }
    })
  }

  render() {
    return (
      <View style={commonStyles.simulateKeyboardContent}>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','1')}>
          <View style={this.state.pressKey=='1' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','2')}>
          <View style={this.state.pressKey=='2' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','3')}>
          <View style={this.state.pressKey=='3' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','4')}>
          <View style={this.state.pressKey=='4' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>4</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','5')}>
          <View style={this.state.pressKey=='5' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','6')}>
          <View style={this.state.pressKey=='6' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>6</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','7')}>
          <View style={this.state.pressKey=='7' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>7</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','8')}>
          <View style={this.state.pressKey=='8' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>8</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','9')}>
          <View style={this.state.pressKey=='9' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>9</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'del','del')}>
          <View style={this.state.pressKey=='del' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardTextDelete}>删除</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','0')}>
          <View style={this.state.pressKey=='0' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressKey.bind(this,'num','.')}>
          <View  style={this.state.pressKey=='.' ? commonStyles.simulateKeyboardBtnActiveView:commonStyles.simulateKeyboardBtn}>
            <Text style={commonStyles.simulateKeyboardText}>.</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
