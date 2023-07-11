import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FlatList, View, InteractionManager} from 'react-native';
import {getSalesCardAction} from '../../actions';
import {SectionList, SaleCardItem} from '../../components';
import {memberIdentifyStyle} from '../../styles';

export class VipcardSaleCardListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCard:{}
        }
    }

    componentDidMount() {
        const {getSalesCard} = this.props;
        InteractionManager.runAfterInteractions(() => {
            getSalesCard();
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const cardItem = nextProps.card || {}
        this.setState({
            activeCard: cardItem
        })
    }

    onCardItemPress = item => {
        item.openPrice = item.initialPrice;
        this.setState({
            activeCard: item
        })
        this.props.selectCard && this.props.selectCard(item);
        this.props.setCount(1);
    };

    render() {
        const {storageCards, timesCards, cardType, loading} = this.props;
        const {activeCard} = this.state

        return (
            <View style={{flex: 1}}>
                {/*储值卡*/}
                <SectionList
                    noItems={storageCards.length === 0}
                    loading={loading}
                    hide={cardType == 2}>
                    <FlatList
                        style={memberIdentifyStyle.ShowMemberCardList}
                        data={storageCards}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => {
                            return (
                                <SaleCardItem
                                    data={item}
                                    index={index}
                                    selected={item.id == activeCard.id}
                                    onSelected={this.onCardItemPress}
                                />
                            );
                        }}
                    />
                </SectionList>

                {/*次卡*/}
                <SectionList noItems={timesCards.length === 0} hide={cardType == 1}>
                    <FlatList
                        style={memberIdentifyStyle.ShowMemberCardList}
                        data={timesCards}
                        numColumns={2}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => {
                            return (
                                <SaleCardItem
                                    index={index}
                                    data={item}
                                    selected={item.id == activeCard.id}
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
    const {salesCard} = state.component;
    const loading = salesCard.loading
    const storageCards = salesCard.cards[1] || [];
    const timesCards = salesCard.cards[2] || [];

    return {
        loading,
        storageCards,
        timesCards,
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
