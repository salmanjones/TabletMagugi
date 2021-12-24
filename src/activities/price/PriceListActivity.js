//价目单-首页
import React from 'react';
import {connect} from 'react-redux';
import {
    Alert,
    Animated,
    Image,
    ImageBackground,
    InteractionManager,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    PanResponder
} from 'react-native';
import styled from 'styled-components/native/';
import {getCompanyAutoFlowNumber, priceListInfo} from 'services';
import {
    ModalLoadingIndicator,
    PriceListContent,
    PriceListInfoRight,
    PriceListModal,
    PriceListShopCart,
    PriceSwiper
} from '../../components';
import {getImage, ImageQutity, PixelUtil, showMessage} from '../../utils';
import {priceIndexStyle} from '../../styles';
import {Dimensions} from 'react-native';

// 获取页面宽度
const width = Dimensions.get('window').width;
const left = width - PixelUtil.size(120);

const SwiperContainer = styled.View`
    flex: 1;
`;

class PriceList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <PriceListInfoRight navigation={navigation} />,
        };
    };

    constructor() {
        super();
        this.state = {
            isLoading: true,
            sliderLeft: new Animated.Value(left),
            sliderTab: 'content', //滑出展示当前tab
            sliderDisplay: false,
            categories: [], //价目表分类
            priceData: [], //价目表数据
            currentIndex: 0, //当前数据index
            currentPriceContent: [], //当前价目content
            shopCartData: [], //购物车
            showFilterModal: false,
        };
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this.query();
        });
        // this.subscribeDidFocus = this.props.navigation.addListener('didFocus', () => {
        //     this.setState({ sliderDisplay: false, shopCartData: [] });
        // });

        this.props.navigation.setParams({
            toggleModal: () => {
                this.setState({ showFilterModal: true });
            }, //.bind(this),
        });

        // 设置手势的动作
        this._pinchResponder = PanResponder.create({
            /**
             * 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互
             * 需要注意，当水平位移大于30时，才进行后面的操作，不然可能是点击事件
             */
            onMoveShouldSetPanResponder(evt, gestureState){
                console.log(gestureState.dx)
                if (gestureState.dx > 30 && gestureState.dy == 0)
                    return true;
                else
                    return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.hideSlider()
            },
        });
    }

    query() {
        let that = this;
        this.setState({ isLoading: true });
        priceListInfo()
            .then(res => {
                if (!res.data) return;
                console.log(res.data);
                var categories = res.data.priceCategoryList.map(x => {
                    return { id: x.id, name: x.name };
                });

                var data = res.data.priceListSetList.map(x => {
                    return {
                        id: x.id,
                        priceName: x.priceName,
                        priceCategoryId: x.priceCategoryId,
                        priceCategoryName: x.priceCategoryName,
                        priceListType: x.priceListType,
                        priceDescrible: x.priceDescrible,
                        priceListPic: x.priceListPic,
                        //priceListPicUrl: getImage(x.priceListPicUrl, ImageQutity.member_big, require('@imgPath/p-load-img.png')),
                        //priceListPicUrl_small: getImage(x.priceListPicUrl, ImageQutity.staff, require('@imgPath/p-load-img.png')),
                        content: x.priceListContentList.map(y => {
                            return {
                                serviceId: y.serviceId,
                                serviceName: y.serviceName,
                                servicePic: getImage(y.servicePic, ImageQutity.staff, require('@imgPath/p-product-img.png')),
                                servicePrice: y.servicePrice,
                                serviceStoreId: y.serviceStoreId,
                                serviceType: y.serviceType,
                                isStock: y.isStock,
                            };
                        }),
                    };
                });

                this.setState({
                    categories: categories,
                    priceData: data,
                    currentPriceContent: (data && data.length && data[0].content) || null,
                    isLoading: false,
                });
            })
            .catch(err => {
                showMessage('网络异常');
                console.log(err);
                this.setState({ isLoading: false });
            });
    }
    //轮播变换
    onChangePriceItem = index => {
        console.log(index);
        var price = this.state.priceData[index];
        setTimeout(
            () =>
                this.setState({
                    currentPriceContent: price.content,
                    currentIndex: index,
                }),
            200
        );
    };
    //加入购物车
    onAddToShopCart = item => {
        //去重
        var sameItem = this.state.shopCartData.find(x => x.serviceId == item.serviceId);
        if (sameItem) {
            var index = this.state.shopCartData.indexOf(sameItem);
            this.state.shopCartData[index] = { ...sameItem, count: sameItem.count + 1 };
            this.setState({
                shopCartData: [...this.state.shopCartData],
            });
        } else {
            this.setState({
                shopCartData: [...this.state.shopCartData, { ...item, count: 1 }],
            });
        }
    };
    //清空购物车
    clearShopCart = () => {
        if (!this.state.shopCartData || !this.state.shopCartData.length) return;
        Alert.alert(null, '确定要清空购物车？', [
            {
                text: '确定',
                onPress: () => {
                    this.setState({
                        shopCartData: [],
                    });
                },
            },
            {
                text: '取消',
            },
        ]);
    };
    //修改数量
    onChangeCount(index, num) {
        var currentItem = this.state.shopCartData[index];
        var count = currentItem.count + num;
        this.state.shopCartData[index] = { ...currentItem, count: count };

        if (count === 0) {
            this.setState({
                shopCartData: this.state.shopCartData.filter((x, idx) => idx !== index),
            });
        } else {
            this.setState({
                shopCartData: [...this.state.shopCartData],
            });
        }
    }
    //从modal选中
    onSelectFromModal(item) {
        let state = { showFilterModal: false };
        if (item) {
            let currentIndex = this.state.priceData.findIndex(x => x.id === item.id);
            this.swiper.scrollBy(currentIndex - this.state.currentIndex);
        }
        this.setState(state);
    }
    //修改slider Tab
    changeSliderTab = tab => {
        this.setState({ sliderTab: tab });
    };
    //划出
    showSlider = tab => {
        Animated.timing(this.state.sliderLeft, {
            toValue: 0,
            duration: 500,
        }).start();
        this.setState({ sliderDisplay: true, sliderTab: tab });
    };
    //划入
    hideSlider = () => {
        Animated.timing(this.state.sliderLeft, {
            toValue: left,
            duration: 500,
        }).start(() => {
            this.setState({ sliderDisplay: false });
        });
    };
    //结算
    onSettle = () => {
        var preLoadItems = this.state.shopCartData.map(x => {
            return {
                id: x.serviceStoreId,
                num: x.count,
                type: x.serviceType == '0' ? 'project' : 'item',
            };
        });

        if (!preLoadItems.length) {
            showMessage('请选择一个项目');
            return;
        }
        getCompanyAutoFlowNumber() // 创建水单号
            .then(o => {
                if (!o.data) {
                    showMessage('创建订单号失败');
                    return;
                }

                let operatorText = '开单';
                let userInfo = this.props.auth.userInfo;

                let isSynthesis = userInfo.isSynthesis; //0专业店 1综合店
                let operatorId = userInfo.operateCategory[0].value; //都先处理为综合店 取第一个分类
                let deptId = userInfo.operateCategory[0].deptId;

                let params = {
                    companyId: userInfo.companyId,
                    storeId: userInfo.storeId,
                    deptId: deptId,
                    operatorId: operatorId, //主营id
                    operatorText: operatorText,
                    staffId: userInfo.staffId,
                    staffDBId: userInfo.staffDBId,
                    isSynthesis: userInfo.isSynthesis, //是否综合店
                    numType: 'flownum', //单号类型
                    numValue: o.data, //self.state.numValue, //单号
                    page: 'priceList',
                    member: null,
                    type: 'vip',
                    preLoadItems: preLoadItems,
                };
                this.props.navigation.navigate('CashierBillingActivity', params);
            });

        this.hideSlider();
        this.setState({
            shopCartData: [],
        });
    };

    render() {
        const {isLoading, categories, priceData, currentIndex, shopCartData, currentPriceContent, sliderTab, showFilterModal, sliderDisplay } = this.state;
        const shopCartTotalCount = shopCartData.reduce((result, item) => result + (item.count || 0), 0);
        return (
            <ImageBackground style={ priceIndexStyle.bgBox } source={ require("@imgPath/p-load-img.png") } resizeMode={'cover'}>
                <ModalLoadingIndicator text={isLoading ? '加载中' : ''} loading={isLoading} />
                {priceData.length ? (
                    <PriceSwiper
                        ref={swiper => {
                            this.swiper = swiper;
                        }}
                        priceData={priceData}
                        onChangePriceItem={this.onChangePriceItem}
                    />
                ) : (
                    <View></View>
                )}

                {/* 购物车-价目表-右操作框 */}
                <View style={[priceIndexStyle.rightPositionTitleB, { display: sliderDisplay ? 'none' : 'flex' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            this.showSlider('shopCart');
                        }}
                    >
                        <View style={priceIndexStyle.rightPositionT}>
                            <View style={priceIndexStyle.rightPositionImgB}>
                                <Image
                                    resizeMethod="resize"
                                    source={require('@imgPath/p-gm-r.png')}
                                    style={[priceIndexStyle.rightImg, { resizeMode: 'contain' }]}
                                />

                                <View style={priceIndexStyle.rightTextBox}>
                                    <Text style={priceIndexStyle.rigthNum}>{shopCartTotalCount}</Text>
                                </View>
                            </View>
                            <Text style={priceIndexStyle.rightText}>购买</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.showSlider('content');
                        }}
                    >
                        <View style={priceIndexStyle.rightPositionB}>
                            <View style={priceIndexStyle.rightPositionImgB}>
                                <Image
                                    resizeMethod="resize"
                                    source={require('@imgPath/p-jm-r.png')}
                                    style={[priceIndexStyle.rightImg, { resizeMode: 'contain' }]}
                                />
                            </View>
                            <Text style={priceIndexStyle.rightText}>价目</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={sliderDisplay ? priceIndexStyle.rightPositionBoxShow : { display: 'none' }}></View>
                {/* 购物车-价目表-主体 */}
                <Animated.View style={sliderDisplay ? [priceIndexStyle.rightPositionBox, { left: this.state.sliderLeft }] : { display: 'none' }} {...this._pinchResponder.panHandlers}>
                    <TouchableOpacity onPress={this.hideSlider} activeOpacity={1} style={priceIndexStyle.rightPositionBoxO}>
                        <View style={priceIndexStyle.hideBox}>
                            <TouchableOpacity onPress={this.hideSlider}>
                                <Image
                                    resizeMethod="resize"
                                    source={require('@imgPath/p-hide-box.png')}
                                    style={[priceIndexStyle.hideBtn, { resizeMode: 'contain' }]}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <View style={priceIndexStyle.rightAnBox}>
                        <View style={priceIndexStyle.trolleyBox}>
                            <View style={priceIndexStyle.trolleyTitleBox}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({ sliderTab: 'content' });
                                    }}
                                    underlayColor="white"
                                    style={priceIndexStyle.trolleyTitleLi}
                                >
                                    <View style={priceIndexStyle.trolleyTitle}>
                                        <Image
                                            resizeMethod="resize"
                                            source={
                                                sliderTab == 'content'
                                                    ? require('@imgPath/p-jm-trolley-act.png')
                                                    : require('@imgPath/p-jm-trolley.png')
                                            }
                                            style={[priceIndexStyle.rightImg, { resizeMode: 'contain' }]}
                                        />
                                        <Text style={priceIndexStyle.rigthTrolleyNum}>价目</Text>
                                    </View>
                                </TouchableHighlight>
                                <View style={priceIndexStyle.trolleyTitleLine}></View>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({ sliderTab: 'shopCart' });
                                    }}
                                    underlayColor="white"
                                    style={priceIndexStyle.trolleyTitleLi}
                                >
                                    <View style={priceIndexStyle.trolleyTitle}>
                                        <View style={priceIndexStyle.rightPositionImgB}>
                                            <Image resizeMethod="resize"
                                                source={
                                                    sliderTab == 'shopCart'
                                                        ? require('@imgPath/p-gm-trolley-act.png')
                                                        : require('@imgPath/p-gm-trolley.png')
                                                }
                                                style={[priceIndexStyle.rightImg, { resizeMode: 'contain' }]}
                                            />
                                            <View style={priceIndexStyle.rightTextBox}>
                                                <Text style={priceIndexStyle.rigthNum}>{shopCartTotalCount}</Text>
                                            </View>
                                        </View>
                                        <Text style={priceIndexStyle.rigthTrolleyNum}>购买</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={priceIndexStyle.trolleyBody}>
                                <PriceListContent
                                    display={sliderTab == 'content'}
                                    data={currentPriceContent}
                                    onAddToShopCart={this.onAddToShopCart}
                                />
                                <PriceListShopCart
                                    display={sliderTab == 'shopCart'}
                                    data={shopCartData}
                                    onChangeCount={this.onChangeCount.bind(this)}
                                    onClear={this.clearShopCart}
                                    onSettle={this.onSettle}
                                />
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* 弹层 */}
                <PriceListModal visible={showFilterModal} data={priceData} onSelected={this.onSelectFromModal.bind(this)} categories={categories} />
            </ImageBackground>
        );
    }
}

//mapping props
const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export const PriceListActivity = connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceList);
