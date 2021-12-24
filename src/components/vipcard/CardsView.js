import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { CardItem } from '../../components';
import { RechargeStoredCardStyles } from '../../styles';
import styled from 'styled-components/native/';
import { PixelUtil } from '../../utils';

const MarginContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageNoContent = styled.Image`
  width: ${PixelUtil.rect(450, 400).width};
  height: ${PixelUtil.rect(450, 400).height};
`;

export class CardsView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      card: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card) {
      this.setState({
        card: nextProps.card,
      });
    }
  }

  onCardItemPress = card => {
    this.props.onSelected(card);
    this.setState({ card });
  };

  render() {
    const { data } = this.props;
    return (
      <View style={RechargeStoredCardStyles.ShowMemberCardBoxO}>
        {(!data || !data.length) && (
          <MarginContainer>
            <ImageNoContent
              source={require('@imgPath/none-card.png')}
              resizeMode={'contain'}
            />
          </MarginContainer>
        )}

        <FlatList
          style={RechargeStoredCardStyles.ShowMemberCardList}
          data={data}
          extraData={this.state.card}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={this.renderCard}
        />
      </View>
    );
  }

  renderCard = ({ item }) => {
    return (
      <CardItem
        data={item}
        selected={item.id == (this.state.card || {}).id}
        onSelected={this.onCardItemPress}
      />
    );
  };
}
