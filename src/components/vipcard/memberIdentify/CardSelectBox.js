import React from 'react';
import {FlatList, View,} from 'react-native';
import styled from 'styled-components/native/';

import {CardItem, SectionList, TabGroup} from '../../../components';
import {memberIdentifyStyle} from '../../../styles';
import {groupBy, PixelUtil} from '../../../utils';

const MarginContainer = styled.View`
  width: 100%;
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
export class CardSelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: null,
            selectedIndex: 0,
            cardDatas: [],
        };
    }

    componentDidMount() {
        const {member, showTab} = this.props;
        const data = member.vipStorageCardList || [];
        const cardData = showTab ? groupBy(data, item => item.cardType) : data;
        this.setState({selectedIndex: 0, card: null, cardDatas: cardData});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.member.id != this.props.member.id) {
            const {member, showTab} = nextProps;
            const data = member.vipStorageCardList || [];
            const cardData = showTab ? groupBy(data, item => item.cardType) : data;
            this.setState({selectedIndex: 0, card: null, cardDatas: cardData});
        }
    }

    onTabPress = index => {
        this.setState({selectedIndex: index});
    };

    onCardItemPress = card => {
        const {onRechargePress, showRecharge} = this.props;
        if (showRecharge) {
            this.setState({card});
            onRechargePress && onRechargePress(card);
        }
    };

    render() {
        const {member, showTab, showRecharge, searchStart, page , showCardDetailInfo} = this.props;

        const memberSelected = Object.keys(member).length > 0;
        const {cardDatas, selectedIndex, card} = this.state;

        const cardData = showTab
            ? cardDatas[selectedIndex ? '2' : '1'] || []
            : cardDatas;

        const noCardFound = searchStart && memberSelected && cardData.length === 0;

        return (
            <View style={memberIdentifyStyle.ShowMemberCardBox}>
                {showTab && (
                    <View style={memberIdentifyStyle.btnBoxB}>
                        <View style={memberIdentifyStyle.btnBox}>
                            <TabGroup
                                data={['储值卡', '次卡']}
                                selectedIndex={this.state.selectedIndex}
                                onSelected={this.onTabPress}
                            />
                        </View>
                    </View>
                )}
                {(!searchStart || !memberSelected) && (
                    <MarginContainer>
                        <ImageNoContent
                            source={require('@imgPath/none-card.png')}
                            resizeMode={'contain'}
                        />

                    </MarginContainer>
                )}
                {memberSelected && (
                    <View style={{width: '100%', height: '98.6%'}}>
                        <SectionList noItems={noCardFound}>
                            <FlatList
                                style={
                                    showTab
                                        ? memberIdentifyStyle.ShowMemberCardOtherList
                                        : memberIdentifyStyle.ShowMemberCardList
                                }
                                data={cardData}
                                extraData={card}
                                numColumns={2}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => {
                                    return (
                                        <CardItem
                                            data={item}
                                            showCardDetailInfo={showCardDetailInfo}
                                            selected={item.id == (card || {}).id}
                                            onSelected={this.onCardItemPress}
                                            page={page}
                                        />
                                    );
                                }}
                            />
                        </SectionList>
                    </View>
                )}
            </View>
        );
    }
}
