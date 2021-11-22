import React from 'react';
import { Text, View, Image } from 'react-native';

import { openCardAccountStyle } from 'styles';
import { ImageQutity, getImage } from 'utils';

export class MemberInfoNew extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <View style={openCardAccountStyle.rightBoxNew}>
        <View style={openCardAccountStyle.cardInfoAvatarBoxNew}>
          <Image resizeMethod="resize"
            source={getImage(
              data.imgUrl,
              ImageQutity.member_big,
              require('@imgPath/rotate-portrait.png')
            )}
            style={openCardAccountStyle.cardInfoAvatar}
          />
        </View>
        <View>
          <Text style={openCardAccountStyle.cardPersonInfoText}>
            持卡人：{data.name}
          </Text>
          <Text style={openCardAccountStyle.cardPersonInfoText}>
            性别：{data.sex == 0 ? '女' : '男'}
          </Text>
          <Text style={openCardAccountStyle.cardPersonInfoText}>
            手机号：{data.phone}
          </Text>
        </View>
      </View>
    );
  }
}
