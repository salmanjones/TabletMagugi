import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {ModalCardInfo} from '../../components';
import {commonStyles} from '../../styles';
import {getImage, ImageQutity} from '../../utils';

const storageCardBgImg = require("@imgPath/vipcard_storeage_bg.png");
const timeCardBgImg = require("@imgPath/vipcard_times_bg.png");
const activeCardBgImg = require("@imgPath/vipcard_storeage_active_bg.png");
const activeTimeCardBgImg = require("@imgPath/vipcard_times_active_bg.png");
const storageCardSplitImg = require("@imgPath/vipcard_storeage_recharge_split_line.png");
const timesCardSplitImg = require("@imgPath/vipcard_times_recharge_split_line.png");
const getValidity = (validity, status) => {
    if (validity.length > 9) {
        return '有效期至' + validity.substr(0, 10);
    }
    if (validity == 0 || status === '-3') {
        return '无期限';
    }
    if (validity == -1) {
        return '暂未生效';
    }
};

// 获取次卡标题
const getCardTitle = (card) =>{
    let cardTitle = '次卡'
    const cardType = card.cardType
    const consumeMode = card.consumeMode

    if(cardType == '1'){
        cardTitle = '储值卡'
        if(consumeMode == '2'){
            cardTitle = '定向卡'
        }else if(consumeMode == '1'){
            cardTitle = '折扣卡'
        }
    }else if(cardType == '2'){
        cardTitle = '次卡'

        if(consumeMode == '0'){
            cardTitle = '疗程卡'
        }else if(consumeMode == '1'){
            cardTitle = '套餐卡'
        }else if(consumeMode == '2'){
            cardTitle = '时间卡'
        }else if(consumeMode == '3'){
            cardTitle = '护理卡'
        }
    }
    return cardTitle
}

export class CardItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCardModal: false,
            cardModelVisible: false
        };
    }

    render() {
        const {data, selected, onSelected, page , showCardDetailInfo} = this.props;
        const isStorageCard = data.cardType == 1;
        // 获取标题
        const cardTitle = getCardTitle(data)

        return (
            <View>
                <TouchableOpacity onPress={() => {
                    onSelected && onSelected(data);
                    showCardDetailInfo == true && (
                        this.setState((prevstate)=>{
                            return {...prevstate, cardModelVisible:true}
                        })
                    )
                }}>
                    <View>
                        {/*储值卡*/}
                        {isStorageCard && (
                            <View style={commonStyles.cardBox}>
                                {page == 'cashier' && (
                                    <TouchableOpacity style={commonStyles.cardIconBoxMore} onPress={()=>{
                                        this.setState((prevstate)=>{
                                            return {...prevstate, cardModelVisible:true}
                                        })
                                    }}>
                                    </TouchableOpacity>
                                )}
                                <ImageBackground
                                    source={selected ? activeCardBgImg : storageCardBgImg}
                                    style={commonStyles.cardBoxBg}>
                                    <Text style={commonStyles.cardSaleTitle}>{cardTitle}</Text>
                                    <View style={commonStyles.cardName}>
                                        <Text style={commonStyles.cardNameText} numberOfLines={2} ellipsizeMode={"tail"}>
                                            {data.vipCardName}
                                        </Text>
                                    </View>
                                    <View style={commonStyles.rechargeCardPrice}>
                                        <Text style={commonStyles.cardPricePreText}>
                                            ￥
                                        </Text>
                                        <Text style={commonStyles.cardPriceText}>
                                            {data.balance}
                                        </Text>
                                    </View>
                                    <View style={commonStyles.rechargeSplitLineBox}>
                                        <Image style={commonStyles.rechargeSplitLine} resizeMode={'contain'} source={storageCardSplitImg} ></Image>
                                    </View>
                                    <View style={commonStyles.cardSite}>
                                        <Text style={commonStyles.cardSiteText}
                                              numberOfLines={2}
                                              ellipsizeMode={'tail'}>
                                            {data.storeName}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}

                        {/*次卡等*/}
                        {!isStorageCard && (
                            <View style={commonStyles.cardBox}>
                                {page == 'cashier' && (
                                    <TouchableOpacity style={commonStyles.cardIconBoxMore}></TouchableOpacity>
                                )}
                                <ImageBackground source={selected ? activeTimeCardBgImg : timeCardBgImg} style={commonStyles.cardBoxBg}>
                                    <Text style={commonStyles.cardSaleTitle}>{cardTitle}</Text>
                                    <View style={commonStyles.timeCardName}>
                                        <Text style={commonStyles.timeCardNameText} numberOfLines={2} ellipsizeMode={"tail"}>
                                            {data.vipCardName}
                                        </Text>
                                    </View>
                                    <View style={commonStyles.timeCardOtherBody}>
                                        {data.consumeMode === '2' && (
                                            <Text style={commonStyles.timeCardPriceText}>
                                                {getValidity(data.validity, data.status)}
                                            </Text>
                                        )}
                                        {data.consumeMode !== '2' && (
                                            <Text style={commonStyles.timeCardPriceText}>
                                                余{data.balance}次
                                            </Text>
                                        )}
                                    </View>
                                    <View style={commonStyles.rechargeTimesSplitLineBox}>
                                        <Image style={commonStyles.rechargeSplitLine} resizeMode={'contain'} source={timesCardSplitImg} ></Image>
                                    </View>
                                    <View style={commonStyles.cardTimesSite}>
                                        <Text style={commonStyles.timeCardStore} numberOfLines={1} ellipsizeMode={'tail'}>{data.storeName}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <ModalCardInfo
                    data={data}
                    visible={this.state.cardModelVisible}
                    onConfirm={() => this.setState({cardModelVisible: false})}
                />
            </View>
        );
    }
}
