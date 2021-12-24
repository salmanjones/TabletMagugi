import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {ModalCardInfo} from 'components';
import {commonStyles} from '../../styles';
import {getImage, ImageQutity} from 'utils';

const storageCardBgImg = require('@imgPath/card-genre-one.png');
const timeCardBgImg = require('@imgPath/time-card-two.png');
const activeCardBgImg = require('@imgPath/card-genre-active.png');
const activeTimeCardBgImg = require('@imgPath/time-card-active.png');
const defaultBrandImg = require('@imgPath/magugi.png');

const getValidity = (validity, status) => {
    if (validity.length > 9) {
        return '有效期 ' + validity.substr(0, 10);
    }
    if (validity == 0 || status === '-3') {
        return '无期限';
    }
    if (validity == -1) {
        return '暂未生效';
    }
};

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
        const brandImg = getImage(
            data.brandLogo,
            ImageQutity.brand,
            defaultBrandImg
        );
        const isStorageCard = data.cardType == 1;

        return (
            <View>
                <TouchableOpacity onPress={() => {
                    onSelected && onSelected(data);

                    {
                        showCardDetailInfo == true && (
                            this.setState((prevstate)=>{
                                return {...prevstate, cardModelVisible:true}
                            })
                        )
                    }
                }}>
                    <View>
                        {/*储值卡*/}
                        {isStorageCard && (
                            <View style={commonStyles.cardBox}>
                                <View style={commonStyles.cardIconBox}>
                                    <Image resizeMethod="resize"
                                           source={brandImg}
                                           defaultSource={defaultBrandImg}
                                           style={commonStyles.cardIcon}
                                    />

                                </View>
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
                                    style={commonStyles.cardBoxBg}
                                >
                                    <View style={commonStyles.cardName}>
                                        <Text style={commonStyles.cardNameText} numberOfLines={1}
                                              ellipsizeMode={'tail'}>
                                            {data.vipCardName}
                                        </Text>
                                    </View>
                                    <View style={commonStyles.cardSite}>
                                        <Text style={commonStyles.cardSiteText} numberOfLines={2}
                                              ellipsizeMode={'tail'}>
                                            {data.storeName}
                                        </Text>
                                    </View>
                                    <View style={commonStyles.cardPrice}>
                                        <Text style={commonStyles.cardPriceText}>
                                            ￥{data.balance}
                                        </Text>
                                    </View>


                                </ImageBackground>

                            </View>
                        )}

                        {/*次卡等*/}
                        {!isStorageCard && (
                            <View style={commonStyles.cardBox}>
                                <View style={commonStyles.timeCardBox}>
                                    <Image resizeMethod="resize" source={brandImg} style={commonStyles.timeCardIcon}/>
                                </View>
                                {page == 'cashier' && (
                                    <TouchableOpacity style={commonStyles.cardIconBoxMore}>
                                    </TouchableOpacity>
                                )}

                                <ImageBackground source={selected ? activeTimeCardBgImg : timeCardBgImg}
                                                 style={selected ? commonStyles.activeTimeCardBoxBg : commonStyles.timeCardBoxBg}>
                                    <Text style={commonStyles.timeCardStore} numberOfLines={1}
                                          ellipsizeMode={'tail'}>{data.storeName}</Text>
                                    <View style={commonStyles.timeCardName}>
                                        <Text style={commonStyles.timeCardNameText} numberOfLines={2}>
                                            {data.vipCardName}
                                        </Text>
                                    </View>
                                    <View style={commonStyles.timeCardNum}>
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
