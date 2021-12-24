import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View, InteractionManager } from 'react-native';
import { getSalesCardAction } from 'actions';
import { SectionList, SaleCardItem } from 'components';
import { memberIdentifyStyle } from '../../styles';

export class VipcardSaleCardListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sCard: {},
      tCard: {},
    };
  }

  componentDidMount() {
    const { getSalesCard } = this.props;
    InteractionManager.runAfterInteractions(() => {
      getSalesCard();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setCard(nextProps.card || {});
  }

  setCard = item => {
    const key = item.cardType == 1 ? 'sCard' : 'tCard';
    const otherKey = item.cardType == 1 ? 'tCard' : 'sCard';
    let state = {};
    state[key] = item;
    state[otherKey] = this.state[otherKey].id ? {} : this.state[otherKey];
    this.setState(state);
  };

  onCardItemPress = item => {
    item.openPrice = item.initialPrice;
    this.setCard(item);
    this.props.selectCard && this.props.selectCard(item);
    this.props.setCount(1);
  };

  render() {
    const { storage, time, cardType, loading } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <SectionList
          noItems={storage.length === 0}
          loading={loading}
          hide={cardType == 2}
        >
          <FlatList
            style={memberIdentifyStyle.ShowMemberCardList}
            data={storage}
            extraData={this.state.sCard}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              console.log(item.cardType + ':' + item.id);
              return (
                <SaleCardItem
                  data={item}
                  selected={item.id == (this.state.sCard || {}).id}
                  onSelected={this.onCardItemPress}
                />
              );
            }}
          />
        </SectionList>

        <SectionList noItems={time.length === 0} hide={cardType == 1}>
          <FlatList
            style={memberIdentifyStyle.ShowMemberCardList}
            data={time}
            extraData={this.state.tCard}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              console.log(item.cardType + ':' + item.id);
              return (
                <SaleCardItem
                  data={item}
                  selected={item.id == (this.state.tCard || {}).id}
                  onSelected={this.onCardItemPress}
                />
              );
            }}
          />
        </SectionList>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { salesCard } = state.component;
  const storage = salesCard.cards[1] || [];
  const time = salesCard.cards[2] || [];
  return {
    storage: storage,
    time: time,
    loading: salesCard.loading,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSalesCard: getSalesCardAction,
    },
    dispatch
  );

export const VipcardSaleCardList = connect(mapStateToProps, mapDispatchToProps)(
  VipcardSaleCardListComponent
);
