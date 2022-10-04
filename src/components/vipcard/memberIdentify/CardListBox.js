import React from 'react';
import {FlatList, View,} from 'react-native';

import styled from 'styled-components/native/';

import {CardItem, SectionList} from '../../../components';
import {memberIdentifyStyle} from '../../../styles';
import {PixelUtil} from '../../../utils';

const MarginContainer = styled.View`
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageNoContent = styled.Image`
  width: ${PixelUtil.rect(450, 400).width};
  height: ${PixelUtil.rect(450, 400).height};
`;
// margin-top: -20%
export class CardListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDatas: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { vipStorageCardList } = nextProps;
    this.setState({cardDatas: vipStorageCardList });
  }

  render() {
    const { cardDatas } = this.state;
    const noCardFound = cardDatas.length === 0;

    return (
        // <MarginContainer>
        //     <ImageNoContent
        //         source={require('@imgPath/none-card.png')}
        //         resizeMode={'contain'}
        //     />
        // </MarginContainer>

      <View style={memberIdentifyStyle.ShowMemberCardBox}>
          <View style={{ width: '50%', height: '98.6%' }}>
            <SectionList noItems={noCardFound}>
              <FlatList
                style={memberIdentifyStyle.ShowMemberCardOtherList}
                data={cardDatas}
                numColumns={2}
                extraData={card}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <CardItem
                      data={item}
                      selected={item.id == (card || {}).id}
                    />
                  );
                }}
              />
            </SectionList>
          </View>
      </View>
    );
  }
}
