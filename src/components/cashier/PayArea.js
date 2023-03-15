//轮牌-单牌
import React, {PureComponent} from 'react';
import {Icon} from 'react-native-elements';
import {
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {cashierPayStyle, pendingOrderPayStyle} from '../../styles';

const height = 0;
export class PayArea extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //channel: null,
            showCoupons: false,
            selectedCoupons: null,
            //selectedOtherPayment: null,
            //selectedPayType: null,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selectedChannel == null && nextProps.selectedPayType == null) {
            this.setState({
                showCoupons: false,
                selectedCoupons: null,
                //selectedOtherPayment: null,
            });
        }
        if (nextProps.showPayDetails != this.props.showPayDetails && nextProps.showPayDetails) {
            if (nextProps.selectedChannel == 'tablet') this.choosePayWay('wx');
        }
        // if(nextProps.hasCardProject !=this.props.hasCardProject || nextProps.member!=this.props.member){
        //     let channels=this.getAvailableChannels(nextProps.member,nextProps.hasCardProject);
        //     let first= Object.keys(channels).map(key=>({key:key,value:channels[key]})).find(x=>x.value);
        //     first && this.onChannalChoosed(first.key);
        // }
    }

    getAvailableChannels(member, hasCardProject) {
        let isMember = member && member.memberType == '0';
        let channels = { tablet: true, miniApp: true, app: true };

        if (hasCardProject) {
            channels.tablet = false;
            channels.miniApp = false;
        }

        if (isMember) {
            channels.miniApp = false;
        } else {
            channels.app = false;
        }

        return channels;
    }

    render() {
        const {
            hasCardProject,
            member,
            coupons,
            selectedCoupons,
            selectedChannel,
            selectedPayType,
            selectedPayTypeId,
            othersPaymentList,
            showPayDetails,
            couponDiscountPrice,
            companySetting
        } = this.props;
        const { showCoupons, wait4PayAmt } = this.state;

        const couponDesc = selectedCoupons.length
            ? `已选择${selectedCoupons.length}张优惠券`
            : coupons.length
            ? `可用优惠券${coupons.length}张`
            : '暂无可用优惠券';

        let availableChannels = this.getAvailableChannels(member, hasCardProject);
        let isNoChannels = !availableChannels.tablet && !availableChannels.miniApp && !availableChannels.app;
        return (
            <View style={pendingOrderPayStyle.timePayRBox}>
                {isNoChannels && (
                    <View style={cashierPayStyle.payTitleNullbox}>
                        <Text style={cashierPayStyle.payTitle}>无可用支付方式，请选择其他主单</Text>
                    </View>
                )}
                <View style={(pendingOrderPayStyle.timePayRBoxWayBox, { display: showPayDetails ? 'none' : 'flex' })}>
                    {!isNoChannels && <Text style={cashierPayStyle.payTitle}>请选择支付通道</Text>}
                    {availableChannels.tablet && (
                        <TouchableOpacity
                            style={selectedChannel == 'tablet' ? pendingOrderPayStyle.timePayRotherActive : pendingOrderPayStyle.timePayRother}
                            onPress={this.onChannalChoosed.bind(this, 'tablet')}>
                            <Image resizeMethod="resize" source={require('@imgPath/pay-quickly.png')} style={cashierPayStyle.timePayImgPb} resizeMode={'contain'}/>
                            <Text style={cashierPayStyle.titleText}>快速支付</Text>
                        </TouchableOpacity>
                    )}
                    {/*组合支付*/}
                    {/* <TouchableOpacity
                        style={selectedChannel == 'multiply' ? pendingOrderPayStyle.timePayRotherActive : pendingOrderPayStyle.timePayRother}
                        onPress={this.onChannalChoosed.bind(this, 'multiply')}>
                        <Image resizeMethod="resize" source={require('@imgPath/pay-multiply.png')} style={cashierPayStyle.timePaymultiply} resizeMode={'contain'}/>
                        <Text style={cashierPayStyle.titleText}>组合支付</Text>
                    </TouchableOpacity> */}
                    {availableChannels.miniApp && (
                        <TouchableOpacity
                            style={selectedChannel == 'miniApp' ? pendingOrderPayStyle.timePayRotherActive : pendingOrderPayStyle.timePayRother}
                            onPress={this.onChannalChoosed.bind(this, 'miniApp')}
                        >
                            <Image
                                resizeMethod="resize"
                                source={require('@imgPath/magugi-text.png')}
                                style={[cashierPayStyle.timePayImgXcx, { resizeMode: 'contain' }]}
                            />
                            <Text style={cashierPayStyle.titleText}>小程序支付</Text>
                        </TouchableOpacity>
                    )}
                    {availableChannels.app && (
                        <TouchableOpacity
                            style={selectedChannel == 'app' ? pendingOrderPayStyle.timePayRotherActive : pendingOrderPayStyle.timePayRother}
                            onPress={this.onChannalChoosed.bind(this, 'app')}
                        >
                            <Image
                                resizeMethod="resize"
                                source={require('@imgPath/magugi-text.png')}
                                style={[cashierPayStyle.timePayImgXcx, { resizeMode: 'contain' }]}
                            />
                            <Text style={cashierPayStyle.titleText}>会员卡支付</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/* 平板支付-支付选择*/}
                <View style={[cashierPayStyle.timePayRBoxChoose, { display: showPayDetails ? 'flex' : 'none' }]}>
                    {/* 优惠券 */}
                    <View style={cashierPayStyle.couponBox}>
                        <TouchableHighlight underlayColor="white" style={cashierPayStyle.couponTitleBox} onPress={this.toggleCoupons}>
                            <View style={cashierPayStyle.couponTitle}>
                                <Text style={cashierPayStyle.couponTitleText}>
                                    优惠券：<Text style={cashierPayStyle.couponText}>{couponDesc}</Text>
                                </Text>
                                <View style={[cashierPayStyle.couponTitleR, { display: coupons.length ? 'flex' : 'none' }]}>
                                    <Text style={cashierPayStyle.dangerText}>抵扣-￥{couponDiscountPrice}</Text>
                                    <Icon
                                        name={showCoupons ? 'chevron-down' : 'chevron-up'} //收起
                                        //name='chevron-up'    展开
                                        type="evilicon"
                                        color="#999"
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                        <View style={[cashierPayStyle.couponList, { height: this.state.sliderHeight, display: showCoupons ? 'flex' : 'none' }]}>
                            <FlatList
                                style={cashierPayStyle.couponListFlat}
                                data={coupons}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => {
                                    let selected = selectedCoupons.indexOf(item) != -1;
                                    return (
                                        <TouchableOpacity style={cashierPayStyle.couponLi} onPress={this.onCouponChoosed.bind(this, item)}>
                                            <ImageBackground
                                                source={require('@imgPath/coupon-bg.png')}
                                                style={cashierPayStyle.couponLiBg}
                                                resizeMode={'cover'}
                                            >
                                                <View style={cashierPayStyle.couponLiBox}>
                                                    <View style={cashierPayStyle.couponLiL}>
                                                        {item.couponType == '6' &&(
                                                            <Text style={cashierPayStyle.couponUnit}>
                                                                <Text style={cashierPayStyle.couponPrice}>{item.couponPrice}</Text>折
                                                            </Text>
                                                        )}
                                                        {item.couponType == '7' &&(
                                                            <Text style={cashierPayStyle.couponUnit}>
                                                                <Text style={cashierPayStyle.couponPrice}>抵</Text>
                                                            </Text>
                                                        )}
                                                        {item.couponType != '6' && item.couponType != '7' &&(
                                                            <Text style={cashierPayStyle.couponUnit}>
                                                                ￥<Text style={cashierPayStyle.couponPrice}>{item.couponPrice}</Text>
                                                            </Text>
                                                        )}
                                                    </View>
                                                    <View style={cashierPayStyle.couponLiR}>
                                                        <View style={cashierPayStyle.couponLiRL}>
                                                            <Text style={cashierPayStyle.color333}>{item.name}</Text>
                                                        </View>
                                                        <Image
                                                            resizeMethod="resize"
                                                            source={
                                                                selected
                                                                    ? require('@imgPath/radio-111c3c-active.png')
                                                                    : require('@imgPath/radio-111c3c.png')
                                                            }
                                                            style={[cashierPayStyle.couponLiRR, { resizeMode: 'contain' }]}
                                                        />
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </View>
                    <ScrollView style={{width: '100%'}}>
                    {/* 支付方式 */}
                    <View style={cashierPayStyle.payWayBox}>
                        <Text style={cashierPayStyle.payWayTitle}>请选择支付方式：</Text>
                        <View style={pendingOrderPayStyle.payWaylist}>
                            <TouchableOpacity
                                style={selectedPayType == 'wx' ? pendingOrderPayStyle.timePayRListActive : pendingOrderPayStyle.timePayRList}
                                onPress={this.choosePayWay.bind(this, 'wx')}
                            >
                                <Image
                                    resizeMethod="resize"
                                    source={require('@imgPath/WeChat.png')}
                                    style={[cashierPayStyle.timePayRImg, { resizeMode: 'contain' }]}
                                />
                                <Text style={cashierPayStyle.titleText}>微信支付</Text>
                            </TouchableOpacity>
                            {/*<TouchableOpacity*/}
                            {/*    style={selectedPayType == 'ali' ? pendingOrderPayStyle.timePayRListActive : pendingOrderPayStyle.timePayRList}*/}
                            {/*    onPress={this.choosePayWay.bind(this, 'ali')}*/}
                            {/*>*/}
                            {/*    <Image*/}
                            {/*        resizeMethod="resize"*/}
                            {/*        source={require('@imgPath/alipay.png')}*/}
                            {/*        style={[cashierPayStyle.timePayRImg, { resizeMode: 'contain' }]}*/}
                            {/*    />*/}
                            {/*    <Text style={cashierPayStyle.titleText}>支付宝支付</Text>*/}
                            {/*</TouchableOpacity>*/}
                            {companySetting.isUseCash && <TouchableOpacity
                                style={selectedPayType == 'cash' ? pendingOrderPayStyle.timePayRListActive : pendingOrderPayStyle.timePayRList}
                                onPress={this.choosePayWay.bind(this, 'cash')}
                            >
                                <Image
                                    resizeMethod="resize"
                                    source={require('@imgPath/xj-zf-icon.png')}
                                    style={[cashierPayStyle.timePayRImg, { resizeMode: 'contain' }]}
                                />
                                <Text style={cashierPayStyle.titleText}>现金支付</Text>
                            </TouchableOpacity>}
                            {companySetting.isUseCash && <TouchableOpacity
                                style={selectedPayType == 'bank' ? pendingOrderPayStyle.timePayRListActive : pendingOrderPayStyle.timePayRList}
                                onPress={this.choosePayWay.bind(this, 'bank')}
                            >
                                <Image
                                    resizeMethod="resize"
                                    source={require('@imgPath/yl-zf-icon.png')}
                                    style={[cashierPayStyle.timePayRImg, { resizeMode: 'contain' }]}
                                />
                                <Text style={cashierPayStyle.titleText}>银联支付</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                    {/* 其他支付方式 */}
                    <View style={cashierPayStyle.payWayBox}>
                        <Text style={cashierPayStyle.payWayTitle}>其他支付：</Text>
                        <View style={pendingOrderPayStyle.payWaylist}>
                            <FlatList
                                data={othersPaymentList}
                                numColumns={2}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        style={
                                            selectedPayTypeId == item.id ? pendingOrderPayStyle.timePayRListActive : pendingOrderPayStyle.timePayRList
                                        }
                                        onPress={this.choosePayWay.bind(this, 'other', item.id)}
                                    >
                                        <Text style={cashierPayStyle.titleText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    //选择支付通道
    onChannalChoosed(channel) {
        this.props.onChannalChoosed(channel, null, null);
    }
    //选择优惠券
    onCouponChoosed(coupon) {
        this.props.onCouponChoosed(coupon);
    }
    //选择支付方式
    choosePayWay(payType, otherPayId) {
        // this.setState(
        //     {
        //         //selectedPayType: payType,
        //         selectedOtherPayment: this.props.othersPaymentList.find((x) => x.id == otherPayId),
        //         //othersPaymentList: [...this.props.othersPaymentList],
        //     },
        //     () => {
        //         let otherPayment = this.state.selectedOtherPayment;
        this.props.onPayTypeChoosed(
            payType,
            otherPayId
            // otherPayment ? otherPayment.id : null,
            // otherPayment ? otherPayment.name : null
        );
        //     }
        // );
    }

    toggleCoupons = () => {
        if (!this.props.coupons.length && !this.state.showCoupons) return;
        this.setState({ showCoupons: !this.state.showCoupons });
    };
}
