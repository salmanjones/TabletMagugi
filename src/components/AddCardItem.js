import React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { SimulateKeyboard } from '../components';

import { addCardItemStyles } from '../styles';
export class AddCardItem extends React.PureComponent {
  render() {
    return (
      <View style={addCardItemStyles.addCardItemStylesContent}>
        <View style={addCardItemStyles.addCardItemStylesTitle}>
          <TouchableOpacity style={addCardItemStyles.addCardItemStylesTitleLi}>
            <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
              项目名称
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={addCardItemStyles.addCardItemStylesTitleLiOnther}
          >
            <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
              原价
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={addCardItemStyles.addCardItemStylesTitleLi}>
            <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
              次卡信息2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={addCardItemStyles.addCardItemStylesTitleLiOnther}
          >
            <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
              余次
            </Text>
          </TouchableOpacity>
        </View>
        <View style={addCardItemStyles.addCardItemStylesBody}>
          <TouchableOpacity style={addCardItemStyles.addCardItemStylesList}>
            <View style={addCardItemStyles.addCardItemStylesListNameBox}>
              <Text style={addCardItemStyles.addCardItemStylesListName}>
                头皮去角质护理头皮去角质护理头皮去角质护理头皮去角质护理
              </Text>
            </View>
            <Text style={addCardItemStyles.addCardItemStylesListPrice}>
              ￥3880
            </Text>
            <View style={addCardItemStyles.addCardItemStylesListInfoBox}>
              <Text style={addCardItemStyles.addCardItemStylesListInfo}>
                头皮去角质护理头皮去角质护理头皮去角质护理头皮去角质护理头皮去角质护理
              </Text>
            </View>
            <Text style={addCardItemStyles.addCardItemStylesListTime}>5次</Text>
          </TouchableOpacity>
          <TouchableOpacity style={addCardItemStyles.addCardItemStylesList}>
            <View style={addCardItemStyles.addCardItemStylesListNameBox}>
              <Text style={addCardItemStyles.addCardItemStylesListName}>
                头皮去角质护理头皮去角质护理头皮去角质护理头皮去角质护理
              </Text>
            </View>
            <Text style={addCardItemStyles.addCardItemStylesListPrice}>
              ￥3880
            </Text>
            <View style={addCardItemStyles.addCardItemStylesListInfoBox}>
              <Text style={addCardItemStyles.addCardItemStylesListInfo}>
                头皮去角质护理头皮去角质护理头皮去角质护理头皮去角质护理头皮去角质护理
              </Text>
            </View>
            <Text style={addCardItemStyles.addCardItemStylesListTime}>5次</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
