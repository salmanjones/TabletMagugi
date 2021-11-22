import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';

import { commonStyles } from 'styles';

export class SearchModule extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      query: '',
      searchFocus: false,
    };
  }

  onSearch = () => {
    const { onSearchPress } = this.props;
    const { query } = this.state;

    this.setState({ searchFocus: false }, () => {
      onSearchPress(query);
    });
  };

onResetPress = () => {
    const { onResetPress } = this.props;
    this.setState({ query: '' }, () => {
        onResetPress && onResetPress();
    });
  };

  render() {
    const { placeholder, keyboardType, wrapperStyle = {} } = this.props;
    const { searchFocus } = this.state;

    return (
      <View style={wrapperStyle}>
        <View style={commonStyles.searchContent}>
          <ImageBackground
            source={
              searchFocus
                ? require('@imgPath/search-left-active.png')
                : require('@imgPath/search-left.png')
            }
            style={commonStyles.searchInpBox}
          >
            <TextInput
              maxLength={30}
              keyboardType={keyboardType || 'default'}
              placeholder={placeholder || '请输入水单号'}
              style={commonStyles.searchInp}
              underlineColorAndroid="transparent"
              onFocus={() => this.setState({ searchFocus: true })}
              onBlur={() => this.setState({ searchFocus: false })}
              onChangeText={query => this.setState({ query })}
              value={this.state.query}
            />
          </ImageBackground>
          <TouchableOpacity onPress={this.onSearch}>
            <Image resizeMethod="resize"
              source={require('@imgPath/search-btn.png')}
              resizeMode={'contain'}
              style={[
                commonStyles.searchModuleBtn,
                commonStyles.searchModuleBtnRight,
              ]}
            />
          </TouchableOpacity>
          {this.state.searchFocus &&
            this.state.query.length > 0 && (
              <TouchableOpacity onPress={this.onResetPress}>
                <Image resizeMethod="resize"
                  source={require('@imgPath/delete-btn.png')}
                  style={commonStyles.searchModuleBtn}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  }
}
