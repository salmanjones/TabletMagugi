import React from 'react';
import {ImageBackground, Modal, Text, TouchableOpacity, View} from 'react-native';
import {CardItem, ConsumeHistory} from '../../components';
//self
import {cardInfoStyles, MemberQueryStyle, timeCardInfoStyles} from '../../styles';
import {ButtonGroup} from 'react-native-elements';

export class ModalCardInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            tabIndex: 0,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {visible} = nextProps;
        this.setState({visible});
    }

    onTabChanged = index => {
        let that = this;
        this.setState({tabIndex: index});
    };

    render() {
        const {data, onConfirm} = this.props;
        const {visible} = this.state;
        return (
            <Modal
                animationType={'fade'}
                transparent={false}
                onRequestClose={() => null}
                visible={visible}>
                <View style={cardInfoStyles.modalBackground}>
                    <View style={cardInfoStyles.cashierBillInfoWrapper}>
                        {this.renderTabs(['基本信息', '消费历史'])}
                        {this.renderBody(data)}
                        {this.renderConfirmBar(onConfirm)}
                    </View>
                </View>
            </Modal>
        );
    }

    renderTabs(tabsData) {
        const {tabIndex} = this.state
        return (
            <View style={cardInfoStyles.titleBox}>
                <TouchableOpacity
                    onPress={()=>{
                        this.onTabChanged(0)
                    }}
                    style={tabIndex == 0 ? [cardInfoStyles.cardDetailLeftButton, cardInfoStyles.cardDetailActiveButton]: [cardInfoStyles.cardDetailLeftButton]}>
                    <Text style={tabIndex == 0 ? [cardInfoStyles.cardDetailButtonActiveTxt]:[cardInfoStyles.cardDetailButtonTxt]}>基本信息</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        this.onTabChanged(1)
                    }}
                    style={tabIndex == 1 ? [cardInfoStyles.cardDetailRightButton, cardInfoStyles.cardDetailActiveButton]:[cardInfoStyles.cardDetailRightButton]}>
                    <Text style={tabIndex == 1 ? [cardInfoStyles.cardDetailButtonActiveTxt]:[cardInfoStyles.cardDetailButtonTxt]}>
                        消费历史
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderBody(data) {
        if (this.state.tabIndex == 1) { // 消费历史
            return (
                <ConsumeHistory
                    ref={ref => {
                        this.consumeHistory = ref;
                    }}
                    cardId={data.vipCardNo}
                />
            );
        }else{ // 卡信息
            let cardType = data.cardType;
            if (cardType === 2) { // 次卡
                return <TimeCardInfo data={data}/>
            } else { // 储值卡
                return <StoreageCardInfo data={data}/>
            }
        }
    }

    renderConfirmBar(onConfirm) {
        return (
            <View style={cardInfoStyles.MemberQueryBtnBox}>
                <TouchableOpacity
                    style={MemberQueryStyle.MemberQueryConfirmBtn}
                    onPress={onConfirm}
                >
                    <Text style={MemberQueryStyle.MemberQueryConfirmText}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// 次卡信息
const TimeCardInfo = ({data}) => {
    return (
        <View style={timeCardInfoStyles.cardInfoBox}>
            <View style={timeCardInfoStyles.cardInfoBody}>
                <View style={timeCardInfoStyles.timeCardInfoLeft}>
                    <View style={timeCardInfoStyles.cardImg}>
                        <CardItem data={data}/>
                    </View>
                    <View style={timeCardInfoStyles.cardInfoItemBox}>
                        <View style={timeCardInfoStyles.cardInfo}>
                            <View style={timeCardInfoStyles.cardInfoItem}>
                                <Text style={timeCardInfoStyles.cardInfoText}>卡号</Text>
                                <Text style={timeCardInfoStyles.cardInfoText}>
                                    {data.vipCardNo}
                                </Text>
                            </View>
                            <View style={timeCardInfoStyles.cardInfoItem}>
                                <Text style={timeCardInfoStyles.cardInfoText}>分类</Text>
                                <Text style={timeCardInfoStyles.cardInfoText}>
                                    {data.projectCategoryName}
                                </Text>
                            </View>
                            <View style={timeCardInfoStyles.cardInfoItem}>
                                <Text style={timeCardInfoStyles.cardInfoText}>最低续充</Text>
                                <Text style={timeCardInfoStyles.cardInfoText}>
                                    ￥{data.initialPrice}
                                </Text>
                            </View>
                        </View>
                        <View style={timeCardInfoStyles.cardInfo}>
                            <View style={timeCardInfoStyles.cardInfoItem}>
                                <Text style={timeCardInfoStyles.cardInfoText}>有效期至</Text>
                                <Text style={timeCardInfoStyles.cardInfoText}>
                                    {data.validity
                                        ? data.validity.length > 9
                                            ? data.validity.substring(0, 10)
                                            : '无期限'
                                        : '无期限'}
                                </Text>
                            </View>
                            <View style={timeCardInfoStyles.cardInfoItemStore}>
                                <Text style={timeCardInfoStyles.cardInfoText}>开卡门店</Text>
                                <Text style={timeCardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
                                    {data.storeName}
                                </Text>
                            </View>
                        </View>
                        <View style={timeCardInfoStyles.cardInfoLast}>
                            <View style={timeCardInfoStyles.cardInfoNote}>
                                <Text style={timeCardInfoStyles.cardInfoText}>备注信息</Text>
                                <Text style={timeCardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
                                    {data.remark}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/*次卡项目*/}
                <View style={timeCardInfoStyles.timeCardInfoRight}>
                    {data.attachProjectList.map((item, index) => {
                        return (
                            <View key={index} style={timeCardInfoStyles.rightItem}>
                                <View style={timeCardInfoStyles.rightItemL}>
                                    <Text style={timeCardInfoStyles.rightItemText}>
                                        {item.projectName}
                                    </Text>
                                </View>
                                <View style={timeCardInfoStyles.rightItemR}>
                                    <Text style={timeCardInfoStyles.rightItemTextR}>
                                        剩余:{data.consumeMode === '1' ? item.balance + '次' : '--'}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

// 储值卡信息
const StoreageCardInfo = ({data}) => {
    let attachMoney = 0;
    if (data.attachMoneyList) {
        attachMoney = data.attachMoneyList.reduce(
            (pre, cur) => pre + cur.balance || 0,
            0
        )
    }
    const cardDetails = data.detailsMap;

    return (
        <View style={cardInfoStyles.cardInfoBox}>
            <View style={cardInfoStyles.cardDetailBgBox}>
                <ImageBackground
                    resizeMode={'contain'}
                    source={require('@imgPath/card_storeage_detail_bg_img.png')}
                    style={cardInfoStyles.cardDetailBgImg}>
                    <Text style={cardInfoStyles.cardStoreageDetailTitle}>
                        {getCardTitle(data)}
                    </Text>
                    <View style={cardInfoStyles.cardDetailHeader}>
                        <View style={cardInfoStyles.cardDetailHeaderBox}>
                            <Text style={cardInfoStyles.cardDetailStorageName} ellipsizeMode={"tail"} numberOfLines={1}>
                                {data.vipCardName}
                            </Text>
                            <Text style={cardInfoStyles.cardDetailStoragePrice}>
                                ¥{data.balance}
                            </Text>
                        </View>
                    </View>
                    <View style={cardInfoStyles.cardDetailBody}>
                        <View style={cardInfoStyles.cardDetailBodyBox}>
                            <View style={cardInfoStyles.cardDetailStorageRow}>
                                <View style={cardInfoStyles.cardDetailStorageRowLeft}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>卡号：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>{data.vipCardNo}</Text>
                                </View>
                                <View style={cardInfoStyles.cardDetailStorageRowRight}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>分类：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>
                                        {data.projectCategoryName}
                                    </Text>
                                </View>
                            </View>
                            <View style={cardInfoStyles.cardDetailStorageRow}>
                                <View style={cardInfoStyles.cardDetailStorageRowLeft}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>最低续充：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>￥{data.rechargePrice}</Text>
                                </View>
                                <View style={cardInfoStyles.cardDetailStorageRowRight}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>卡内余额：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>
                                        ￥{data.balance}
                                    </Text>
                                </View>
                            </View>
                            <View style={cardInfoStyles.cardDetailStorageRow}>
                                <View style={cardInfoStyles.cardDetailStorageRowLeft}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>赠金余额：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>￥{attachMoney}</Text>
                                </View>
                                <View style={cardInfoStyles.cardDetailStorageRowRight}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>欠款：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>
                                        ￥{data.oweMoney}
                                    </Text>
                                </View>
                            </View>
                            <View style={cardInfoStyles.cardDetailStorageRow}>
                                <View style={cardInfoStyles.cardDetailStorageRowLeft}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>有效期至：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue}>
                                        {data.validity
                                            ? (data.validity.length > 9 ? data.validity.substring(0, 10) : '无期限')
                                            : '无期限'}
                                    </Text>
                                </View>
                                <View style={cardInfoStyles.cardDetailStorageRowRight}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>开卡门店：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue} numberOfLines={1} ellipsizeMode={'tail'}>
                                        {data.storeName}
                                    </Text>
                                </View>
                            </View>

                            <View style={cardInfoStyles.cardDetailStorageRow}>
                                <View style={cardInfoStyles.cardDetailStorageRowLeft}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>折扣方案：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue} numberOfLines={1} ellipsizeMode={'tail'}>
                                        {cardDetails.discountName}
                                    </Text>
                                </View>
                                <View style={cardInfoStyles.cardDetailStorageRowRight}>
                                    <Text style={cardInfoStyles.cardDetailStoragePTitle}>备注信息：</Text>
                                    <Text style={cardInfoStyles.cardDetailStoragePValue} numberOfLines={1} ellipsizeMode={'tail'}>
                                        {data.remark}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}

// 获取次卡标题
const getCardTitle = (card)=>{
    let cardTitle = '次卡'
    const cardType = card.cardType
    const consumeMode = card.consumeMode

    if(cardType == '1'){
        cardTitle = '储值卡'
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
