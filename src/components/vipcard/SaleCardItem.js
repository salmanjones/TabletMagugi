import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { commonStyles } from 'styles';
import { PixelUtil, ImageQutity, getImage } from 'utils';
import { encode } from 'punycode';

const storageCardBgImg = require('@imgPath/card-genre-one.png');
const timeCardBgImg = require('@imgPath/time-card-two.png');
const activeCardBgImg = require('@imgPath/card-genre-active.png');
const activeTimeCardBgImg = require('@imgPath/time-card-active.png');
const defaultBrandImg = require('@imgPath/magugi.png');

const getValidity = (endDate, validTime) => {
  let validity = '';
  switch (validTime) {
    case 1:
      validity = '月卡';
      break;
    case 3:
      validity = '季卡';
      break;
    case 6:
      validity = '半年卡';
      break;
    case 12:
      validity = '年卡';
      break;
    case -2:
      validity = '有效期 ' + endDate;
      break;
    case 0:
      validity = '无期限';
      break;
  }
  return validity;
};

export class SaleCardItem extends React.PureComponent {
  render() {
    const { data, selected, onSelected } = this.props;
    const brandImg = getImage(
      data.brandLogo,
      ImageQutity.brand,
      defaultBrandImg
    );
    const isStorageCard = data.cardType == 1;

    return (
      <TouchableOpacity
        onPress={() => {
          onSelected && onSelected(data);
        }}
      >
        <View>
          {isStorageCard && (
            <View style={commonStyles.cardBox}>
              <View style={commonStyles.cardIconBox}>
                <Image resizeMethod="resize"
                  source={brandImg}
                  defaultSource={defaultBrandImg}
                  style={commonStyles.cardIcon}
                />
              </View>
              <ImageBackground
                source={selected ? activeCardBgImg : storageCardBgImg}
                style={commonStyles.cardBoxBg}
              >
                <View style={commonStyles.cardName}>
                  <Text style={commonStyles.cardNameText} numberOfLines={2} ellipsizeMode={'tail'}>
                    {data.vipCardName}
                  </Text>
                </View>
                <View style={commonStyles.cardSite}>
                  <Text style={commonStyles.cardSiteText} numberOfLines={2} ellipsizeMode={'tail'}>
                  </Text>
                </View>
                <View style={commonStyles.cardPrice}>
                  <Text style={commonStyles.cardPriceText}>
                    ￥{data.initialPrice}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          )}

          {!isStorageCard && (
            <View style={commonStyles.cardBox}>
              <View style={commonStyles.timeCardBox}>
                <Image resizeMethod="resize"
                  source={brandImg}
                  defaultSource={defaultBrandImg}
                  style={commonStyles.timeCardIcon}
                />
              </View>
              <ImageBackground
                source={selected ? activeTimeCardBgImg : timeCardBgImg}
                style={
                  selected
                    ? commonStyles.activeTimeCardBoxBg
                    : commonStyles.timeCardBoxBg
                }
              >
                <View style={commonStyles.timeCardName}>
                  <Text style={commonStyles.timeCardNameText} numberOfLines={2} ellipsizeMode={'tail'}>
                    {data.vipCardName}
                  </Text>
                </View>
                <View style={commonStyles.timeCardOtherBody}>
                  <View>
                    <Text style={commonStyles.timeCardPriceBigText}>
                      ￥{data.initialPrice}
                    </Text>
                    {data.consumeMode == 2 && (
                      <Text style={commonStyles.timeCardNumText}>
                        {getValidity(data.endDate, data.validTime)}
                      </Text>
                    )}
                    {data.consumeMode != 2 && (
                      <Text style={commonStyles.timeCardNumText}>
                        {data.times ? data.times + '次' : ''}
                      </Text>
                    )}
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
