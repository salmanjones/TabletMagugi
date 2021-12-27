//libs
import React from 'react';
import {connect} from 'react-redux';
import {
    Alert,
    Animated,
    FlatList,
    Image,
    InteractionManager,
    Modal,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-root-toast';
import Swipeout from 'react-native-swipeout';
//self
import {addCardItemStyles, cashierBillingStyle} from '../../styles';
import {
    AmendItemInfo,
    CardSelectBox,
    CashierBillInfo,
    CashierPay,
    HeadeOrderInfoLeft,
    HeadeOrderInfoRight,
    LoadingIndicator,
    ModalMemberIndentify,
    MultiplyPayModal,
    OtherPayFor,
    QRCodePaymentCashier,
    QRCodePaymentNew,
    QueryInput,
    SearchInput,
    SectionList,
    StaffModifyModal,
    StaffSelectBox,
    StockTips,
    VipPayFor
} from '../../components';
import {changeBillingOwner, selectStaffAclInfoResult} from '../../services';
import {
    cashierBillingFlowNumberInitAction,
    cashierBillingGetAction,
    cashierBillingInitAction,
    cashierBillingPayAction,
    cashierBillingSaveAction,
    cashierCheckFlowNumberAction,
    clearBillingCacheAction,
    deleteBillingAction,
    getPendingListAction
} from '../../actions';
import {getImage, ImageQutity, PaymentResultStatus, PixelUtil, showMessage, throttle} from '../../utils';
import {MultiPayActivity} from './MultiPayActivity';
import {AppNavigate} from "../../navigators";

let company_roundMode = null;
const animateLeft = PixelUtil.screenSize.width - PixelUtil.size(120);

const defaultMemberImg = 'https://pic.magugi.com/rotate-portrait.png';

class CashierBillingView extends React.Component {
    constructor(props) {
        super(props);
        var sex = '0';

        if (props.route.params.member) {
            sex = props.route.params.member.sex;
        }
        var isOldCustomer = '0';
        if (props.route.params.orderInfoLeftData) {
            isOldCustomer = props.route.params.orderInfoLeftData.isOldCustomer;
        }

        //props.route.params.isOldCustomer
        var defaultState = defaultInfos(sex, isOldCustomer);

        var sliderDisplayStatus = false;
        if (props.route.params.member) {
            sliderDisplayStatus = false;
        }

        this.state = {
            ...defaultState,
            sliderLeft: new Animated.Value(animateLeft),
            sliderDisplay: sliderDisplayStatus
        }
        this.addCosumableT = throttle(this.addCosumable, 600);
        this.moduleCode = props.route.params.moduleCode;
        this.cardCount = 0;
    }

    componentWillMount() {
        this.props.clearCacheData();
        // 设置手势的动作
        this._pinchResponder = PanResponder.create({
            /**
             * 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互
             * 需要注意，当水平位移大于30时，才进行后面的操作，不然可能是点击事件
             */
            onMoveShouldSetPanResponder(evt, gestureState) {
                console.log(gestureState.dx)
                if (gestureState.dx > 30 && gestureState.dy == 0)
                    return true;
                else
                    return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.hideRightPanel()
            },
        });
    }

    componentDidMount() {
        let roundMode = 0;
        const self = this;
        const {navigation} = this.props;
        const {params} = this.props.route;
        let userInfo = this.props.auth.userInfo;

        // 移除缓存的会员识别数据
        AsyncStorage.removeItem("queryMemberInfo")

        //会员识别框
        this.props.navigation.setParams({
            showMemberIcon: false,
            'prevPage': params.page,
            showMemberModal: function () {
                this.setState((prevState, props) => {
                    return {
                        ...prevState,
                        showMemberQueryModal: true
                    }
                });
            }.bind(this),
            showModifyBill: function () {
                this.setState((prevState, props) => {
                    return {
                        ...prevState,
                        showBillEditModal: true
                    }
                });
            }.bind(this),
            showRightCardPanel: function () {
                this.showRightPanel();
            }.bind(this),
            hideRightCardPanel: function () {
                this.hideRightPanel();
            }.bind(this)
        });

        // 请求数据
        InteractionManager.runAfterInteractions(() => {
            selectStaffAclInfoResult(userInfo.staffId, userInfo.companyId).then(data => {
                var resultMap = data.data;
                var staffAclMap = resultMap.staffAclMap;

                roundMode = resultMap.roundMode;

                this.setState((prevState, props) => {
                    prevState.roundMode = roundMode;
                    prevState.companySetting.isUseCash = resultMap.isUseCash;
                    prevState.accessRights=resultMap.accessRights;
                    return prevState
                });
                company_roundMode = roundMode;
                //company_settings.isUseCash=resultMap.isUseCash;//是否使用现金

                if (staffAclMap && staffAclMap.moduleCode && staffAclMap.moduleCode == 'ncashier_billing_price_adjustment') {
                    this.moduleCode = "1";
                } else {
                    this.moduleCode = "0";
                }

                if (params.page == 'pendingOrder') {
                    let queryParams = {
                        companyId: userInfo.companyId,
                        storeId: userInfo.storeId,
                        staffId: userInfo.staffId,
                        staffDBId: userInfo.staffDBId,
                        isSynthesis: userInfo.isSynthesis,//是否综合店
                        flowNumber: params.billing.flowNumber,
                        billingNo: params.billing.billingNo
                    }

                    this.props.getOrderInfo(queryParams);

                    //来自于开单
                } else {
                    this.props.initOrderInfo(params);

                    if (params.member && params.member.id) {
                        this.onMemberConfirm(params.member);
                    }
                }

                let {route} = self.props
                navigation.setOptions({
                    headerLeft:  () => (
                        <HeadeOrderInfoLeft navigation={navigation} router={route} hiddenPriceOrder={true}/>
                    ),
                    headerRight: () =>  (
                        <HeadeOrderInfoRight navigation={navigation} router={route} />
                    )
                })
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        var that = this;
        if (nextProps.orderInfo.propChangeType == 'initData' && !this.state.isInited) {
            let orderData = nextProps.orderInfo.orderData;

            orderData.memberInfo = null;
            orderData.customerSex = '0';
            orderData.isOldCustomer = '0';

            if (orderData.memberInfo == undefined) {
                orderData.customerSex = '0';
            }
            var params = nextProps.route.params;
            buildDatas(this, orderData, () => {
                //加载传入的项目信息 1755117 1904625 1904630

                //params.preLoadItems=[{type:'project',id:1755117,num:2},{type:'item',id:1904625,num:2},{type:'item',id:1904630,num:3}];
                if (params && params.preLoadItems && params.preLoadItems.length) {
                    var consumeItems = params.preLoadItems.reduce((result, x) => {
                        var consumeItem;
                        if (x.type == 'project') {
                            let theProject = that.state.allProjDatas[x.id];
                            consumeItem = theProject ? {
                                itemId: theProject.id,
                                itemName: theProject.name,
                                itemNo: theProject.itemNo,
                                itemPrice: theProject.sumPrice,
                                itemNum: x.num,
                                itemType: 'proj',
                                isChoosed: false,
                                unitType: '',
                                assistStaffDetail: [defaultServicer(), defaultServicer(), defaultServicer()]
                            } : null;
                        } else if (x.type == 'item') {
                            let theTakeItem = that.state.allItemDatas[x.id];
                            consumeItem = theTakeItem ? {
                                itemId: theTakeItem.id,
                                itemName: theTakeItem.name,
                                itemNo: theTakeItem.itemNo,
                                itemPrice: theTakeItem.unitPrice,
                                itemNum: x.num,
                                itemType: 'item',
                                isChoosed: false,
                                unitType: '1',
                                assistStaffDetail: [defaultServicer(), defaultServicer(), defaultServicer()]
                            } : null;
                        }

                        consumeItem && result.push(convertToBackendData.call(that, that.state, consumeItem))

                        return result;
                    }, []);

                    that.setState((prevState, props) => {
                        prevState.consumeItems = consumeItems;
                        //计算价格
                        prevState = buildTotalPrice(prevState);
                        return prevState;
                    });
                }
            });

        } else if (nextProps.orderInfo.propChangeType == 'getData' && !this.state.isgeted) {
            if (nextProps.orderInfo.orderData.flowNumber == '-1') {
                this.setState((prevState, props) => {
                    prevState.isgeted = true;

                    return prevState;
                });

                const {params} = this.props.route;
                Alert.alert(
                    '系统提示',
                    '订单状态异常',
                    [
                        {
                            text: '知道了',
                            onPress: () => {
                                if (params.page == 'pendingOrder') {
                                    this.props.resetToCashier(true);
                                } else {
                                    this.props.resetToCashier();
                                }
                            }
                        }
                    ]
                );
            } else {
                buildExistDatas(this, nextProps.orderInfo.orderData);
            }
        } else if (nextProps.orderInfo.propChangeType == 'saveOrder' && !this.state.isSaved) {
            showMessage('挂单成功');
            this.setState((prevState, props) => {
                prevState.isSaved = true;
                return prevState;
            })

            const {params} = this.props.route;
            //this.props.navigation.setParams({ back: null});
            if (params.page == 'pendingOrder') {
                this.props.resetToCashier(true);
            } else {
                this.props.resetToCashier();
            }
        } else if (nextProps.orderInfo.propChangeType == 'toApp') {
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToAppPayModal = true;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;
                return prevState;
            })
        } else if (nextProps.orderInfo.propChangeType == 'toWXApp') {
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = true;
                return prevState;
            })
        } else if (nextProps.orderInfo.propChangeType == 'toMultiplyPay') {
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = true;
                prevState.showToWXAppPayModal = false;
                return prevState;
            })
        } else if (nextProps.orderInfo.propChangeType == 'prePayException') {//预算发生异常
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showToAppPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;
                return prevState;
            });

            Alert.alert(
                '系统提示',
                '预算失败,请稍后再试',
                [
                    {
                        text: '知道了',
                        onPress: () => {
                            reloadOrderInfo(this);
                        }
                    }
                ]
            );
        } else if (nextProps.orderInfo.propChangeType == 'payException') {//结算发生异常
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showToAppPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;
                return prevState;
            });

            Alert.alert(
                '系统提示',
                '结算失败，请稍后再试',
                [
                    {
                        text: '知道了',
                        onPress: () => {
                            reloadOrderInfo(this);
                        }
                    }
                ]
            );
        } else if (nextProps.orderInfo.propChangeType == 'stockFailure') {//库存不足
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showToAppPayModal = false;
                prevState.showStockTipsModal = true;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;

                return prevState;
            });

            Alert.alert(
                '系统提示',
                '库存不足，请调整外卖数量',
                [
                    {
                        text: '知道了',
                        onPress: () => {
                            reloadOrderInfo(this);
                        }
                    }
                ]
            );
        } else if (nextProps.orderInfo.propChangeType == 'stockException') {//库存异常
            this.setState((prevState, props) => {
                prevState.showStockTipsModal = false;
                prevState.showCashierPayModal = false;
                prevState.showToPayAliWxModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;

                return prevState;
            });

            Alert.alert(
                '系统提示',
                '库存减扣失败，请稍后再试',
                [
                    {
                        text: '知道了',
                        onPress: () => {
                            reloadOrderInfo(this);
                        }
                    }
                ]
            );
        } else if (nextProps.orderInfo.propChangeType == 'toAppException') {//库存异常
            this.setState((prevState, props) => {
                prevState.showStockTipsModal = false;
                prevState.showCashierPayModal = false;
                prevState.showToPayAliWxModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;

                return prevState;
            });

            Alert.alert(
                '系统提示',
                '绑定app发生错误，请稍后再试',
                [
                    {
                        text: '知道了',
                        onPress: () => {
                            reloadOrderInfo(this);
                        }
                    }
                ]
            );
        } else if (nextProps.orderInfo.propChangeType == 'paySuccess') {
            this.setState((prevState, props) => {
                prevState.tradeInfo = nextProps.orderInfo.tradeInfo;
                prevState.showCashierPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToPayAliWxModal = true;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;
                return prevState;
            })
        } else if (nextProps.orderInfo.propChangeType == 'payEndSuccess') {
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = false;
                prevState.showStockTipsModal = false;
                prevState.showToPayAliWxModal = false;
                prevState.showToAppPayModal = false;
                prevState.showToMultiplyPayModal = false;
                prevState.showToWXAppPayModal = false;
                return prevState;
            })
            //showMessage('支付成功');
            //this.props.resetToCashier();

        } else if (nextProps.orderInfo.propChangeType == 'payEndException') {
            showMessage('支付失败,' + nextProps.orderInfo.message);
            reloadOrderInfo(this);
        } else if(nextProps.orderInfo.propChangeType == 'reloadOrder'){
            reloadOrderInfo(this);
        } else if (nextProps.orderInfo.propChangeType == 'editConsumable') {
            let itemWithConsumable = nextProps.orderInfo.itemWithConsumable;
            let index = this.state.consumeItems.findIndex(x => x.projectMirror
                && itemWithConsumable.projectMirror
                && x.service == 1
                && x.projectMirror.index == itemWithConsumable.projectMirror.index);
            this.state.consumeItems[index] = {
                ...this.state.consumeItems[index],
                consumables: itemWithConsumable.consumables
            }
            this.setState({
                consumeItems: [...this.state.consumeItems]
            })
        } else if (nextProps.orderInfo.propChangeType=='deleteOrder'){
            showMessage('废单成功');
            this.props.resetToCashier();
        } else if (nextProps.orderInfo.propChangeType=='deleteOrderError'){
            showMessage(nextProps.orderInfo.message);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps == this.props && !nextState.isgeted) {
            var isAdd = nextState.consumeItems && nextState.consumeItems.length == 1;
            var isEmpty = !nextState.consumeItems || !nextState.consumeItems.length;
            var backHandler = nextProps.route.params['back'];
            if (isAdd && !backHandler) this.handleBackEvent(true);
            if (isEmpty && backHandler) this.handleBackEvent(false);
        }
    }

    handleBackEvent = isEdit => {
        const {navigation} = this.props;
        if (isEdit) {
            navigation.setParams({
                back: () => {
                    Alert.alert('系统提示', '订单尚未保存，你确认要退出吗？', [
                        {
                            text: '退出',
                            onPress: () => {
                                navigation.setParams({back: null,});
                                navigation.goBack();
                            },
                        },
                        {
                            text: '取消',
                        },
                    ]);
                },
            });
        } else {
            navigation.setParams({back: null});
        }
    };

    //切换消费项类型
    swipConsumeItem(type) {
        buildSwipView(this, type);
    }

    //筛选消费项目
    filterConsumeItem(filterType, itemtype, cid, index) {
        buildFilterDatas(this, filterType, itemtype, index);
    }


    //添加消费项
    addConsumeItem(itemInfo) {
        this.setState((prevState, props) => {
            //服务人信息
            itemInfo.assistStaffDetail = [defaultServicer(), defaultServicer(), defaultServicer()];
            if (prevState.consumeItems.length > 0) {
                let prevServicer = prevState.consumeItems[prevState.consumeItems.length - 1].assistStaffDetail;


                if (itemInfo.itemType == 'item') {
                    itemInfo.assistStaffDetail = [
                        this.copyServicer(prevServicer[0],{appoint:"false"})
                        ,this.copyServicer(prevServicer[1],{appoint:"false"})
                        ,this.copyServicer(prevServicer[2],{appoint:"false"})
                    ];
                } else {
                    itemInfo.assistStaffDetail = [
                        this.copyServicer(prevServicer[0])
                        ,this.copyServicer(prevServicer[1])
                        ,this.copyServicer(prevServicer[2])
                    ];
                }
            }

            prevState.consumeItems.push(convertToBackendData(prevState, itemInfo));
            //计算价格
            prevState = buildTotalPrice(prevState);
            return prevState;
        });
    }

    copyServicer(preServicer,overrideFields){
        let servicer= Object.assign({}, preServicer, {
            //appoint: "false"
            ...overrideFields
           ,performance:""
           ,workTypeDesc:preServicer.positionInfo
           ,workTypeId:preServicer.positionId
        });

        delete servicer['staffPerformance'];
        delete servicer['staffWorkfee'];
        delete servicer['workerFee'];

        return servicer;
    }

    //添加消耗
    addCosumable(itemData) {
        const {navigation} = this.props;
        let billingInfo = {
            flowNumber: this.state.flowNumber,
            categoryId: this.state.categoryId,
            deptId: this.state.deptId,
            billingNo: this.state.billingNo,
            companyId: this.state.companyId,
            storeId: this.state.storeId,
            id: this.state.id,
            type: this.state.type,
            memberId: this.state.memberId
        }

        let newItem = {...itemData, projectMirrorIndex: itemData.projectMirror.index}
        navigation.navigate('ConsumableActivity', {
            itemData: newItem,
            orderData: billingInfo,
        });

    }

    //展示修改价格与数量弹出框
    showEditConsumeItemModal(index) {
        this.setState((prevState, props) => {
            prevState.showEditConsumeItemModal = true;
            prevState.currentEditConsumeItemIndex = index;
            prevState.currentEditConsumeServicerIndex = -1;
            return prevState;
        });
    }

    //取消修改价格与数量弹出框
    hideEditConsumeItemModal(index) {
        this.setState((prevState, props) => {
            prevState.showEditConsumeItemModal = false;
            return prevState;
        });
    }

    //修改价格与数量
    editConsumeItemInfo(num, paidPrice) {
        this.setState((prevState, props) => {
            let itemIndex = prevState.currentEditConsumeItemIndex;
            let itemInfo = prevState.consumeItems[itemIndex];
            itemInfo.itemNum = num;
            if (itemInfo.itemType == 'card') {
                itemInfo.consumeTimeAmount = num;
            } else {
                itemInfo.amount = num;
            }
            if (paidPrice == '' || paidPrice == 'NaN') {

                itemInfo.paidPrice = '';
                itemInfo.totalPrice = itemInfo.costPrice;
                itemInfo.priceType = 0;
                itemInfo.fixedPrice = 0;
                itemInfo.extraPrice = 0;
                itemInfo.discountPrice = 0;
                itemInfo.isGift = 0;

            } else {
                let diffMoney = 0.0;

                //等于零是为了满足客户不想有折扣的情况
                if ((parseFloat(itemInfo.costPrice) - parseFloat(paidPrice)) >= 0) {
                    diffMoney = parseFloat(itemInfo.costPrice) - parseFloat(paidPrice);

                    itemInfo.paidPrice = paidPrice;
                    itemInfo.priceType = 2;
                    itemInfo.fixedPrice = diffMoney;
                    itemInfo.totalPrice = paidPrice;
                    itemInfo.discountPrice = diffMoney;
                }
                if ((parseFloat(itemInfo.costPrice) - parseFloat(paidPrice)) < 0) {
                    diffMoney = Math.abs(parseFloat(itemInfo.costPrice) - parseFloat(paidPrice));

                    itemInfo.paidIn = paidPrice;
                    itemInfo.paidPrice = paidPrice;
                    itemInfo.extraPrice = diffMoney;
                    itemInfo.priceType = 0;
                    itemInfo.totalPrice = paidPrice;
                }
            }

            prevState.showEditConsumeItemModal = false;
            prevState.consumeItems[itemIndex] = computePrice(itemInfo);

            //计算价格
            prevState = buildTotalPrice(prevState);
            if (parseFloat(prevState.totalConsumePrice)) {
                prevState.totalConsumePrice = parseFloat(prevState.totalConsumePrice).toFixed(this.state.roundMode);
            }
            return prevState;
        });
    }

    //添加服务人
    addConsumeItemServicer(itemIndex, servicerIndex) {
        this.setState((prevState, props) => {
            prevState.addConsumeType = 'servicer';
            prevState.currentEditConsumeItemIndex = itemIndex;
            prevState.currentEditConsumeServicerIndex = servicerIndex;
            prevState.clearServicerGridChoose = itemIndex.toString() + servicerIndex.toString();
            prevState.queryInputTips = '员工查询';
            prevState.queryInputText = '';
            prevState.showFilterMsgBoard = -1;
            prevState.showFilterKeyBoard = false;

            if (prevState.filterServicerKey.length > 0) {
                prevState.currentShowServicerDatas = [];
                Object.keys(prevState.allServicerDatas).map((staffId) => {
                    if (prevState.allServicerDatas[staffId].position == prevState.filterServicerKey) {
                        prevState.currentShowServicerDatas.push(staffId);
                    }
                });
            } else {
                prevState.currentShowServicerDatas = [];
                Object.keys(prevState.allServicerDatas).map((staffId) => {
                    prevState.currentShowServicerDatas.push(staffId);
                });
            }

            return prevState;
        });
    }

    //选择服务人
    onStaffSelected(staff) {
        this.setState((prevState, props) => {
            let itemIndex = prevState.currentEditConsumeItemIndex;
            let currentItem = prevState.consumeItems[itemIndex];
            if (currentItem && currentItem != null && prevState.currentEditConsumeServicerIndex !== -1) {
                let servicerIndex = prevState.currentEditConsumeServicerIndex;
                let servicerInfo = Object.assign({}, defaultServicer(), staff);
                let oldServicer = currentItem.assistStaffDetail[servicerIndex];

                if (oldServicer.id.length > 1) {
                    servicerInfo.appoint = oldServicer.appoint;
                }

                servicerInfo.workTypeId = staff.positionId;
                servicerInfo.workTypeDesc = staff.positionInfo;
                servicerInfo.workPositionTypeId = staff.staffType;

                prevState.consumeItems[itemIndex].assistStaffDetail[servicerIndex] = servicerInfo;
                return prevState;
            } else {
                return prevState;
            }
        });
    }

    //修改服务人
    editServicer(){
        const {currentEditConsumeItemIndex,currentEditConsumeServicerIndex,consumeItems}=this.state;
        let item=consumeItems[currentEditConsumeItemIndex];

        this.staffEditModal.show({
            ...item
            ,assistList:item.assistStaffDetail
            ,service:Number(item.service)
        },currentEditConsumeServicerIndex);
    }

    //修改服务人完成item
    onSaveEditServicer(item,staffIndex,staff){

        const {currentEditConsumeItemIndex,currentEditConsumeServicerIndex,consumeItems}=this.state;

        let curItem=consumeItems[currentEditConsumeItemIndex];
        curItem.assistStaffDetail[currentEditConsumeServicerIndex]={...staff};
        curItem.assistStaffDetail=[...curItem.assistStaffDetail];
        this.setState({
            consumeItems:[...this.state.consumeItems]
        });

    }

    //指定非指定
    onAppoint(type) {
        let isAppoint = type == '0' ? "false" : "true";
        this.setState((prevState, props) => {
            prevState.consumeItems[prevState.currentEditConsumeItemIndex]
                .assistStaffDetail[prevState.currentEditConsumeServicerIndex]
                .appoint = isAppoint;

            return prevState;
        })
    }

    //删除服务人
    removeServicer() {
        this.setState((prevState, props) => {
            prevState.consumeItems[prevState.currentEditConsumeItemIndex]
                .assistStaffDetail[prevState.currentEditConsumeServicerIndex] = defaultServicer();
            prevState.clearServicerGridChoose = '06';
            return prevState
        })
    }

    //会员识别确定
    onMemberConfirm(member) {
        if (!member) return;

        //如果是取单并且是散客单 则转为会员单
        if (this.state.isgeted && this.state.memberType == 1) {
            changeBillingOwner({
                memberId: member.id,
                billingNo: this.state.billingNo,
                storeId: this.state.storeId
            }).then(() => {
                showMessage('订单已转为会员单');
            });
        }
        this.bindMemberInfo(member);
    }

    bindMemberInfo(member) {
        member.userImgUrl = getImage(
            member.imgUrl,
            ImageQutity.member_small,
            defaultMemberImg
        );

        var cardBalanceCount = 0.0;
        var cardCount = 0;

        if (member.vipStorageCardList) {
            var vipStorageCardList = member.vipStorageCardList;
            cardCount = vipStorageCardList.length;

            for (let k = 0; k < vipStorageCardList.length; k++) {
                let cardInfo = vipStorageCardList[k];
                let cardType = cardInfo.cardType;//2
                let cardStatus = cardInfo.status;
                if (cardStatus == 0 && cardType == 1) {
                    cardBalanceCount += parseFloat(cardInfo.balance);
                }
            }
        }

        member.cardCount = cardCount;
        member.cardBalanceCount = cardBalanceCount;

        this.props.navigation.setParams({
            ...this.props.route.params,
            showMemberIcon: true,
            memberInfo: member,
            member: member
        });

        // 更新缓存
        let {route, navigation} = this.props;
        route.params.showMemberIcon = true
        route.params.memberInfo = member
        route.params.member = member
        AsyncStorage.setItem("queryMemberInfo", JSON.stringify({
            route,
            navigation
        }))

        this.setState((prevState, props) => {
            //构建次卡项目
            buildCardProjDatas(prevState, member.vipStorageCardList);

            if (prevState.timesProjectDatas.length > 0) {

                this.cardCount = prevState.timesProjectDatas.length;
                this.swipConsumeItem('card');
            }

            //构建切换视图
            prevState.showMemberQueryModal = false;
            prevState.addProjStyle = cashierBillingStyle.consumeTextBoxActive
            prevState.addProjTextStyle = cashierBillingStyle.consumeTextActive
            prevState.addItemStyle = cashierBillingStyle.consumeTextBox
            prevState.addItemTextStyle = cashierBillingStyle.consumeText
            prevState.addCardStyle = cashierBillingStyle.consumeTextBox
            prevState.addCardTextStyle = cashierBillingStyle.consumeText
            prevState.addConsumeType = 'proj'
            prevState.currentEditConsumeItemIndex = -1
            prevState.currentEditConsumeServicerIndex = -1
            prevState.clearServicerGridChoose = '02'
            prevState.queryInputTips = '项目查询'
            prevState.queryInputText = ''
            prevState.memberType = member.memberType;
            prevState.memberId = member.id;
            prevState.customerSex = member.sex;
            prevState.memberInfo = member;
            prevState.reserveId = member.reserveId;

            //如果更新会员，则删除之前的次卡项目
            if (member.id != prevState.memberId) {
                let newConsumeItems = [];
                for (let k = 0; k < prevState.consumeItems.length; k++) {
                    let itemInfo = prevState.consumeItems[k];
                    if (itemInfo.itemType != 'card') {
                        newConsumeItems.push(item);
                    }
                }
                prevState.consumeItems = newConsumeItems;
                prevState = buildTotalPrice(prevState);
            }

            return prevState;
        });
    }

    //取消会员识别
    onMemberCanel() {
        this.setState((prevState, props) => {
            return {...prevState, showMemberQueryModal: false}
        })
    }

    //退出修改订单信息
    canelOrderEdit() {
        this.setState((prevState, props) => {
            prevState.showBillEditModal = false;
            return prevState;
        })
    }

    //修改单据信息
    confirmOrderEdit(orderInfo) {
        this.setState((prevState, props) => {
            prevState.flowNumber = orderInfo.flowNumber;
            prevState.billingNo = orderInfo.billingNo;
            prevState.handNumber = orderInfo.handNumber;
            prevState.keyNumber = orderInfo.handNumber;
            prevState.customerNumber = orderInfo.customerNumber;
            prevState.billingNum = orderInfo.customerNumber;
            prevState.isOldCustomer = orderInfo.isOldCustomer;
            prevState.customerSex = orderInfo.customerSex;
            prevState.showBillEditModal = false;
            return prevState;
        });

        //打开会员识别框
        let prevState = this.props.route;
        this.props.navigation.setParams({
            ...prevState, orderInfoLeftData: orderInfo
        });
    }

    //挂单
    onSaveOrder() {
        let {toSubmit, data, index} = buildSubmitData(this);

        if (toSubmit) {
            this.props.saveOrderInfo(data, false);
            this.props.initOrderFlowNumber();
        } else if (index != -1) {
            //滚动到具体行数
        }
    }

    //结单
    onCashierOrder() {
        let {toSubmit, data, index} = buildSubmitData(this);

        if (toSubmit) {
            this.setState((prevState, props) => {
                prevState.showCashierPayModal = true;
                return prevState;
            });
            this.props.initOrderFlowNumber();
        } else if (index != -1) {
            //滚动到具体行数
        }
    }

    //结单--挂单
    onCashierOrderSave() {
        let {toSubmit, data, index} = buildSubmitData(this);

        if (toSubmit) {
            this.props.saveOrderInfo(data);
            this.props.initOrderFlowNumber();
        } else if (index != -1) {
            //滚动到具体行数
        }
    }

    onDeleteBilling(){
        let {id,billingNo}=this.state;

        if(id && billingNo){
            Alert.alert('系统提示', '确定要作废当前单据么？', [
                {
                    text: '确定',
                    onPress: () => {this.props.deleteBilling({id,billingNo});},
                },
                { text: '取消',},
            ]);
        }else{
            showMessage('请先挂单');
        }
    }

    //结单--去支付
    onCashierOrderPay(channel, payType, payTypeParams) {
        let {toSubmit, data, index} = buildSubmitData(this);
        if (toSubmit) {
            let paymentTimesCard = [];//次卡代付项数据
            let result = dealTimesCardProjectPaymentGeneral(this, data, paymentTimesCard);
            if (!result.stat) {
                showMessage(result.msg);
            } else {
                let netWayway = buildWxAliPay(this);//微信、支付宝预算数据
                let payComsumeItems = buildPayComsumeItems(this, data);//消费详情预算数据
                let prePayData = {
                    itemList: JSON.stringify(payComsumeItems),
                    //paymentList:netWayway,
                    paymentList: payTypeParams,
                    billingInfo: data.billing,
                    roundMode: this.state.roundMode,
                    sendMsg: false
                }

                if(channel=='multiply'){//组合支付
                    let prevPage = this.props.route.params.prevPage
                    AppNavigate.navigate('MultiPayActivity', {
                        companySetting:this.state.companySetting,
                        saveBillingData:data,
                        items:payComsumeItems,
                        memberInfo:this.state.memberInfo,
                        paymentTimesCard:paymentTimesCard,
                        goBackKey:prevPage
                    });

                    return;
                }
                this.setState((prevState, props) => {
                    prevState.choosePayType = payType;
                    return prevState;
                });
                this.props.submitOrderInfo(data, prePayData, payType, channel);
            }
        }
    }

    //去app支付
    onToAppPay() {
        this.setState((prevState, prop) => {
            prevState.showToAppPayModal = false;
            return prevState;
        });

        const {params} = this.props.route;

        if (params.page == 'pendingOrder') {
            this.props.resetToCashier(true);
        } else {
            this.props.resetToCashier();
        }
    }

    //去微信小程序支付
    onToWXAppPay() {
        this.setState((prevState, props) => {
            prevState.showCashierPayModal = false;
            prevState.showStockTipsModal = false;
            prevState.showToAppPayModal = false;
            prevState.showToMultiplyPayModal = false;
            prevState.showToWXAppPayModal = false;
            return prevState;
        })

        const {params} = this.props.route;
        if (params.page == 'pendingOrder') {
            this.props.resetToCashier(true);
        } else {
            this.props.resetToCashier();
        }
    }

    //关闭支付框
    onClosePay(type) {
        this.setState((prevState, prop) => {
            prevState.showToPayAliWxModal = false;
            return prevState;
        });

        if ('0' == type) {
            const {params} = this.props.route;

            if (params.page == 'pendingOrder') {
                this.props.resetToCashier(true);
            } else {
                this.props.resetToCashier();
            }
        } else {
            const {params} = this.props.route;

            if (params.page == 'pendingOrder') {
                this.props.resetToCashier(true);
            } else {
                this.props.resetToCashier();
            }
        }
    }

    //使用键盘过滤项目|外卖|服务人
    filterItemsByNum() {
        this.setState((prevState, props) => {
            prevState.showFilterKeyBoard = true;
            prevState.showFilterMsgBoard = -1;
            return prevState;
        });
    }

    //通过键盘进行查询
    queryByNumber(number = '') {
        buildQueryItems(this, number);
    }

    //界面所有动画完成之后的动作
    componentDidUpdate() {
        afterRenderAction && afterRenderAction();
        afterRenderAction = () => {
        };
    };

    //删除加入的消费项
    removeItem(itemIndex) {
        this.setState((prevState, props) => {
            let newItems = [];
            prevState.consumeItems.forEach((item, index) => {
                if (itemIndex != index) {
                    newItems.push(item);
                }
            });
            prevState.consumeItems = newItems;

            //重新计算价格
            prevState = buildTotalPrice(prevState);

            //当消费项不存在时，切换至项目选择
            if (newItems.length < 1) {
                prevState.addProjStyle = cashierBillingStyle.consumeTextBoxActive;
                prevState.addProjTextStyle = cashierBillingStyle.consumeTextActive;
                prevState.addItemStyle = cashierBillingStyle.consumeTextBox;
                prevState.addItemTextStyle = cashierBillingStyle.consumeText;
                prevState.addCardStyle = cashierBillingStyle.consumeTextBox;
                prevState.addCardTextStyle = cashierBillingStyle.consumeText;
                prevState.addConsumeType = 'proj';
                prevState.currentShowProjDatas = prevState.cacheAllProjDatas;
                prevState.choosedProjPriceIndex = -1;
                prevState.choosedProjPriceDatas = prevState.cacheAllProjDatas;//当前选择的项目数据
                prevState.choosedProjCategoryIndex = -1;
                prevState.choosedProjCategoryDatas = prevState.cacheAllProjDatas;
                prevState.currentEditConsumeItemIndex = -1;
                prevState.currentEditConsumeServicerIndex = -1;
                prevState.clearServicerGridChoose = '00';
                prevState.queryInputTips = '项目查询';
                prevState.queryInputText = '';
                prevState.showFilterKeyBoard = false;
                prevState.showFilterMsgBoard = -1;
            }

            return prevState;
        });
    }

    billInfoLoading(isLoading) {
        this.setState((prevState, prrams) => {
            prevState.loading = isLoading;

            return prevState;
        });
    }

    toCanelPay() {
        this.setState((prevState, props) => {
            prevState.showCashierPayModal = false;
            return prevState;
        })
    }

    closeStockModal() {
        this.setState((prevState, props) => {
            prevState.showStockTipsModal = false;
            return prevState;
        });
        reloadOrderInfo(this);
    }

    confirmPaySuccess() {
        //this.props.navigation.navigate('CashierActivity');
        //this.props.navigation.setParams({back: null});
        this.props.resetToCashier();
    }

    showRightPanel() {
        Animated.timing(this.state.sliderLeft, {
            toValue: 0,
            duration: 500,
        }).start();
        this.setState({sliderDisplay: true});
    }

    hideRightPanel() {
        Animated.timing(this.state.sliderLeft, {
            toValue: animateLeft,
            duration: 500,
        }).start(() => {
            this.setState({sliderDisplay: false});
        });
    }

    searchConfirm = query => {
        if (query != '') {
            buildQueryItems(this, query);
        }
    }

    searchCancel() {
        let cacheAllDatas;
        let type = this.state.addConsumeType;

        if ('proj' == type) {
            cacheAllDatas = this.state.cacheAllProjDatas;

            this.setState((prevState, props) => {
                prevState.showFilterKeyBoard = false;
                prevState.showFilterMsgBoard = -1;
                prevState.currentShowProjDatas = cacheAllDatas;

                prevState.choosedProjPriceIndex = -1;
                prevState.choosedProjPriceDatas = cacheAllDatas;
                prevState.choosedProjCategoryIndex = -1;
                prevState.choosedProjCategoryDatas = cacheAllDatas;
                prevState.currentEditConsumeItemIndex = -1;
                prevState.currentEditConsumeServicerIndex = -1;
                prevState.clearServicerGridChoose = '00';
                prevState.queryInputText = '';


                return prevState;
            });
        }
        if ('item' == type) {
            cacheAllDatas = this.state.cacheAllItemDatas;

            this.setState((prevState, props) => {
                prevState.showFilterKeyBoard = false;
                prevState.showFilterMsgBoard = -1;
                prevState.currentShowItemDatas = cacheAllDatas;

                prevState.choosedItemPriceIndex = -1;
                prevState.choosedItemPriceDatas = cacheAllDatas;//当前选择的外卖数据
                prevState.choosedItemCategoryIndex = -1;
                prevState.choosedItemCategoryDatas = cacheAllDatas;//当前选择的外卖数据
                prevState.currentEditConsumeItemIndex = -1;
                prevState.currentEditConsumeServicerIndex = -1;
                prevState.clearServicerGridChoose = '01';
                prevState.queryInputText = '';

                return prevState;
            });
        }
        if ('servicer' == type) {
            this.setState((prevState, props) => {
                prevState.showFilterKeyBoard = false;
                prevState.showFilterMsgBoard = -1;
                prevState.queryInputText = '';

                prevState.currentShowServicerDatas = [];
                Object.keys(prevState.allServicerDatas).map((staffId) => {
                    prevState.currentShowServicerDatas.push(staffId);
                });

                return prevState;
            });
        }
    }

    render() {
        let consumeItemLength = this.state.consumeItems.length;
        let editConsumeItemData = {};
        if (this.state.showEditConsumeItemModal) {
            editConsumeItemData = this.state.consumeItems[this.state.currentEditConsumeItemIndex];
        }

        let isLoading = false;
        if (this.props.orderInfo.loading || this.props.servicers.loading) {
            isLoading = true;
        } else {
            isLoading = false;
        }

        let isShowAppoint = false;
        let currentServicerInfo = {appoint: 'false'};
        if (this.state.currentEditConsumeServicerIndex != -1
            && this.state.currentEditConsumeItemIndex != -1
            && this.state.consumeItems[this.state.currentEditConsumeItemIndex]
            && this.state.consumeItems[this.state.currentEditConsumeItemIndex]
                .assistStaffDetail[this.state.currentEditConsumeServicerIndex].value.length > 0) {
            isShowAppoint = true;
            currentServicerInfo = this.state.consumeItems[this.state.currentEditConsumeItemIndex].assistStaffDetail[this.state.currentEditConsumeServicerIndex];
        }

        let showModalLayerVisible = this.state.showEditConsumeItemModal ||
            this.state.showBillEditModal ||
            this.state.showCashierPayModal ||
            this.state.showToAppPayModal ||
            this.state.showToWXAppPayModal ||
            this.state.showToMultiplyPayModal ||
            this.state.showStockTipsModal ||
            this.state.showToPayAliWxModal

        let showPaySuccess = this.props.orderInfo.propChangeType == 'payEndSuccess';

        let billingInfo = {
            flowNumber: this.state.flowNumber,
            categoryId: this.state.categoryId,
            deptId: this.state.deptId,
            billingNo: this.state.billingNo,
            companyId: this.state.companyId,
            storeId: this.state.storeId,
            id: this.state.id,
            type: this.state.type,
            memberId: this.state.memberId
        }

        const accessRights=this.state.accessRights;

        return (
            <View style={cashierBillingStyle.container}>
                {/* 页面loading */}
                {isLoading && <LoadingIndicator/>}
                {
                    this.state.showEditConsumeItemModal && (
                        <AmendItemInfo
                            roundMode={this.state.roundMode}
                            moduleCode={this.moduleCode}
                            itemInfo={editConsumeItemData}
                            hideEditConsumeItemModal={this.hideEditConsumeItemModal.bind(this)}
                            editConsumeItemInfo={this.editConsumeItemInfo.bind(this)}
                            loading={isLoading}/>
                    )
                }

                {
                    this.state.showBillEditModal && (
                        <CashierBillInfo
                            datas={this.state}
                            billInfo={{
                                billingNo: this.state.billingNo,
                                storeId: this.state.storeId,
                                companyId: this.state.companyId
                            }}
                            canModifyCustomerNum={accessRights && accessRights.ncashier_billing_num}
                            billInfoLoading={this.billInfoLoading.bind(this)}
                            canelOrderEdit={this.canelOrderEdit.bind(this)}
                            confirmOrderEdit={this.confirmOrderEdit.bind(this)}
                            loading={isLoading}/>
                    )
                }
                {

                    this.state.showCashierPayModal && (
                        <CashierPay
                            consumeItems={this.state.consumeItems}
                            billingInfo={billingInfo}
                            companySetting={this.state.companySetting}
                            member={this.state.memberInfo}
                            totalCardPrjs={this.state.totalConsumeNum}
                            memberType={this.state.memberType}
                            onCashierOrderSave={this.onCashierOrderSave.bind(this)}
                            onCashierOrderPay={this.onCashierOrderPay.bind(this)}
                            loading={isLoading}
                            toCanel={this.toCanelPay.bind(this)}
                        />
                    )
                }
                {
                    this.state.showToAppPayModal && (
                        <VipPayFor
                            flowNumber={this.state.flowNumber}
                            billingNo={this.state.billingNo}
                            storeId={this.state.storeId}
                            companyId={this.state.companyId}
                            onClose={this.onToAppPay.bind(this)}
                            loading={isLoading}
                        />
                    )
                }
                {
                    this.state.showToMultiplyPayModal && (
                        <MultiplyPayModal/>
                    )
                }
                {
                    this.state.showToWXAppPayModal && (
                        <OtherPayFor
                            flowNumber={this.state.flowNumber}
                            onClose={this.onToWXAppPay.bind(this)}
                            loading={isLoading}
                            billingNo={this.props.orderInfo.billingNo}
                            storeId={this.state.storeId}
                            companyId={this.state.companyId}
                        />
                    )
                }
                {
                    this.state.tradeInfo.tradeNo.length > 0 && (
                        <QRCodePaymentCashier visible={this.state.showToPayAliWxModal}
                                              qrUrl={this.state.tradeInfo.codeUrl}
                                              totalPrice={this.state.tradeInfo.actaulPrice}
                                              tradeNo={this.state.tradeInfo.tradeNo}
                                              payType={this.state.choosePayType}
                                              flowNumber={this.state.flowNumber}
                                              onClosePay={this.onClosePay.bind(this)}
                                              loading={isLoading}
                        />
                    )
                }
                {
                    this.state.showStockTipsModal && (
                        <StockTips visible={this.state.showStockTipsModal}
                                   stockData={this.props.orderInfo.stockData}
                                   onClose={this.closeStockModal.bind(this)}/>
                    )
                }

                <Modal
                    transparent={true}
                    visible={showPaySuccess}
                    onRequestClose={() => null}
                >
                    <QRCodePaymentNew
                        paymentStatus={PaymentResultStatus.success}
                        navigation={this.props.navigation}
                        title={'订单支付'}
                        flowNum={this.state.flowNumber}
                        onClose={this.confirmPaySuccess.bind(this)}
                    />
                </Modal>


                {/* 会员识别 */}
                <ModalMemberIndentify navigation={this.props.navigation}
                                      visible={this.state.showMemberQueryModal}
                                      onConfirm={this.onMemberConfirm.bind(this)}
                                      onCancel={this.onMemberCanel.bind(this)}
                                      loading={isLoading}
                />
                <View style={cashierBillingStyle.bodybox}>
                    {/* 左侧区域 */}
                    <View style={cashierBillingStyle.servicerBoxNew}>
                        <View style={cashierBillingStyle.servicertitle}>
                            <Text style={cashierBillingStyle.servicerItemTitle}>项目/外卖</Text>
                            <Text style={cashierBillingStyle.servicerPerson}>服务人</Text>
                            <Text style={cashierBillingStyle.servicerPerson}>服务人</Text>
                            <Text style={cashierBillingStyle.servicerPerson}>服务人</Text>
                        </View>
                        <View style={cashierBillingStyle.servicerBoxBorder}>
                            {/* 默认信息 */}
                            <View
                                style={consumeItemLength < 1 ? [cashierBillingStyle.servicerBodyNone] : [cashierBillingStyle.servicerBodyNone, cashierBillingStyle.hidden]}>
                                <Text style={cashierBillingStyle.servicerNoneText}>
                                    请在右侧菜单中，选择项目，外卖
                                </Text>
                            </View>
                            {/* 消费项目|外卖 */}
                            <View
                                style={consumeItemLength < 1 ? [cashierBillingStyle.servicerBodyNew, cashierBillingStyle.hidden] : [cashierBillingStyle.servicerBodyNew]}>
                                <ScrollView>
                                    {
                                        this.state.consumeItems.map((itemInfo, itemIndex) => {
                                            if (itemInfo.itemType != 'consume' && !itemInfo.delFlag) {
                                                const isProject = itemInfo.itemType == 'proj';
                                                const isCardProject = itemInfo.itemType == 'card';
                                                const consumeCount = itemInfo.consumables ? itemInfo.consumables.filter(x => !x.delFlag).length : 0;
                                                return (
                                                    <Swipeout key={itemIndex} autoClose={true} backgroundColor="#fff"
                                                              style={[{marginBottom: 2}, (isProject || isCardProject) ? cashierBillingStyle.serviceBoxHeight : cashierBillingStyle.serviceBoxHeightNullXH]}
                                                              right={
                                                                  [{
                                                                      text: '删除',
                                                                      backgroundColor: 'red',
                                                                      underlayColor: '#ff4444',
                                                                      onPress: this.removeItem.bind(this, itemIndex)
                                                                  }]
                                                              }>
                                                        <View style style={cashierBillingStyle.servicerBodyBox}>
                                                            <View style={cashierBillingStyle.servicerBodyLiBoxO}>
                                                                <View key={itemIndex}
                                                                      style={[itemInfo.isChoosed ? cashierBillingStyle.servicerBodyLiActive : cashierBillingStyle.servicerBodyLi, cashierBillingStyle.marginLeft]}>
                                                                    <TouchableOpacity
                                                                        style={(this.state.currentEditConsumeItemIndex == itemIndex && this.state.currentEditConsumeServicerIndex == -1) ? cashierBillingStyle.showServicerLiActive : cashierBillingStyle.showServicerLi}
                                                                        onPress={this.showEditConsumeItemModal.bind(this, itemIndex)}>
                                                                        <View
                                                                            style={cashierBillingStyle.showServicerLiBox}>
                                                                            <View
                                                                                style={cashierBillingStyle.showServicerNameBox}>
                                                                                <Text
                                                                                    style={cashierBillingStyle.showServicerName}>
                                                                                    {itemInfo.itemName}
                                                                                </Text>
                                                                            </View>
                                                                            <View
                                                                                style={cashierBillingStyle.showServicerInfo}>
                                                                                <Text
                                                                                    style={cashierBillingStyle.showServicerText}>￥{itemInfo.itemPrice}</Text>
                                                                                <Text
                                                                                    style={cashierBillingStyle.showServicerText}>x{itemInfo.itemNum}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    {
                                                                        itemInfo.assistStaffDetail.map((serInfo, serIndex) => {
                                                                            return (
                                                                                <View key={serIndex}
                                                                                      style={cashierBillingStyle.servicerPersonAppointO}>
                                                                                    <TouchableOpacity
                                                                                        style={(this.state.currentEditConsumeItemIndex == itemIndex && this.state.currentEditConsumeServicerIndex == serIndex) ? cashierBillingStyle.servicerPersonInfoActiveO : cashierBillingStyle.servicerPersonInfoO}
                                                                                        onPress={this.addConsumeItemServicer.bind(this, itemIndex, serIndex)}>
                                                                                        <View
                                                                                            style={cashierBillingStyle.servicerPersonBox}>
                                                                                            {
                                                                                                serInfo.id.length < 1 ?
                                                                                                    (
                                                                                                        <Image
                                                                                                            resizeMethod="resize"
                                                                                                            source={getImage(serInfo.showImage, ImageQutity.staff, require('@imgPath/add.png'))}
                                                                                                            style={serInfo.id.length < 1 ? cashierBillingStyle.addServicerPerson : cashierBillingStyle.servicerPersonImg}
                                                                                                            defaultSource={require('@imgPath/add.png')}/>

                                                                                                    )
                                                                                                    :
                                                                                                    (
                                                                                                        <Image
                                                                                                            resizeMethod="resize"
                                                                                                            source={getImage(serInfo.showImage, ImageQutity.staff, require('@imgPath/rotate-portrait.png'))}
                                                                                                            style={serInfo.id.length < 1 ? cashierBillingStyle.addServicerPerson : cashierBillingStyle.servicerPersonImg}
                                                                                                            defaultSource={require('@imgPath/rotate-portrait.png')}/>
                                                                                                    )
                                                                                            }

                                                                                            <View
                                                                                                style={serInfo.id.length < 1 ? cashierBillingStyle.hidden : cashierBillingStyle.servicerPersonNameBox}>
                                                                                                <Text
                                                                                                    style={cashierBillingStyle.servicerPersonName}>
                                                                                                    {serInfo.value}
                                                                                                </Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                    <Image resizeMethod="resize"
                                                                                           source={require('@imgPath/assign.png')}
                                                                                           style={serInfo.appoint != 'false' ? cashierBillingStyle.servicerAppointImgO : cashierBillingStyle.hidden}/>
                                                                                </View>
                                                                            )
                                                                        })
                                                                    }
                                                                </View>
                                                            </View>
                                                            {/* 消耗品数量 */}
                                                            {(isProject || isCardProject) && <TouchableOpacity
                                                                style={cashierBillingStyle.consumableNumBox}
                                                                onPress={this.addCosumableT.bind(this, itemInfo)}>
                                                                <View style={cashierBillingStyle.consumableNumItem}>
                                                                    <Image
                                                                        resizeMethod="resize"
                                                                        source={require('@imgPath/consumable_icon.png')}
                                                                        style={cashierBillingStyle.consumableIcon}
                                                                    />
                                                                    <Text
                                                                        style={cashierBillingStyle.consumableName}>消耗品</Text>
                                                                </View>
                                                                <View style={cashierBillingStyle.consumableNumItem}>
                                                                    <Text
                                                                        style={cashierBillingStyle.consumableNumText}>数量：{consumeCount}</Text>
                                                                    <Image
                                                                        resizeMethod="resize"
                                                                        source={require('@imgPath/consumable_right.png')}
                                                                        style={cashierBillingStyle.consumableRightIcon}
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>}
                                                        </View>
                                                    </Swipeout>
                                                )
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                                    {/* +项目/外卖 */}
                                    <TouchableOpacity style={cashierBillingStyle.addServicerBodyLi}
                                                      onPress={this.swipConsumeItem.bind(this, 'proj')}>
                                        <View style={cashierBillingStyle.addServicerBodyBox}>
                                            <Image resizeMethod="resize" source={require('@imgPath/add.png')}
                                                   style={cashierBillingStyle.addServicerBodyLiIcon}/>
                                            <Text style={cashierBillingStyle.addServicerBodyLiText}>
                                                项目/外卖
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>

                            </View>
                            {/* 支付信息 */}
                            <View style={consumeItemLength < 1 ? [cashierBillingStyle.paymentInfoWarp, cashierBillingStyle.hidden] : [cashierBillingStyle.paymentInfoWarp]}>
                                {/* 操作区域 */}
                                <View style={cashierBillingStyle.paymentInfoLeft}>
                                    <Text style={cashierBillingStyle.showConsumeItemText}>应付：{this.state.totalConsumePrice}</Text>
                                    <Text style={cashierBillingStyle.showConsumeItemText}>次卡消费：{this.state.totalConsumeNum}项</Text>
                                </View>
                                <View style={cashierBillingStyle.paymentInfoRight}>
                                    {Boolean(billingInfo.id) && Boolean(billingInfo.billingNo) &&
                                        <TouchableOpacity style={cashierBillingStyle.paymentScrapList} onPress={this.onDeleteBilling.bind(this)} underlayColor={'transparent'}>
                                            <Text style={cashierBillingStyle.consumedBtnText}>废单</Text>
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity style={cashierBillingStyle.paymentSuspendBtn} onPress={this.onSaveOrder.bind(this)} underlayColor={'transparent'}>
                                        <Text style={cashierBillingStyle.consumedBtnText}>挂单</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={cashierBillingStyle.paymentPayBtn} onPress={this.onCashierOrder.bind(this)} underlayColor={'transparent'}>
                                        <Text style={cashierBillingStyle.consumedBtnText}>结单</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* 右侧区域 */}
                    <View style={cashierBillingStyle.consumeBoxNew}>
                        {/* 标题切换 */}
                        <View style={cashierBillingStyle.consumeTitle}>
                            <View
                                style={this.state.addConsumeType == 'servicer' ? cashierBillingStyle.hidden : cashierBillingStyle.consumeTitleNoInp}>
                                <TouchableOpacity style={this.state.addProjStyle}
                                                  onPress={this.swipConsumeItem.bind(this, 'proj')}>
                                    <Text style={this.state.addProjTextStyle}>+服务项目</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.addItemStyle}
                                                  onPress={this.swipConsumeItem.bind(this, 'item')}>
                                    <Text style={this.state.addItemTextStyle}>+外卖产品</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.addCardStyle}
                                                  onPress={this.swipConsumeItem.bind(this, 'card')}>
                                    <Text style={this.state.addCardTextStyle}>+次卡项目({this.cardCount})</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={this.state.addConsumeType == 'servicer' ? cashierBillingStyle.servicerTitleNoInp : cashierBillingStyle.hidden}>
                                <Text style={cashierBillingStyle.consumeText}>选择服务人</Text>
                            </View>

                            {/* 项目过滤 */}
                            {this.state.addConsumeType != 'card' && (
                                <QueryInput onClear={this.searchCancel.bind(this)} maxLength={20} text={this.state.queryInputText} onConfirm={this.searchConfirm.bind(this)} tips={this.state.queryInputTips} type={"cashier"}/>
                            )}
                        </View>
                        {/* 项目/外卖/服务项 */}
                        <View style={cashierBillingStyle.consumeBoxBorder}>
                            {/* 项目价格 */}
                            {this.state.addConsumeType == 'proj' && (
                                <View
                                    style={this.state.addConsumeType == 'proj' ? cashierBillingStyle.priceSegmentQueryBox : cashierBillingStyle.hidden}>
                                    <View style={cashierBillingStyle.priceAllQuery}>
                                        <TouchableOpacity
                                            onPress={this.filterConsumeItem.bind(this, 'price', 'proj', "-1", -1)}
                                            style={cashierBillingStyle.priceAllQueryTextBox}>
                                            <Text
                                                style={this.state.choosedProjPriceIndex == -1 ? cashierBillingStyle.priceItemQueryTextActive : cashierBillingStyle.priceItemQueryText}>
                                                所有价格
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={cashierBillingStyle.priceItemQueryBoxBody}>
                                        <ScrollView horizontal={true}>
                                            {
                                                this.state.showProjPriceChoose.map((item, index) => {
                                                    return (
                                                        <View style={cashierBillingStyle.priceItemQueryBox} key={index}>
                                                            <TouchableOpacity
                                                                onPress={this.filterConsumeItem.bind(this, 'price', 'proj', "-1", index)}
                                                                style={cashierBillingStyle.priceItemQueryBoxText}>
                                                                <Text
                                                                    style={this.state.choosedProjPriceIndex == index ? cashierBillingStyle.priceItemQueryTextActive : cashierBillingStyle.priceItemQueryText}>
                                                                    {item.text}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            )}
                            {/* 项目筛选 */}
                            {this.state.addConsumeType == 'proj' && (
                                <View
                                    style={this.state.addConsumeType == 'proj' ? cashierBillingStyle.consumeOrderGenreOther : cashierBillingStyle.hidden}>
                                    <ScrollView>
                                        <View style={cashierBillingStyle.consumeOrderGenreLi}>
                                            <TouchableOpacity
                                                onPress={this.filterConsumeItem.bind(this, 'category', 'proj', '-1', -1)}
                                                style={cashierBillingStyle.consumeOrderGenreLiItem}>
                                                <Text
                                                    style={this.state.choosedProjCategoryIndex == -1 ? cashierBillingStyle.consumeOrderGenreTextActive : cashierBillingStyle.consumeOrderGenreText}>
                                                    所有类
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.state.showProjCategoryChoose.map((item, index) => {
                                                return (
                                                    <View style={cashierBillingStyle.consumeOrderGenreLi} key={index}>
                                                        <TouchableOpacity
                                                            onPress={this.filterConsumeItem.bind(this, 'category', 'proj', item.cid, index)}
                                                            style={cashierBillingStyle.consumeOrderGenreLiItem}>
                                                            <Text
                                                                style={this.state.choosedProjCategoryIndex == index ? cashierBillingStyle.consumeOrderGenreTextActive : cashierBillingStyle.consumeOrderGenreText}>
                                                                {item.text}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )}
                            {/* 项目展示 */}
                            {
                                this.state.addConsumeType == 'proj' && !this.state.showFilterKeyBoard && this.state.currentShowProjDatas.length < 1 &&
                                <View style={cashierBillingStyle.noItems}>
                                    <SectionList noItems={true}/>
                                </View>
                            }
                            {this.state.addConsumeType == 'proj' && (
                                <View
                                    style={!this.state.showFilterKeyBoard && this.state.addConsumeType == 'proj' ? cashierBillingStyle.consumeBody : cashierBillingStyle.hidden}>
                                    <View style={cashierBillingStyle.consumeBodyHeight}>
                                        <FlatList
                                            style={cashierBillingStyle.addServicerBox2}
                                            data={this.state.currentShowProjDatas}
                                            numColumns={3}
                                            keyExtractor={item => item}
                                            renderItem={({item}) => {
                                                let projItem = this.state.allProjDatas[item];
                                                return (
                                                    <TouchableOpacity style={cashierBillingStyle.addServicerLi}
                                                                      key={item}
                                                                      onPress={this.addConsumeItem.bind(this, {
                                                                          itemId: item,
                                                                          itemName: projItem.name,
                                                                          itemNo: projItem.itemNo,
                                                                          itemPrice: projItem.sumPrice,
                                                                          itemNum: 1,
                                                                          itemType: 'proj',
                                                                          isChoosed: false,
                                                                          unitType: ''
                                                                      })}>
                                                        <View style={cashierBillingStyle.addServicerLiBox}>
                                                            <Text style={cashierBillingStyle.addServicerName}
                                                                  numberOfLines={2}>
                                                                {projItem.name}
                                                            </Text>
                                                            <View style={cashierBillingStyle.addServicerInfo}>
                                                                <Text style={cashierBillingStyle.addServicerNumber}>
                                                                    {projItem.itemNo}
                                                                </Text>
                                                                <Text style={cashierBillingStyle.addServicerPrice}>
                                                                    {projItem.sumPrice}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                            )}

                            {/* 外卖价格 */}
                            {this.state.addConsumeType == 'item' && (
                                <View
                                    style={this.state.addConsumeType == 'item' ? cashierBillingStyle.priceSegmentQueryBox : cashierBillingStyle.hidden}>
                                    <View style={cashierBillingStyle.priceAllQuery}>
                                        <TouchableOpacity
                                            onPress={this.filterConsumeItem.bind(this, 'price', 'item', "-1", -1)}
                                            style={cashierBillingStyle.priceAllQueryTextBox}>
                                            <Text
                                                style={this.state.choosedItemPriceIndex == -1 ? cashierBillingStyle.priceItemQueryTextActive : cashierBillingStyle.priceItemQueryText}>
                                                所有价格
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={cashierBillingStyle.priceItemQueryBoxBody}>
                                        <ScrollView horizontal={true}>
                                            {
                                                this.state.showItemPriceChoose.map((item, index) => {
                                                    return (
                                                        <View style={cashierBillingStyle.priceItemQueryBox} key={index}>
                                                            <TouchableOpacity
                                                                onPress={this.filterConsumeItem.bind(this, 'price', 'item', "-1", index)}
                                                                style={cashierBillingStyle.priceItemQueryBoxText}>
                                                                <Text
                                                                    style={this.state.choosedItemPriceIndex == index ? cashierBillingStyle.priceItemQueryTextActive : cashierBillingStyle.priceItemQueryText}>
                                                                    {item.text}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }

                                        </ScrollView>
                                    </View>
                                </View>
                            )}

                            {/* 外卖筛选 */}
                            {this.state.addConsumeType == 'item' && (
                                <View
                                    style={this.state.addConsumeType == 'item' ? cashierBillingStyle.consumeOrderGenreOther : cashierBillingStyle.hidden}>
                                    <ScrollView>
                                        <View style={cashierBillingStyle.consumeOrderGenreLi}>
                                            <TouchableOpacity
                                                onPress={this.filterConsumeItem.bind(this, 'category', 'item', "-1", -1)}>
                                                <Text
                                                    style={this.state.choosedItemCategoryIndex == -1 ? cashierBillingStyle.consumeOrderGenreTextActive : cashierBillingStyle.consumeOrderGenreText}>
                                                    所有类
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.state.showItemCategoryChoose.map((item, index) => {
                                                return (
                                                    <View style={cashierBillingStyle.consumeOrderGenreLi} key={index}>
                                                        <TouchableOpacity
                                                            onPress={this.filterConsumeItem.bind(this, 'category', 'item', item.cid, index)}>
                                                            <Text
                                                                style={this.state.choosedItemCategoryIndex == index ? cashierBillingStyle.consumeOrderGenreTextActive : cashierBillingStyle.consumeOrderGenreText}>
                                                                {item.text}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )}

                            {/* 外卖展示 */}
                            {
                                this.state.addConsumeType == 'item' && !this.state.showFilterKeyBoard && this.state.currentShowItemDatas.length < 1 &&
                                <View style={cashierBillingStyle.noItems}>
                                    <SectionList noItems={true}/>
                                </View>
                            }
                            {this.state.addConsumeType == 'item' && (
                                <View
                                    style={!this.state.showFilterKeyBoard && this.state.addConsumeType == 'item' ? cashierBillingStyle.consumeBody : cashierBillingStyle.hidden}>
                                    <View style={cashierBillingStyle.consumeBodyHeight}>
                                        <FlatList
                                            style={cashierBillingStyle.addServicerBox2}
                                            data={this.state.currentShowItemDatas}
                                            numColumns={3}
                                            keyExtractor={item => item}
                                            renderItem={({item}) => {
                                                let takeItem = this.state.allItemDatas[item];
                                                return (
                                                    <TouchableOpacity style={cashierBillingStyle.addServicerLi}
                                                                      key={item}
                                                                      onPress={this.addConsumeItem.bind(this, {
                                                                          itemId: item,
                                                                          itemName: takeItem.name,
                                                                          itemNo: takeItem.itemNo,
                                                                          itemPrice: takeItem.unitPrice,
                                                                          itemNum: 1,
                                                                          itemType: 'item',
                                                                          isChoosed: false,
                                                                          unitType: '1'
                                                                      })}>
                                                        <View style={cashierBillingStyle.addServicerLiBox}>
                                                            <Text style={cashierBillingStyle.addServicerName}
                                                                  numberOfLines={2}>
                                                                {takeItem.name}
                                                            </Text>
                                                            <View style={cashierBillingStyle.addServicerInfo}>
                                                                <Text style={cashierBillingStyle.addServicerNumber}>
                                                                    {takeItem.itemNo}
                                                                </Text>
                                                                <Text style={cashierBillingStyle.addServicerPrice}>
                                                                    {takeItem.unitPrice}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                        {/* <SimulateKeyboardInp /> */}
                                    </View>
                                </View>
                            )}

                            {/* 次卡项目 */}
                            {this.state.addConsumeType == 'card' && (
                                <View
                                    style={this.state.addConsumeType == 'card' ? cashierBillingStyle.consumeBodyNonmember : cashierBillingStyle.hidden}>
                                    {
                                        this.state.memberType == '0' ?
                                            (
                                                <View
                                                    style={this.state.timesProjectDatas.length < 1 ? null : cashierBillingStyle.hidden}>
                                                    <Text style={cashierBillingStyle.consumeBodyNonmemberText}>
                                                        您没有次卡消费项目哦！
                                                    </Text>
                                                </View>
                                            )
                                            :
                                            (
                                                <View
                                                    style={this.state.timesProjectDatas.length < 1 ? null : cashierBillingStyle.hidden}>
                                                    <Text style={cashierBillingStyle.consumeBodyNonmemberText}>
                                                        非会员用户，无次卡项目
                                                    </Text>
                                                    <Text style={cashierBillingStyle.consumeBodyNonmemberText}>
                                                        会员用户，请点击顾客识别
                                                    </Text>
                                                </View>
                                            )
                                    }

                                    <View
                                        style={this.state.timesProjectDatas.length < 1 ? cashierBillingStyle.hidden : addCardItemStyles.addCardItemStylesContent}>
                                        <View style={addCardItemStyles.addCardItemStylesTitle}>
                                            <TouchableOpacity style={addCardItemStyles.addCardItemStylesTitleLi}>
                                                <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
                                                    项目名称
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={addCardItemStyles.addCardItemStylesTitleLiOnther}>
                                                <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
                                                    原价
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={addCardItemStyles.addCardItemStylesTitleLi}>
                                                <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
                                                    次卡信息
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={addCardItemStyles.addCardItemStylesTitleLiOnther}>
                                                <Text style={addCardItemStyles.addCardItemStylesTitleLiText}>
                                                    余次
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={addCardItemStyles.addCardItemStylesBody}>
                                            <ScrollView>
                                                {
                                                    this.state.timesProjectDatas.map((project, index) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style={addCardItemStyles.addCardItemStylesList}
                                                                key={index}
                                                                onPress={this.addConsumeItem.bind(this, {
                                                                    itemId: project.itemId,
                                                                    itemName: project.projName,
                                                                    itemNo: project.itemNo,
                                                                    itemPrice: project.price,
                                                                    itemNum: 1,
                                                                    itemType: 'card',
                                                                    isChoosed: false,
                                                                    unitType: '',
                                                                    vipCardNo: project.vipCardNo
                                                                })}>
                                                                <View
                                                                    style={addCardItemStyles.addCardItemStylesListNameBox}>
                                                                    <Text
                                                                        style={addCardItemStyles.addCardItemStylesListName}>
                                                                        {project.projName}
                                                                    </Text>
                                                                </View>
                                                                <Text
                                                                    style={addCardItemStyles.addCardItemStylesListPrice}>
                                                                    {project.price}
                                                                </Text>
                                                                <View
                                                                    style={addCardItemStyles.addCardItemStylesListInfoBox}>
                                                                    <Text
                                                                        style={addCardItemStyles.addCardItemStylesListInfo}>
                                                                        {project.cardName}
                                                                    </Text>
                                                                </View>
                                                                <Text
                                                                    style={addCardItemStyles.addCardItemStylesListTime}>{project.blance}次</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>
                            )}
                            {/* 服务人筛选 */}
                            {this.state.addConsumeType == 'servicer' && (
                                <View
                                    style={this.state.addConsumeType == 'servicer' ? cashierBillingStyle.consumeOrderGenre : cashierBillingStyle.hidden}>
                                    <ScrollView>
                                        <View style={cashierBillingStyle.consumeOrderGenreLi}>
                                            <TouchableOpacity
                                                onPress={this.filterConsumeItem.bind(this, 'category', 'servicer', "-1", -1)}>
                                                <Text
                                                    style={this.state.choosedServicerCategoryIndex == -1 ? cashierBillingStyle.consumeOrderGenreTextActive : cashierBillingStyle.consumeOrderGenreText}>
                                                    所有人
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {

                                            this.state.showServicerCategoryChoose.map((item, index) => {
                                                return (
                                                    <View style={cashierBillingStyle.consumeOrderGenreLi} key={index}>
                                                        <TouchableOpacity
                                                            onPress={this.filterConsumeItem.bind(this, 'category', 'servicer', item.cid, index)}>
                                                            <Text numberOfLines={1}
                                                                  style={this.state.choosedServicerCategoryIndex == index ? cashierBillingStyle.consumeOrderGenreTextActive : cashierBillingStyle.consumeOrderGenreText}>
                                                                {item.text}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )}
                            {/* 服务人展示 */}
                            {
                                (this.state.addConsumeType == 'servicer' && !this.state.showFilterKeyBoard && this.state.currentShowServicerDatas.length < 1) ||
                                ((this.state.currentShowServicerDatas.length > 0 && this.state.currentShowServicerDatas[0] == '-1')) &&
                                <View style={cashierBillingStyle.noItems}>
                                    <SectionList noItems={true}/>
                                </View>
                            }
                            <View  style={!this.state.showFilterKeyBoard && this.state.addConsumeType == 'servicer' ? cashierBillingStyle.servicerInfoBodyNew : cashierBillingStyle.hidden}>
                                <View style={cashierBillingStyle.servicerInfoBodyHeight}>
                                    <StaffSelectBox isFilter={this.state.filterServicer}
                                        filterServicerKey={this.state.filterServicerKey}
                                        filterServicerData={this.state.currentShowServicerDatas}
                                        onSelected={this.onStaffSelected.bind(this)}
                                        clearServicerGridChoose={this.state.clearServicerGridChoose}/>
                                </View>
                                {/* 指定非指定 */}
                                {
                                    !isShowAppoint ?
                                        (
                                            <View style={cashierBillingStyle.chooseItemNoneNew}>
                                                <Text style={cashierBillingStyle.chooseItemNoneText}>
                                                    请选择服务人
                                                </Text>
                                            </View>
                                        )
                                        :
                                        (
                                            <View style={cashierBillingStyle.servicerWrap}>
                                                {/*个人信息*/}
                                                <View style={cashierBillingStyle.servicerNameInfo}>
                                                    <Text style={cashierBillingStyle.servicerNameTxt} numberOfLines={2}>{currentServicerInfo.value}</Text>
                                                    <View style={cashierBillingStyle.serviceNumber}>
                                                        <Image resizeMethod="resize"
                                                               source={require('@imgPath/store-staff-No.png')}
                                                               style={cashierBillingStyle.storeStaffImg}
                                                               resizeMode={'contain'}/>
                                                        <Text style={cashierBillingStyle.serviceNumberText} numberOfLines={1}>{currentServicerInfo.storeStaffNo}</Text>
                                                    </View>
                                                </View>
                                                <View style={this.state.consumeItems[this.state.currentEditConsumeItemIndex].itemType == 'proj' || this.state.consumeItems[this.state.currentEditConsumeItemIndex].itemType == 'card' ? cashierBillingStyle.servicerWayBox : cashierBillingStyle.hidden}>
                                                    <View style={cashierBillingStyle.servicerWayChooseWay}>
                                                        <TouchableOpacity
                                                            style={currentServicerInfo.appoint == 'false' ? cashierBillingStyle.servicerChooseWayLiActive : cashierBillingStyle.servicerChooseWayLi}
                                                            onPress={this.onAppoint.bind(this, '0')}>
                                                            <Text style={cashierBillingStyle.servicerChooseWayText}>
                                                                轮牌
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={currentServicerInfo.appoint != 'false' ? cashierBillingStyle.servicerChooseWayLiActive : cashierBillingStyle.servicerChooseWayLi}
                                                            onPress={this.onAppoint.bind(this, '1')}>
                                                            <Text style={cashierBillingStyle.servicerChooseWayText}>
                                                                指定
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Image resizeMethod="resize"
                                                           style={cashierBillingStyle.servicerAppoint}
                                                           source={require('@imgPath/assign.png')}/>
                                                </View>
                                                {/*职位*/}
                                                <View style={cashierBillingStyle.servicerPosition}>
                                                    <Text style={cashierBillingStyle.servicerPositionText}>{currentServicerInfo.workTypeDesc}</Text>
                                                </View>
                                                {/*业绩｜提成*/}
                                                <View style={cashierBillingStyle.servicerYeJi} >
                                                    <Text style={cashierBillingStyle.servicerYeJiText} numberOfLines={1} ellipsizeMode={'tail'}>业绩 {currentServicerInfo.performance || '--'}</Text>
                                                    <Text style={cashierBillingStyle.servicerYeJiText} numberOfLines={1} ellipsizeMode={'tail'}>提成 {currentServicerInfo.workerFee || '--'}</Text>
                                                </View>
                                                <View style={cashierBillingStyle.servicerOperator}>
                                                    {/*编辑*/}
                                                    <TouchableOpacity style={cashierBillingStyle.servicerOperatorBtn} onPress={this.editServicer.bind(this)}>
                                                        <Image resizeMethod="resize" source={require('@imgPath/edit.png')}
                                                               style={cashierBillingStyle.servicerOperatorEdit}
                                                               resizeMode={'contain'}/>
                                                    </TouchableOpacity>
                                                    {/*删除*/}
                                                    <TouchableOpacity style={cashierBillingStyle.servicerOperatorBtn} onPress={this.removeServicer.bind(this)}>
                                                        <Image resizeMethod="resize" source={require('@imgPath/delete.png')}
                                                               style={cashierBillingStyle.servicerOperatorDelete}
                                                               resizeMode={'contain'}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                }
                            </View>

                            {
                                (this.state.showFilterMsgBoard == 0 || this.state.showFilterMsgBoard == -1) && (
                                    <SearchInput onCancel={this.searchCancel.bind(this)}
                                                 showFilterMsgBoard={this.state.showFilterMsgBoard}/>
                                )
                            }

                        </View>
                    </View>
                </View>
                {/* ------------会员卡信息------------ */}
                <View
                    style={this.state.sliderDisplay ? cashierBillingStyle.rightPositionBoxShow : {display: 'none'}}></View>
                {
                    this.props.route.params.member && (
                        <Animated.View
                            style={this.state.sliderDisplay ? [cashierBillingStyle.rightPositionBox, {left: this.state.sliderLeft}] : {display: 'none'}} {...this._pinchResponder.panHandlers}>
                            <TouchableOpacity onPress={this.hideRightPanel.bind(this)} activeOpacity={1}
                                              style={cashierBillingStyle.rightPositionBoxO}>
                                <View style={cashierBillingStyle.hideBox}>
                                    <TouchableOpacity onPress={this.hideRightPanel.bind(this)}>
                                        <Image resizeMethod="resize"
                                               source={require('@imgPath/p-hide-box.png')}
                                               style={[cashierBillingStyle.hideBtn, {resizeMode: 'contain'}]}/>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                            <View style={cashierBillingStyle.rightAnBox}>
                                <View style={cashierBillingStyle.rightPanelMemberBox}>
                                    <View style={cashierBillingStyle.HeadClientImgBox}>
                                        <Image resizeMethod="resize"
                                               source={this.props.route.params.member.userImgUrl}
                                               style={cashierBillingStyle.HeadClientImg}
                                               resizeMode={'contain'}/>
                                    </View>
                                    <View style={cashierBillingStyle.memberExtWrap}>
                                        <View style={cashierBillingStyle.memberCell}>
                                            <View style={cashierBillingStyle.memberCellHeader}>
                                                <View style={cashierBillingStyle.memberCellHeaderTxt}>
                                                    {
                                                        (this.props.route.params.member.name == '' || this.props.route.params.member.name == '散客' || this.props.route.params.member.name == null) ?
                                                            <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                                  style={cashierBillingStyle.memberCellText}>手机尾号:{(this.props.route.params.member == undefined || this.props.route.params.member.phone == undefined || this.props.route.params.member.phone == '') ? "" : this.props.route.params.member.phone.substr(7)}</Text>
                                                            :
                                                            <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                                  style={cashierBillingStyle.memberCellText}>{this.props.route.params.member.name}</Text>
                                                    }
                                                    {this.props.route.params.member.sex == 0 ?
                                                        <Image style={cashierBillingStyle.memberCellSex}
                                                               resizeMethod="resize"
                                                               source={require('@imgPath/sex_female.png')}/>
                                                        :
                                                        <Image style={cashierBillingStyle.memberCellSex}
                                                               resizeMethod="resize"
                                                               source={require('@imgPath/sex_man.png')}/>
                                                    }
                                                </View>
                                            </View>
                                            <View style={cashierBillingStyle.memberCellFooter}>
                                                {this.props.route.params.member.memberType == 0 ?
                                                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                          style={cashierBillingStyle.memberCellText}>会员 {this.props.route.params.member.memberCardNo}</Text>
                                                    :
                                                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                          style={cashierBillingStyle.memberCellText}>散客 {this.props.route.params.member.memberCardNo}</Text>
                                                }
                                            </View>
                                        </View>
                                        <View style={cashierBillingStyle.memberCell}>
                                            <View style={cashierBillingStyle.memberCellHeader}>
                                                <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                      style={cashierBillingStyle.memberCellText}>{this.props.route.params.member.phone}</Text>
                                            </View>
                                            <View style={cashierBillingStyle.memberCellFooter}>
                                                <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                      style={cashierBillingStyle.memberCellText}>会员卡{this.props.route.params.member.cardCount}张</Text>
                                            </View>
                                        </View>
                                        <View style={cashierBillingStyle.memberCell}>
                                            <View style={cashierBillingStyle.memberCellHeader}></View>
                                            <View style={cashierBillingStyle.memberCellFooter}>
                                                <Text numberOfLines={1} ellipsizeMode={'tail'}
                                                      style={cashierBillingStyle.memberCellText}>储值卡:¥{this.props.route.params.member.cardBalanceCount}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={cashierBillingStyle.rightPanelCardsBox}>
                                    {this.state.memberInfo && (
                                        <CardSelectBox
                                            searchStart={true}
                                            showRecharge={true}
                                            showTab={false}
                                            showCardDetailInfo={true}
                                            member={this.props.route.params.member}
                                            page={'cashier'}
                                        />
                                    )
                                    }
                                </View>

                            </View>

                        </Animated.View>
                    )}
                {/*------员工编辑--------*/}
                <StaffModifyModal enableChangeStaff={false} useWriteAccessRigths={true} ref={ref => { this.staffEditModal = ref;}} onSave={this.onSaveEditServicer.bind(this)}/>
            </View>
        );
    }
}

//default state
const defaultInfos = (sex, isOldCustomer) => {
    return {
        addProjStyle: cashierBillingStyle.consumeTextBoxActive,//添加项目样式
        addProjTextStyle: cashierBillingStyle.consumeTextActive,
        addItemStyle: cashierBillingStyle.consumeTextBox,//添加外卖样式
        addItemTextStyle: cashierBillingStyle.consumeText,
        addCardStyle: cashierBillingStyle.consumeTextBox,//添加次卡项目样式
        addCardTextStyle: cashierBillingStyle.consumeText,
        addConsumeType: 'proj', //当前添加类型
        queryInputTips: '项目查询',
        queryInputText: '',

        allProjDatas: {},
        showProjPriceChoose: [ //项目价格区间
            {text: "100以内", min: 0, max: 100, items: []},
            {text: "100~200", min: 100, max: 200, items: []},
            {text: "200~300", min: 200, max: 300, items: []},
            {text: "300~500", min: 300, max: 500, items: []},
            {text: "500~700", min: 500, max: 700, items: []},
            {text: "700~1000", min: 700, max: 1000, items: []},
            {text: "1000~2000", min: 1000, max: 2000, items: []},
            {text: "2000~4000", min: 2000, max: 4000, items: []},
            {text: "4000~8000", min: 4000, max: 8000, items: []},
            {text: "8000~20000", min: 8000, max: 20000, items: []},
            {text: "20000以上", min: 8000, max: 20000, items: []},
        ],
        showProjCategoryChoose: [],//项目筛选分类
        currentShowProjDatas: [],//当前展示的项目数据
        cacheAllProjDatas: [],//缓存所有默认全部展示项目数据
        choosedProjPriceIndex: -1,
        choosedProjPriceDatas: [],//当前选择的项目数据
        choosedProjCategoryIndex: -1,
        choosedProjCategoryDatas: [],//当前选择的项目数据

        allItemDatas: {},
        showItemPriceChoose: [//外卖价格区间
            {text: "100以内", min: 0, max: 100, items: []},
            {text: "100~200", min: 100, max: 200, items: []},
            {text: "200~300", min: 200, max: 300, items: []},
            {text: "300~500", min: 300, max: 500, items: []},
            {text: "500~700", min: 500, max: 700, items: []},
            {text: "700~1000", min: 700, max: 1000, items: []},
            {text: "1000~2000", min: 1000, max: 2000, items: []},
            {text: "2000~4000", min: 2000, max: 4000, items: []},
            {text: "4000~8000", min: 4000, max: 8000, items: []},
            {text: "8000~20000", min: 8000, max: 20000, items: []},
            {text: "20000以上", min: 8000, max: 20000, items: []},
        ],
        showItemCategoryChoose: [],//外卖筛选分类
        currentShowItemDatas: [],//当前展示的外卖数据
        cacheAllItemDatas: [],//缓存所有默认全部展示外卖数据
        choosedItemPriceIndex: -1,
        choosedItemPriceDatas: [],//当前选择的外卖数据
        choosedItemCategoryIndex: -1,
        choosedItemCategoryDatas: [],//当前选择的外卖数据

        timesProjectDatas: [],//当前展示的次卡项目数据
        allTimecardProjDatas: {},
        searchCardProjInfo: [],//过滤次卡项目

        allServicerDatas: {},
        showServicerCategoryChoose: [],//服务人筛选分类
        currentShowServicerDatas: [],//当前展示的服务人数据
        cacheAllServicerDatas: [],//缓存所有默认全部展示服务人数据
        choosedServicerCategoryIndex: -1,
        filterServicerKey: '',
        filterServicer: false,

        memberInfo: null,

        showMemberQueryModal: false,
        showBillEditModal: false,
        showCashierPayModal: false,
        showToAppPayModal: false,
        showToMultiplyPayModal: false,
        showToWXAppPayModal: false,
        showToPayAliWxModal: false,
        showFilterKeyBoard: false,
        showFilterMsgBoard: -1,
        showStockTipsModal: false,

        consumeItems: [],//所有已消费项目
        consumeItemsExist: [],//取单的消费项
        showEditConsumeItemModal: false,
        currentEditConsumeItemIndex: -1,
        currentEditConsumeServicerIndex: -1,
        clearServicerGridChoose: '-1',//是否清楚服务人列表中的选中状态:根据不同消息内容来确定是否是来自父组件的指令

        id: '-1',
        memberType: '1',
        memberId: '',
        companyId: '',
        storeId: '',
        isOldCustomer: isOldCustomer,
        roomId: '-1',
        categoryId: '',
        operatorId: '',
        operatorText: '',
        type: '0',
        flowNumber: '',
        billingNo: '',
        keyNumber: '',
        handNumber: '',
        customerSex: sex,
        deptId: '',
        remark: '',
        integral: '0',
        billingNum: '1',
        customerNumber: '1',
        isSynthesis: '0',
        totalConsumeNum: '0',
        totalConsumePrice: '0.0',
        isKeyNumber: false,
        tradeInfo: {
            codeUrl: '',
            tradeNo: ''
        },
        roundMode: "0",
        choosePayType: '',
        isInited: false,
        isgeted: false,
        isSaved: false,
        companySetting: {
            isUseCash: true
        }
    }
}

//default servicer
const defaultServicer = () => {
    return {
        "cardImage": "",
        "deptName": "",
        "positionLevel": "",
        "search_keyword": "",
        "positionType": null,
        "deptId": "5",
        "photo": '',
        "showImage": '',
        "label": "",
        "storeId": "",
        "staffType": "",
        "categoryName": "",
        "companyId": "",
        "positionId": "",
        "storeStaffNo": "",
        "positionInfo": "",
        "id": "",
        "position": "",
        "value": "",
        "categoryId": "",
        "positionTypeStat": "",
        "workTypeId": "",
        "workTypeDesc": "",
        "workTypeLevel": "",
        "workPositionTypeId": "",
        "appoint": "false",
        "workerFee": "",
        "performance": "",
        "nickName": ""
    };
}

//页面render之后的动画
let afterRenderAction = () => {
};

//构建切换时图数据
const buildSwipView = (self, type) => {
    let addProjStyle;
    let addProjTextStyle;
    let addItemStyle;
    let addItemTextStyle;
    let addCardStyle;
    let addCardTextStyle;

    if ('proj' == type) {
        addProjStyle = cashierBillingStyle.consumeTextBoxActive;
        addProjTextStyle = cashierBillingStyle.consumeTextActive;
        addItemStyle = cashierBillingStyle.consumeTextBox;
        addItemTextStyle = cashierBillingStyle.consumeText;
        addCardStyle = cashierBillingStyle.consumeTextBox;
        addCardTextStyle = cashierBillingStyle.consumeText;

        self.setState((prevState, props) => {
            return {
                ...prevState,
                addProjStyle: addProjStyle,
                addProjTextStyle: addProjTextStyle,
                addItemStyle: addItemStyle,
                addItemTextStyle: addItemTextStyle,
                addCardStyle: addCardStyle,
                addCardTextStyle: addCardTextStyle,
                addConsumeType: type,
                currentShowProjDatas: self.state.cacheAllProjDatas,
                choosedProjPriceIndex: -1,
                choosedProjPriceDatas: self.state.cacheAllProjDatas,//当前选择的项目数据
                choosedProjCategoryIndex: -1,
                choosedProjCategoryDatas: self.state.cacheAllProjDatas,
                currentEditConsumeItemIndex: -1,
                currentEditConsumeServicerIndex: -1,
                clearServicerGridChoose: '00',
                queryInputTips: '项目查询',
                queryInputText: '',
                showFilterKeyBoard: false,
                showFilterMsgBoard: -1
            }
        });

    } else if ('item' == type) {
        addProjStyle = cashierBillingStyle.consumeTextBox;
        addProjTextStyle = cashierBillingStyle.consumeText;
        addItemStyle = cashierBillingStyle.consumeTextBoxActive;
        addItemTextStyle = cashierBillingStyle.consumeTextActive;
        addCardStyle = cashierBillingStyle.consumeTextBox;
        addCardTextStyle = cashierBillingStyle.consumeText;

        self.setState((prevState, props) => {
            return {
                ...prevState,
                addProjStyle: addProjStyle,
                addProjTextStyle: addProjTextStyle,
                addItemStyle: addItemStyle,
                addItemTextStyle: addItemTextStyle,
                addCardStyle: addCardStyle,
                addCardTextStyle: addCardTextStyle,
                addConsumeType: type,
                currentShowItemDatas: self.state.cacheAllItemDatas,//当前展示的外卖数据
                choosedItemPriceIndex: -1,
                choosedItemPriceDatas: self.state.cacheAllItemDatas,//当前选择的外卖数据
                choosedItemCategoryIndex: -1,
                choosedItemCategoryDatas: self.state.cacheAllItemDatas,//当前选择的外卖数据
                currentEditConsumeItemIndex: -1,
                currentEditConsumeServicerIndex: -1,
                clearServicerGridChoose: '01',
                queryInputTips: '外卖查询',
                queryInputText: '',
                showFilterKeyBoard: false,
                showFilterMsgBoard: -1
            }
        });
    } else if ('card' == type) {
        addProjStyle = cashierBillingStyle.consumeTextBox;
        addProjTextStyle = cashierBillingStyle.consumeText;
        addItemStyle = cashierBillingStyle.consumeTextBox;
        addItemTextStyle = cashierBillingStyle.consumeText;
        addCardStyle = cashierBillingStyle.consumeTextBoxActive;
        addCardTextStyle = cashierBillingStyle.consumeTextActive;

        self.setState((prevState, props) => {
            return {
                ...prevState,
                addProjStyle: addProjStyle,
                addProjTextStyle: addProjTextStyle,
                addItemStyle: addItemStyle,
                addItemTextStyle: addItemTextStyle,
                addCardStyle: addCardStyle,
                addCardTextStyle: addCardTextStyle,
                addConsumeType: type,
                currentEditConsumeItemIndex: -1,
                currentEditConsumeServicerIndex: -1,
                clearServicerGridChoose: '02',
                queryInputTips: '请输入顾客姓名,手机号或编号',
                queryInputText: '',
                showFilterKeyBoard: false,
                showFilterMsgBoard: -1,
            }
        });
    }
}


const buildDatas = (self, orderData, cb) => {
    let projDatas = JSON.parse(orderData.projectInfo);
    let itemDatas = JSON.parse(orderData.productInfo);
    let categoryOrder = JSON.parse(orderData.categoryOrder);
    let serverDatas = JSON.parse(orderData.staffInfo);
    let searchCardProjDats = JSON.parse(orderData.searchInfo);

    self.setState((prevState, prevProps) => {
        buildProjDatas(prevState, projDatas);
        buildItemDatas(prevState, itemDatas);
        buildServicerDatas(prevState, serverDatas);

        prevState.isInited = true;
        prevState.cacheAllProjDatas = prevState.currentShowProjDatas;
        prevState.choosedProjPriceDatas = prevState.currentShowProjDatas;
        prevState.choosedProjCategoryDatas = prevState.currentShowProjDatas;

        prevState.cacheAllItemDatas = prevState.currentShowItemDatas;
        prevState.choosedItemPriceDatas = prevState.currentShowItemDatas;
        prevState.choosedItemCategoryDatas = prevState.currentShowItemDatas;

        prevState.cacheAllServicerDatas = prevState.currentShowServicerDatas;
        prevState.choosedServicerCategoryDatas = prevState.currentShowServicerDatas;
        prevState.searchCardProjInfo = searchCardProjDats;

        prevState.flowNumber = orderData.flowNumber;
        prevState.handNumber = orderData.handNumber;
        prevState.customerNumber = orderData.customerNumber;
        prevState.customerSex = orderData.customerSex == undefined ? '0' : orderData.customerSex;
        prevState.operatorId = orderData.operatorId;
        prevState.isSynthesis = orderData.isSynthesis;
        prevState.operatorText = orderData.operatorText;
        prevState.companyId = orderData.companyId;
        prevState.storeId = orderData.storeId;
        prevState.categoryId = orderData.operatorId;
        prevState.keyNumber = orderData.handNumber;
        prevState.deptId = orderData.deptId;
        prevState.isOldCustomer = self.state.isOldCustomer;
        return prevState;
    }, cb);

}

//处理项目信息
const buildProjDatas = (prevState, projDatas) => {
    prevState.currentShowProjDatas = [];
    for (let key in projDatas) {
        let projCid = (key.split(";")[0]).split(":")[1];
        let projCname = key.split(";")[1];
        let projItems = projDatas[key];
        //处理筛选分类
        let showProjCategory = {text: projCname, cid: projCid, items: []}

        for (let k = 0; k < projItems.length; k++) {
            let currItem = projItems[k];
            let itemId = currItem.id;
            let currItemPrice = parseFloat(currItem.sumPrice);

            //存储筛选分类
            showProjCategory.items.push(itemId);
            //存储所有项目
            prevState.allProjDatas[itemId] = currItem;
            //存储当前展示项目id
            prevState.currentShowProjDatas.push(itemId);

            //存储价格区间
            if (currItemPrice < 100) {
                prevState.showProjPriceChoose[0].items.push(itemId);
            } else if (100 <= currItemPrice && currItemPrice < 200) {
                prevState.showProjPriceChoose[1].items.push(itemId);
            } else if (200 <= currItemPrice && currItemPrice < 300) {
                prevState.showProjPriceChoose[2].items.push(itemId);
            } else if (300 <= currItemPrice && currItemPrice < 500) {
                prevState.showProjPriceChoose[3].items.push(itemId);
            } else if (500 <= currItemPrice && currItemPrice < 700) {
                prevState.showProjPriceChoose[4].items.push(itemId);
            } else if (700 <= currItemPrice && currItemPrice < 1000) {
                prevState.showProjPriceChoose[5].items.push(itemId);
            } else if (1000 <= currItemPrice && currItemPrice < 2000) {
                prevState.showProjPriceChoose[6].items.push(itemId);
            } else if (2000 <= currItemPrice && currItemPrice < 4000) {
                prevState.showProjPriceChoose[7].items.push(itemId);
            } else if (4000 <= currItemPrice && currItemPrice < 8000) {
                prevState.showProjPriceChoose[8].items.push(itemId);
            } else if (8000 <= currItemPrice && currItemPrice < 20000) {
                prevState.showProjPriceChoose[9].items.push(itemId);
            } else {
                prevState.showProjPriceChoose[10].items.push(itemId);
            }

        }
        //保存筛选分类
        prevState.showProjCategoryChoose.push(showProjCategory);
    }
}

//处理外卖信息
const buildItemDatas = (prevState, itemDatas) => {
    prevState.currentShowItemDatas = [];
    for (let key in itemDatas) {
        let itemCid = (key.split(";")[0]).split(":")[1];
        let itemCname = key.split(";")[1];
        let takeItems = itemDatas[key];
        //处理筛选分类
        let showItemCategory = {text: itemCname, cid: itemCid, items: []}

        for (let k = 0; k < takeItems.length; k++) {
            let currItem = takeItems[k];
            let itemId = currItem.id;
            let currItemPrice = parseFloat(currItem.unitPrice);

            //存储筛选分类
            showItemCategory.items.push(itemId);
            //存储所有项目
            prevState.allItemDatas[itemId] = currItem;
            //存储当前展示项目id
            prevState.currentShowItemDatas.push(itemId);

            //存储价格区间
            if (currItemPrice < 100) {
                prevState.showItemPriceChoose[0].items.push(itemId);
            } else if (100 <= currItemPrice && currItemPrice < 200) {
                prevState.showItemPriceChoose[1].items.push(itemId);
            } else if (200 <= currItemPrice && currItemPrice < 300) {
                prevState.showItemPriceChoose[2].items.push(itemId);
            } else if (300 <= currItemPrice && currItemPrice < 500) {
                prevState.showItemPriceChoose[3].items.push(itemId);
            } else if (500 <= currItemPrice && currItemPrice < 700) {
                prevState.showItemPriceChoose[4].items.push(itemId);
            } else if (700 <= currItemPrice && currItemPrice < 1000) {
                prevState.showItemPriceChoose[5].items.push(itemId);
            } else if (1000 <= currItemPrice && currItemPrice < 2000) {
                prevState.showItemPriceChoose[6].items.push(itemId);
            } else if (2000 <= currItemPrice && currItemPrice < 4000) {
                prevState.showItemPriceChoose[7].items.push(itemId);
            } else if (4000 <= currItemPrice && currItemPrice < 8000) {
                prevState.showItemPriceChoose[8].items.push(itemId);
            } else if (8000 <= currItemPrice && currItemPrice < 20000) {
                prevState.showItemPriceChoose[9].items.push(itemId);
            } else {
                prevState.showItemPriceChoose[10].items.push(itemId);
            }

        }
        //保存筛选分类
        prevState.showItemCategoryChoose.push(showItemCategory);
    }
}

//处理服务人信息
const buildServicerDatas = (prevState, servicerDatas) => {
    for (let key in servicerDatas) {
        let itemCname = key;//职务名称
        let itemDatas = servicerDatas[key];//服务人数据
        //处理筛选分类
        let showItemCategory = {text: itemCname, items: []}

        for (let k = 0; k < itemDatas.length; k++) {
            let currItem = itemDatas[k];
            let itemId = currItem.id;

            //存储筛选分类
            showItemCategory.items.push(itemId);
            //存储所有项目
            prevState.allServicerDatas[itemId] = currItem;
            //存储当前展示项目id
            prevState.currentShowServicerDatas.push(itemId);
        }
        //保存筛选分类
        prevState.showServicerCategoryChoose.push(showItemCategory);
    }
}

//处理筛选数据
const buildFilterDatas = (self, filterType, itemtype, index) => {
    self.setState((prevState, props) => {
        let priceIds = [];//价格筛选的id
        let categoryIds = [];//分类筛选的id

        if (itemtype == 'proj') {//项目筛选
            if (filterType == 'price') {//价格筛选
                priceIds = index == -1 ? prevState.cacheAllProjDatas : prevState.showProjPriceChoose[index].items;
                categoryIds = prevState.choosedProjCategoryDatas;

                prevState.choosedProjPriceDatas = priceIds;
                prevState.choosedProjPriceIndex = index;
            } else if (filterType == 'category') {//分类筛选
                priceIds = prevState.choosedProjPriceDatas;
                categoryIds = index == -1 ? prevState.cacheAllProjDatas : prevState.showProjCategoryChoose[index].items;

                prevState.choosedProjCategoryDatas = categoryIds;
                prevState.choosedProjCategoryIndex = index;
            }

            prevState.currentShowProjDatas = arrayIntersection(priceIds, categoryIds);
        } else if (itemtype == 'item') {//外卖筛选
            if (filterType == 'price') {//价格筛选
                priceIds = index == -1 ? prevState.cacheAllItemDatas : prevState.showItemPriceChoose[index].items;
                categoryIds = prevState.choosedItemCategoryDatas;

                prevState.choosedItemPriceDatas = priceIds;
                prevState.choosedItemPriceIndex = index;
            } else if (filterType == 'category') {//分类筛选
                priceIds = prevState.choosedItemPriceDatas;
                categoryIds = index == -1 ? prevState.cacheAllItemDatas : prevState.showItemCategoryChoose[index].items;

                prevState.choosedItemCategoryDatas = categoryIds;
                prevState.choosedItemCategoryIndex = index;
            }

            prevState.currentShowItemDatas = arrayIntersection(priceIds, categoryIds);
        } else if (itemtype == 'servicer') {
            let categoryKey = index == -1 ? '' : prevState.showServicerCategoryChoose[index].text;
            let filterServicer = index == -1 ? false : true;

            prevState.choosedServicerCategoryIndex = index;
            prevState.filterServicerKey = categoryKey;
            prevState.filterServicer = filterServicer;
            prevState.clearServicerGridChoose = '05';
            prevState.currentShowServicerDatas = [];

            Object.keys(prevState.allServicerDatas).forEach((saffId) => {
                if (prevState.allServicerDatas[saffId].position == categoryKey) {
                    prevState.currentShowServicerDatas.push(saffId);
                }
            })
        }

        return prevState;
    });
}

//构建次卡项目
const buildCardProjDatas = (prevState, vipcardArray) => {

    //所有次卡项目列表
    let searchTimesCardProjectList = [];
    //筛选后的此卡项目列表
    let timesCardProjectList = [];
    //排序后的展示结果
    let timesProjectInfo = [];
    vipcardArray = vipcardArray ? vipcardArray : [];
    //构建次卡数据
    for (let k = 0; k < vipcardArray.length; k++) {
        let cardInfo = vipcardArray[k];
        let cardType = cardInfo.cardType;//2
        let cardStatus = cardInfo.status;

        //卡状态过滤
        if (cardStatus != '0' && cardStatus != '2' && cardStatus != '3') {
            continue;
        }

        //取次卡项目
        if (cardType == '2') {
            let projDatas = cardInfo.attachProjectList;
            let projDetails = cardInfo.details;
            if (projDatas && projDatas.length > 0) {
                for (let m = 0; m < projDatas.length; m++) {
                    let projectInfo = projDatas[m];
                    let showBlock = {};
                    showBlock.projId = projectInfo.projectTemplateId;
                    showBlock.projName = projectInfo.projectName;
                    showBlock.cardName = cardInfo.vipCardName;
                    showBlock.vipCardNo = cardInfo.vipCardNo;
                    showBlock.consumeMode = cardInfo.consumeMode;
                    showBlock.remark = cardInfo.remark;
                    // 1套餐卡（服务项目次数）
                    if (cardInfo.consumeMode == '1') {
                        showBlock.blance = projectInfo.balance;
                    } else {
                        // 卡的次数（0疗程卡，2时间卡，3护理卡）
                        showBlock.blance = cardInfo.balance;
                    }
                    // 不是时间卡的次卡次数大于0的显示
                    if (cardInfo.consumeMode != "2") {
                        if (showBlock.blance > 0) {
                            searchTimesCardProjectList.push(showBlock);
                        }
                    } else {
                        // 时间卡加入
                        searchTimesCardProjectList.push(showBlock);
                    }
                }
            } else if (projDetails && projDetails.length > 0) {//老卡数据处理
                let projects = JSON.parse(projDetails).vipTimeCardCount;
                if (projects.length > 0) {//老卡标准次卡处理
                    for (let k = 0; k < projects.length; k++) {
                        let projectInfo = projects[k];
                        let showBlock = {};
                        showBlock.projId = projectInfo.projectFromId;
                        showBlock.projName = projectInfo.projectName;
                        showBlock.cardName = cardInfo.vipCardName;
                        showBlock.vipCardNo = cardInfo.vipCardNo;
                        showBlock.remark = cardInfo.remark;
                        showBlock.consumeMode = cardInfo.consumeMode;
                        if (cardInfo.consumeMode == '1') {
                            showBlock.blance = projectInfo.balance;
                        } else {
                            showBlock.blance = cardInfo.balance;
                        }
                        if (cardInfo.consumeMode != "2") {
                            if (cardInfo.balance > 0) {
                                searchTimesCardProjectList.push(showBlock);
                            }
                        } else {
                            searchTimesCardProjectList.push(showBlock);
                        }
                    }
                } else {//老卡营销次卡处理
                    let projects = detailsJson.timeCardProjectList;
                    for (let k = 0; k < projects.length; k++) {
                        let projectInfo = projects[k];
                        let showBlock = {};
                        showBlock.projId = projectInfo.projectId;
                        showBlock.projName = projectInfo.projectName;
                        showBlock.cardName = cardInfo.vipCardName;
                        showBlock.vipCardNo = cardInfo.vipCardNo;
                        showBlock.remark = cardInfo.remark;
                        showBlock.consumeMode = cardInfo.consumeMode;
                        if (cardInfo.consumeMode == '1') {
                            showBlock.blance = projectInfo.balance;
                        } else {
                            showBlock.blance = cardInfo.balance;
                        }
                        if (cardInfo.consumeMode != "2") {
                            if (cardInfo.balance > 0) {
                                searchTimesCardProjectList.push(showBlock);
                            }
                        } else {
                            searchTimesCardProjectList.push(showBlock);
                        }
                    }
                }
            }
        }
    }

    //筛选次卡数据
    for (let key in prevState.searchCardProjInfo) {
        let value = prevState.searchCardProjInfo[key];
        for (let i = 0; i < value.length; i++) {
            let pl = value[i];
            if (pl.text && pl.text != '') {
                let proJson = JSON.parse(pl.text);

                for (let j = 0; j < searchTimesCardProjectList.length; j++) {
                    var searchTimesCardProjectMap = searchTimesCardProjectList[j];
                    if (pl.templateId == searchTimesCardProjectMap.projId) {
                        let showBlock = {};
                        showBlock.itemNo = proJson.item_no;
                        showBlock.projName = searchTimesCardProjectMap.projName;
                        showBlock.price = parseFloat(proJson.sumprice).toFixed(2);
                        showBlock.cardName = searchTimesCardProjectMap.cardName;
                        showBlock.vipCardNo = searchTimesCardProjectMap.vipCardNo;
                        showBlock.remark = searchTimesCardProjectMap.remark;
                        showBlock.blance = searchTimesCardProjectMap.blance;
                        showBlock.consumeMode = searchTimesCardProjectMap.consumeMode;
                        timesCardProjectList.push(showBlock);
                    }
                }
            }
        }
    }

    //筛选项目数据
    let timesCardProjectDatas = [];
    timesCardProjectList.forEach((itemProj, index) => {
        for (let itemId in prevState.allProjDatas) {
            let currProject = prevState.allProjDatas[itemId];
            if (itemProj.itemNo == currProject.itemNo) {
                itemProj.itemId = itemId;
                itemProj.itemTypeId = currProject.itemTypeId;
                itemProj.name = currProject.name;
                timesCardProjectDatas.push(itemProj);
            }
        }
    });

    //次卡数据排序
    if (timesCardProjectDatas.length != 0) {
        let cards = [];
        for (let i = 0; i < timesCardProjectDatas.length; i++) {
            if (cards.length != 0) {
                let count = 0;
                for (let j = 0; j < cards.length; j++) {
                    if (timesCardProjectDatas[i].itemNo == cards[j].itemNo && timesCardProjectDatas[i].vipCardNo == cards[j].vipCardNo) {
                        count++;
                    }
                }
                if (count == 0) {
                    cards.push(timesCardProjectDatas[i]);
                }
            } else {
                cards.push(timesCardProjectDatas[i]);
            }
        }

        let sortCards = cards.sort(
            function (a, b) {
                if (a.vipCardNo < b.vipCardNo) return -1;
                if (a.vipCardNo > b.vipCardNo) return 1;
                return 0;
            }
        );
        timesProjectInfo = sortCards;
    }

    timesProjectInfo.map((currItem, index) => {
        let itemId = currItem.itemId;
        prevState.allTimecardProjDatas[currItem.vipCardNo] = currItem;
    });

    prevState.timesProjectDatas = timesProjectInfo;
}

//转换前端数据结构为bms数据结构
const convertToBackendData = (prevState, consumeItem) => {
    let allDatas;

    consumeItem.projectConsumeType = "0";
    consumeItem.consumeTimeAmount = "0";
    if (consumeItem.itemType == 'proj') {
        allDatas = prevState.allProjDatas;
        consumeItem.service = '1';
    } else if (consumeItem.itemType == 'item') {
        allDatas = prevState.allItemDatas;
        consumeItem.service = '0';
    } else if (consumeItem.itemType == 'card') {
        allDatas = prevState.allTimecardProjDatas;
        consumeItem.service = '1';
        consumeItem.projectConsumeType = '1';
        consumeItem.consumeTimeAmount = 1;
    }

    consumeItem.id = -1;
    consumeItem.costPrice = consumeItem.itemPrice;
    consumeItem.discountPrice = 0;
    consumeItem.amount = consumeItem.itemNum;
    consumeItem.totalPrice = parseFloat(consumeItem.itemPrice) * parseInt(consumeItem.itemNum);
    consumeItem.paidIn = parseFloat(consumeItem.itemPrice) * parseInt(consumeItem.itemNum);
    consumeItem.projectMirror = {};
    if (consumeItem.itemType == 'card') {
        consumeItem.projectMirror.vipCardNo = allDatas[consumeItem.vipCardNo].vipCardNo;
        consumeItem.projectMirror.cardName = allDatas[consumeItem.vipCardNo].cardName;
        consumeItem.projectMirror.blance = allDatas[consumeItem.vipCardNo].blance;
        consumeItem.projectMirror.consumeMode = allDatas[consumeItem.vipCardNo].consumeMode;//0疗程卡 1套餐卡 2时间卡
    }
    consumeItem.projectMirror.index = new Date().getTime() + '' + Math.round(Math.random() * 1000);
    consumeItem.type = '0';

    consumeItem.unitType = consumeItem.unitType;
    if (consumeItem.itemType == 'item') {
        consumeItem.itemSpecification = allDatas[consumeItem.itemId].specification;
        consumeItem.unit = allDatas[consumeItem.itemId].specUnit;
        consumeItem.unitLev1 = allDatas[consumeItem.itemId].unit;

        consumeItem.itemTypeId = allDatas[consumeItem.itemId].itemTypeId;
        consumeItem.itemTypeName = '产品';//allDatas[consumeItem.itemId].name;
    } else if (consumeItem.itemType == 'proj') {
        consumeItem.unit = '规格';//allDatas[consumeItem.itemId].specUnit;

        consumeItem.itemTypeId = allDatas[consumeItem.itemId].itemTypeId;
        consumeItem.itemTypeName = '服务项';//allDatas[consumeItem.itemId].name;
    } else {
        consumeItem.unit = allDatas[consumeItem.vipCardNo].specUnit;

        consumeItem.itemTypeId = allDatas[consumeItem.vipCardNo].itemTypeId;
        consumeItem.itemTypeName = '产品';// allDatas[consumeItem.vipCardNo].name;
    }

    consumeItem.rebate = -1;
    consumeItem.extraPrice = 0;//加收
    consumeItem.paidPrice = '';//实收
    consumeItem.upPrice = 0;//上浮价格
    consumeItem.priceType = 0; //优惠类型
    consumeItem.expendPrice = "";//成本
    consumeItem.fixedPrice = 0;//减扣
    consumeItem.status = 0;
    consumeItem.paidStatus = 0;
    consumeItem.isGift = 0; //无优惠
    consumeItem.rework = "-1";
    consumeItem.delFlag = false;

    return computePrice(consumeItem);
}

//构建取单数据
const buildExistDatas = (self, orderData) => {
    let projDatas = JSON.parse(orderData.projectInfo);
    let itemDatas = JSON.parse(orderData.productInfo);
    let categoryOrder = JSON.parse(orderData.categoryOrder);
    let serverDatas = JSON.parse(orderData.staffInfo);
    let searchCardProjDats = JSON.parse(orderData.searchInfo);

    self.setState((prevState, prevProps) => {
        //clear oldData
        prevState.consumeItems = [];

        //构建数据
        buildProjDatas(prevState, projDatas);
        buildItemDatas(prevState, itemDatas);
        buildServicerDatas(prevState, serverDatas);
        buildConsumedItems(prevState, orderData.consumeList, orderData.billingInfo.memberType, orderData.memberInfo);
        buildBillingedInfos(prevState, orderData.billingInfo);

        //构建次卡项目-会员信息
        prevState.searchCardProjInfo = searchCardProjDats;
        if (orderData.billingInfo.memberType == '0' && orderData.memberInfo) {
            buildMemberInfos(self, prevState, orderData.memberInfo);
        }

        // self.swipConsumeItem('card');

        prevState.isgeted = true;
        prevState.cacheAllProjDatas = prevState.currentShowProjDatas;
        prevState.choosedProjPriceDatas = prevState.currentShowProjDatas;
        prevState.choosedProjCategoryDatas = prevState.currentShowProjDatas;

        prevState.cacheAllItemDatas = prevState.currentShowItemDatas;
        prevState.choosedItemPriceDatas = prevState.currentShowItemDatas;
        prevState.choosedItemCategoryDatas = prevState.currentShowItemDatas;

        prevState.cacheAllServicerDatas = prevState.currentShowServicerDatas;
        prevState.choosedServicerCategoryDatas = prevState.currentShowServicerDatas;

        prevState.handNumber = orderData.handNumber.length > 0 ? orderData.handNumber : '';
        prevState.operatorId = orderData.operatorId;
        prevState.operatorText = orderData.operatorText;
        prevState.customerNumber = (orderData.customerNumber.length < 1 || orderData.customerNumber == '0') ? '1' : orderData.customerNumber;
        prevState.customerSex = orderData.customerSex;
        prevState.isSynthesis = orderData.isSynthesis;
        prevState.totalConsumePrice = orderData.totalPrice;
        prevState.isKeyNumber = orderData.isKeyNumber;
        return prevState;
    });
}

//构建挂单的消费项目
const buildConsumedItems = (prevState, consumeDatas, billType, memberInfo) => {

    let allConsumables = consumeDatas.filter(x => x.service == 2);
    consumeDatas = consumeDatas.filter(x => x.service != 2);
    consumeDatas.forEach((item) => {

        item.itemNum = item.amount;
        item.itemPrice = item.costPrice;
        item.itemType = '';
        if (item.service == '0') {//外卖
            item.itemType = 'item'
        } else if (item.service == '2') {//消耗
            item.itemType = 'consume';
        } else if (item.service == '1') {//服务项目
            if (item.projectConsumeType == '0') {
                item.itemType = 'proj'
            } else {
                item.itemType = 'card';
                item.itemNum = item.consumeTimeAmount;
            }
        }
        item.isChoosed = false;

        let staffCount = 0;
        let assistStaffDetail = typeof item.assistStaffDetail === 'string' ? JSON.parse(item.assistStaffDetail) : item.assistStaffDetail;
        assistStaffDetail = assistStaffDetail.map((staff) => {
            staffCount++;
            return staff;
        });

        for (let k = 0; k < (3 - staffCount); k++) {
            assistStaffDetail.push(defaultServicer());
        }


        item.projectMirror = item.projectMirror && item.projectMirror.length > 0 ? JSON.parse(item.projectMirror) : item.projectMirror;
        item.assistStaffDetail = assistStaffDetail;
        item.paidPrice = item.paidPrice && ((item.paidPrice.length < 1) || parseFloat(item.paidPrice) < 0) ? '' : item.paidPrice;
        // if(item.paidPrice == '' || item.paidPrice == -1){
        //     item.paidPrice = item.totalPrice;
        // }

        //处理次卡项目卡名等问题
        let vipCardNo = item.projectMirror.vipCardNo;
        if ('0' == billType && vipCardNo) {
            let vipcardList = memberInfo.vipStorageCardList;
            for (let h = 0; h < vipcardList.length; h++) {
                let currCard = vipcardList[h];
                if (vipCardNo == currCard.vipCardNo) {
                    item.projectMirror.cardName = currCard.vipCardName;
                    item.projectMirror.balance = currCard.balance;
                    item.projectMirror.consumeMode = currCard.consumeMode;
                    break;
                }
            }
        }
        prevState.consumeItems.push(item);
        prevState.consumeItemsExist.push(item);
    });

    let formatStaffData = function (staffsStr) {
        let staffs = JSON.parse(staffsStr);
        for (let i = 0; i < 3; i++) {
            staffs[i] = staffs[i] ? staffs[i] : {};
        }
        staffs = staffs.slice(0, 3);
        return staffs;
    };

    consumeDatas.filter(x => x.service === 1).forEach(item => {
        var consumables = allConsumables.map(x => ({
            ...x,
            assistList: formatStaffData(x.assistStaffDetail),
            projectMirror: JSON.parse(x.projectMirror),
            projectMirrorIndex: JSON.parse(x.projectMirror).index,
        })).filter(x =>
            x.projectMirror.index == item.projectMirror.index
        );

        if (consumables && consumables.length)
            item.consumables = consumables;
    });

}

//构建挂单的单据信息
const buildBillingedInfos = (prevState, billingInfo) => {
    prevState.id = billingInfo.id;
    prevState.memberType = billingInfo.memberType;
    prevState.memberId = billingInfo.memberId;
    prevState.companyId = billingInfo.companyId;
    prevState.storeId = billingInfo.storeId;
    prevState.isOldCustomer = billingInfo.isOldCustomer;
    prevState.roomId = billingInfo.roomId;
    prevState.categoryId = billingInfo.categoryId;
    prevState.type = billingInfo.type;
    prevState.flowNumber = billingInfo.flowNumber;
    prevState.keyNumber = billingInfo.keyNumber;
    prevState.customerSex = billingInfo.customerSex;
    prevState.deptId = billingInfo.deptId;
    prevState.billingNo = billingInfo.billingNo;
    prevState.remark = billingInfo.remark;
    prevState.integral = billingInfo.integral;
    prevState.billingNum = billingInfo.billingNum;

    prevState.totalConsumeNum = billingInfo.allTimeProjectCount;
}

//构建取单的会员信息
const buildMemberInfos = (self, prevState, memberInfo) => {
    //构建次卡项目
    buildCardProjDatas(prevState, memberInfo.vipStorageCardList);

    if (prevState.timesProjectDatas.length > 0) {
        self.cardCount = prevState.timesProjectDatas.length;
    }

    var member = memberInfo;

    member.userImgUrl = getImage(
        member.imgUrl,
        ImageQutity.member_small,
        defaultMemberImg
    );

    var cardBalanceCount = 0.0;
    var cardCount = 0;

    if (memberInfo.vipStorageCardList) {
        var vipStorageCardList = member.vipStorageCardList;
        cardCount = vipStorageCardList.length;

        for (let k = 0; k < vipStorageCardList.length; k++) {
            let cardInfo = vipStorageCardList[k];
            let cardType = cardInfo.cardType;//2
            let cardStatus = cardInfo.status;
            if (cardStatus == 0 && cardType == 1) {
                cardBalanceCount += parseFloat(cardInfo.balance);
            }
        }
    }

    member.cardCount = cardCount;
    member.cardBalanceCount = cardBalanceCount;

    //构建基本信息
    prevState.memberType = '0';
    prevState.memberId = memberInfo.id;
    prevState.customerSex = memberInfo.sex;
    prevState.memberInfo = memberInfo;
    self.props.navigation.setParams({
        ...self.props.route.params,
        showMemberIcon: true,
        memberInfo: memberInfo,
        member: member
    });

    // 更新缓存，展示会员信息
    let {route, navigation} = self.props;
    route.params.showMemberIcon = true
    route.params.memberInfo = memberInfo
    route.params.member = member
    AsyncStorage.setItem("queryMemberInfo", JSON.stringify({
        route,
        navigation
    }))
}

//构建待提交数据
const buildSubmitData = (self) => {
    const consumeDatas = self.state.consumeItems;
    if (consumeDatas.length < 1) {
        showToast('请添加消费项目');
        return {toSubmit: false, data: null, index: -1};
    } else {

        //数据有效性
        for (let h = 0; h < consumeDatas.length; h++) {
            let assistStaffDetail = consumeDatas[h].assistStaffDetail;
            let validServicer = false;

            for (let k = 0; k < assistStaffDetail.length; k++) {
                let itemServicer = assistStaffDetail[k];
                if (itemServicer.id.length > 0) {
                    validServicer = true;
                    break;
                }
            }

            if (!validServicer) {
                showToast('请添加服务人');
                return {toSubmit: false, data: null, index: h};
            }
        }

        let submitConsumeDatas = [];
        //转换消耗
        consumeDatas.forEach(item => {

            if (item.consumables && item.consumables.length) {
                item.consumables.forEach(consumeItem => {
                    let newConsume = {...consumeItem};
                    newConsume.assistStaffDetail = consumeItem.assistList.filter(mapItem => mapItem.id);
                    delete newConsume['active'];
                    delete newConsume['assistList'];
                    delete newConsume['itemNum'];
                    delete newConsume['itemPrice'];
                    delete newConsume['itemType'];
                    delete newConsume['isChoosed'];
                    delete newConsume['projectMirrorIndex'];
                    submitConsumeDatas.push(newConsume);
                });
            }
        });

        for (let h = 0; h < consumeDatas.length; h++) {
            let currItem = Object.assign({}, consumeDatas[h]);

            let keyToDelete = "itemPrice";
            delete currItem[keyToDelete];

            keyToDelete = "itemNum";
            delete currItem[keyToDelete];

            keyToDelete = "itemType";
            delete currItem[keyToDelete];

            keyToDelete = "isChoosed";
            delete currItem[keyToDelete];

            keyToDelete = "vipCardNo";
            delete currItem[keyToDelete];

            delete currItem['consumables'];

            let assistStaffDetail = [];
            currItem.assistStaffDetail.forEach(staff => {
                if (staff.id.length > 0) {
                    assistStaffDetail.push(staff);
                }
            });

            currItem.assistStaffDetail = assistStaffDetail;
            submitConsumeDatas.push(currItem);
        }

        let orderInfo = {
            id: self.state.id,
            memberType: self.state.memberType,
            memberId: self.state.memberId,
            companyId: self.state.companyId,
            storeId: self.state.storeId,
            isOldCustomer: parseInt(self.state.isOldCustomer),
            roomId: self.state.roomId,
            categoryId: self.state.operatorId,
            type: self.state.type,
            flowNumber: self.state.flowNumber,
            keyNumber: self.state.handNumber,
            customerSex: self.state.customerSex || '0',
            deptId: self.state.deptId,
            billingNo: self.state.billingNo,
            remark: self.state.remark,
            integral: self.state.integral,
            billingNum: self.state.billingNum,
            reserveId: self.state.reserveId
        };

        //处理取单后的项目删除
        let consumeItemsExist = self.state.consumeItemsExist;
        consumeItemsExist.forEach((existItem, index) => {
            let existId = existItem.id;
            let isRemoved = true;
            for (let k = 0; k < submitConsumeDatas.length; k++) {
                let newItem = submitConsumeDatas[k];
                let newId = newItem.id;
                if (newId != '-1' && newId == existId) {
                    isRemoved = false;
                }
            }

            if (isRemoved) {
                existItem.delFlag = true;

                let keyToDelete = "itemPrice";
                delete existItem[keyToDelete];

                keyToDelete = "itemNum";
                delete existItem[keyToDelete];

                keyToDelete = "itemType";
                delete existItem[keyToDelete];

                keyToDelete = "isChoosed";
                delete existItem[keyToDelete];

                keyToDelete = "vipCardNo";
                delete existItem[keyToDelete];

                delete existItem['consumables'];

                submitConsumeDatas.push(existItem);
            }
        });

        //构建待提交数据结构
        let finalData = {
            opt: 'bms',
            consumeItems: JSON.stringify(submitConsumeDatas),
            billing: JSON.stringify(orderInfo)
        }

        return {toSubmit: true, data: finalData, index: -1};
    }
}

//次卡支付方式处理
function dealTimesCardProjectPaymentGeneral(self, readyData, paymentTimesCard, payPassword = "") {
    let rs = {stat: true};

    if (self.state.totalConsumeNum > 0) {
        let paymentTimesCardTmp = [];
        let billingDetail = JSON.parse(readyData.consumeItems);
        let timesProjectMap = {};//合并次卡项目及消费次数后的次卡消费项目, 相同项目合并
        let paymentTimesCardInfoMap = {};
        for (let i = 0; i < billingDetail.length; i++) {
            let consumeDetail = billingDetail[i];
            if (consumeDetail && consumeDetail.projectConsumeType == 1 && consumeDetail.delFlag!==true) {
                let timesProject = timesProjectMap[consumeDetail.projectMirror.index];
                if (!timesProject) {
                    timesProject = {};
                    timesProject.index = consumeDetail.projectMirror.index;
                    timesProject.itemId = consumeDetail.itemId;
                    timesProject.itemName = consumeDetail.itemName;
                    timesProject.vipCardNo = consumeDetail.projectMirror.vipCardNo;
                    timesProject.consumeTimes = parseInt(consumeDetail.consumeTimeAmount);
                    timesProjectMap[consumeDetail.projectMirror.index] = timesProject;
                } else {
                    timesProjectMap[consumeDetail.projectMirror.index].consumeTimes = parseInt(consumeDetail.consumeTimeAmount) + timesProjectMap[consumeDetail.projectMirror.index].consumeTimes;
                }
            }
        }

        for (let i = 0; i < self.state.memberInfo.vipStorageCardList.length; i++) {
            let card = self.state.memberInfo.vipStorageCardList[i];
            if (card.cardType == 2 || card.status != 0) {
                if (card.status == 0) {
                    paymentTimesCardInfoMap[card.vipCardNo] = card;
                }
                continue;
            }
        }


        for (let k in timesProjectMap) {
            let timesProject = timesProjectMap[k];
            if (timesProject && timesProject.index) {
                let payCard = paymentTimesCardInfoMap[timesProject.vipCardNo];
                if (!payCard) {
                    continue;
                }

                let consumeTimes = timesProject.consumeTimes;
                if (payCard.consumeMode == 2) {
                    let paymentObject = {
                        "payType": 4,
                        "payTypeId": payCard.id,
                        "payTypeNo": payCard.vipCardNo,
                        "paymentName": payCard.vipCardName,
                        "payAmount": consumeTimes,
                        "payTypePwd": payPassword,
                        "payMode": payCard.consumeMode,
                        "hasPassword": payCard.hasPassword
                    };
                    paymentTimesCardTmp.push(paymentObject);
                    timesProject.consumeTimes = 0;
                } else {
                    if (payCard.balance && payCard.balance >= consumeTimes) {
                        let paymentObject = {
                            "payType": 4,
                            "payTypeId": payCard.id,
                            "payTypeNo": payCard.vipCardNo,
                            "paymentName": payCard.vipCardName,
                            "payAmount": consumeTimes,
                            "payTypePwd": payPassword,
                            "payMode": payCard.consumeMode,
                            "hasPassword": payCard.hasPassword
                        };
                        paymentTimesCardTmp.push(paymentObject);
                        timesProject.consumeTimes = 0;
                    } else {
                        let msg = "次卡项目（" + timesProject.itemName + "）余次不足!";
                        rs = {stat: false, msg: msg};
                        return rs;
                    }
                }
            }
        }

        for (let i = 0; i < paymentTimesCardTmp.length; i++) {
            paymentTimesCard.push(paymentTimesCardTmp[i]);
        }

        for (let i = 0; i < paymentTimesCard.length; i++) {
            let currentPayment = paymentTimesCard[i];
            let card = paymentTimesCardInfoMap[currentPayment.payTypeNo];
            if (card.balance < currentPayment.payAmount && currentPayment.payMode != 2) {
                let msg = "次卡（" + card.vipCardName + "）余次不足!";
                rs = {stat: false, msg: msg};
                return rs;
            }
        }

        for (let k in timesProjectMap) {
            let timesProject = timesProjectMap[k];
            if (timesProject && timesProject.consumeTimes > 0) {
                let msg = "次卡项目（" + timesProject.itemName + "）余次不足!";
                rs = {stat: false, msg: msg};
                return rs;
            }
        }
    }

    return rs;
}

//构建微信支付宝
const buildWxAliPay = (self) => {
    return {
        wx: [{
            "payType": 6,
            "payTypeId": 19,
            "payTypeNo": 19,
            "paymentName": "微信",
            "payAmount": self.state.totalConsumePrice,
            "payMode": 0
        }],
        ali: [{
            "payType": 6,
            "payTypeId": 18,
            "payTypeNo": 18,
            "paymentName": "支付宝",
            "payAmount": self.state.totalConsumePrice,
            "payMode": 0
        }]
    }
}

/**格式化消费项列表信息*/
const buildPayComsumeItems = (self, readyData) => {
    let consumeList = [];
    let billingDetailList = JSON.parse(readyData.consumeItems);
    if (billingDetailList && billingDetailList.length > 0) {
        for (let i = 0; i < billingDetailList.length; i++) {
            let consume = billingDetailList[i];
            let consumeDetail = {};
            if (!consume.itemId || consume.delFlag==true) {
                continue;
            }
            consumeDetail.id = consume.id;
            consumeDetail.billingNo = consume.billingNo;
            consumeDetail.amount = consume.amount;
            consumeDetail.consumeTimeAmount = consume.consumeTimeAmount;
            consumeDetail.costPrice = consume.costPrice;
            consumeDetail.discountPrice = consume.discountPrice;
            consumeDetail.expendPrice = consume.expendPrice;
            consumeDetail.extraPrice = consume.extraPrice;
            consumeDetail.fixedPrice = consume.fixedPrice;
            consumeDetail.isGift = consume.isGift;
            consumeDetail.itemId = consume.itemId;
            consumeDetail.itemName = consume.itemName;
            consumeDetail.itemNo = consume.itemNo;
            consumeDetail.itemTypeId = consume.itemTypeId;
            consumeDetail.paidIn = consume.paidIn;
            consumeDetail.paidPrice = consume.paidPrice;
            consumeDetail.paidStatus = consume.paidStatus;
            consumeDetail.paidMoney = consume.paidMoney ? consume.paidMoney : 0;
            consumeDetail.priceType = consume.priceType;
            consumeDetail.projectConsumeType = consume.projectConsumeType;
            consumeDetail.rebate = consume.rebate;
            consumeDetail.rework = consume.rework;
            consumeDetail.service = consume.service;
            consumeDetail.status = consume.status;
            consumeDetail.totalPrice = consume.totalPrice;
            consumeDetail.type = consume.type;
            consumeDetail.upPrice = consume.upPrice;
            consumeDetail.companyId = self.state.companyId;
            consumeDetail.storeId = self.state.storeId;
            consumeList.push(consumeDetail);
        }
    }
    return consumeList;
}

//价格计算
const computePrice = function (consumes) {
    var billingType = '0'//是否员工单  0:普通单  1:员工单
    var totalPrice = 0;
    var extraPrice = consumes.extraPrice;
    if (consumes.service == 1) {
        // 服务项目
        if (billingType != '1') {
            totalPrice = parseFloat(consumes.costPrice) * parseInt(consumes.amount);
            consumes.paidIn = parseFloat(consumes.costPrice) * parseInt(consumes.amount);
        }
    } else {
        // 产品
        if (consumes.unitType == '1') {
            // 大单位
            totalPrice = parseFloat(consumes.costPrice) * parseInt(consumes.amount);
            consumes.paidIn = parseFloat(consumes.costPrice) * parseInt(consumes.amount);
        } else {
            // 小单位
            var countNum = 0;
            if (consumes.itemSpecification) {
                countNum = Math.ceil(parseInt(consumes.amount) / parseInt(consumes.itemSpecification));
            } else {
                console.log(consumes.itemName + " : 没有产品规格，总价为0");
            }
            totalPrice = Math.round(countNum * parseFloat(consumes.costPrice));
            consumes.paidIn = Math.round(countNum * parseFloat(consumes.costPrice));
        }
    }

    // 实收计算
    if (consumes.paidPrice) {
        consumes.priceType = 0;
        consumes.fixedPrice = 0;
        consumes.extraPrice = 0;
        consumes.discountPrice = 0;
        consumes.isGift = 0;
        var paidPrice = parseFloat(consumes.paidPrice);
        if (totalPrice < paidPrice) {
            consumes.priceType = 0;
            consumes.fixedPrice = 0;
            // 填写加收
            consumes.extraPrice = priceFixed(paidPrice - totalPrice);
        } else if (totalPrice > paidPrice) {
            consumes.extraPrice = 0;
            // 填写减扣
            consumes.priceType = 2;
            consumes.fixedPrice = priceFixed(totalPrice - paidPrice);
            consumes.discountPrice = consumes.fixedPrice;
        } else {
            consumes.priceType = 0;
            consumes.fixedPrice = 0;
            consumes.extraPrice = 0;
            consumes.discountPrice = 0;
            consumes.isGift = 0;
        }
        consumes.paidIn = priceFixed(parseFloat(consumes.paidIn) + parseFloat(consumes.extraPrice));
        consumes.totalPrice = paidPrice;
    } else {
        // 价格调整
        if (consumes.isGift == 1) {
            // 优惠金额;
            consumes.discountPrice = totalPrice;
            consumes.fixedPrice = totalPrice;
        } else {
            if (consumes.priceType == 1) {
                var discount = consumes.rebate;
                consumes.discountPrice = ((1 - parseFloat(discount)) * totalPrice).toFixed();
                consumes.totalPrice = priceFixed(totalPrice - consumes.discountPrice + extraPrice);
            } else if (consumes.priceType == 2) {
                consumes.totalPrice = priceFixed(totalPrice - consumes.discountPrice + extraPrice);
                if (parseFloat(consumes.totalPrice) < 0) {
                    consumes.priceType = 2;
                    consumes.isGift = 0;
                    consumes.fixedPrice = 0;
                    consumes.extraPrice = extraPrice;
                    consumes.rebate = -1;
                    consumes.discountPrice = 0;
                    consumes.totalPrice = priceFixed(totalPrice - consumes.discountPrice + extraPrice);
                }
            } else {
                consumes.totalPrice = priceFixed(parseFloat(totalPrice) + parseFloat(extraPrice));
            }
        }
        consumes.paidIn = priceFixed(parseFloat(consumes.paidIn) + parseFloat(extraPrice));
    }

    return consumes;
};

//计算消费金额
const buildTotalPrice = (prevState) => {
    let totalPrice = 0.0;
    let totalCardProj = 0;
    for (let k = 0; k < prevState.consumeItems.length; k++) {
        let currItem = prevState.consumeItems[k];
        if (currItem.itemType == 'card') {
            totalCardProj++;
        } else {
            totalPrice += parseFloat(currItem.totalPrice);
        }
    }

    totalPrice = parseFloat(totalPrice).toFixed(prevState.roundMode);

    //此处的totalPrice 需要判断计算

    return {...prevState, totalConsumePrice: totalPrice.toString(), totalConsumeNum: totalCardProj}
}

//通过键盘筛选
const buildQueryItems = (self, number) => {
    let allShowDatas;
    let readyToFilters;
    let resultData = [];
    let showFilterMsgBoard = -1;
    let showFilterKeyBoard = false;

    if (self.state.addConsumeType == 'item') {
        allShowDatas = self.state.allItemDatas;
        readyToFilters = self.state.currentShowItemDatas;

        if (number.length < 1) {
            resultData = readyToFilters;
        } else {
            readyToFilters.forEach((itemId) => {
                let currentItem = allShowDatas[itemId];
                if (currentItem.itemNo == number || parseFloat(currentItem.unitPrice) == parseFloat(number) || currentItem.name.indexOf(number) != -1) {
                    resultData.push(itemId);
                }
            });
        }

        if (resultData.length == 0) {
            showFilterMsgBoard = 0;
            showFilterKeyBoard = true;
        }

        self.setState((preState, props) => {
            preState.currentShowItemDatas = resultData;
            preState.showFilterKeyBoard = showFilterKeyBoard;
            preState.showFilterMsgBoard = showFilterMsgBoard;
            preState.queryInputText = number;
            return preState;
        });
    } else if (self.state.addConsumeType == 'proj') {
        allShowDatas = self.state.allProjDatas;
        readyToFilters = self.state.currentShowProjDatas;
        if (number.length < 1) {
            resultData = readyToFilters;
        } else {
            readyToFilters.forEach((itemId) => {
                let currentItem = allShowDatas[itemId];
                if (currentItem.itemNo == number || parseFloat(currentItem.sumPrice) == parseFloat(number) || currentItem.name.indexOf(number) != -1) {
                    resultData.push(itemId);
                }
            });
        }

        if (resultData.length == 0) {
            showFilterMsgBoard = 0;
            showFilterKeyBoard = true;
        }

        self.setState((preState, props) => {
            preState.currentShowProjDatas = resultData;
            preState.showFilterKeyBoard = showFilterKeyBoard;
            preState.showFilterMsgBoard = showFilterMsgBoard;
            preState.queryInputText = number;
            return preState;
        });
    } else if (self.state.addConsumeType == 'servicer') {
        allShowDatas = self.state.allServicerDatas;
        self.setState((preState, props) => {
            preState.currentShowServicerDatas = [];

            let filterKey = self.state.filterServicerKey;
            Object.keys(allShowDatas).forEach((staffId) => {
                if (number && number.length > 0) {//店那编号非空查询
                    if (filterKey && filterKey.length > 0) {//当前服务人的分类筛选非所有人
                        if ((allShowDatas[staffId].position == filterKey && allShowDatas[staffId].storeStaffNo == number) || allShowDatas[staffId].value.indexOf(number) != -1) {
                            preState.currentShowServicerDatas.push(staffId);
                        }
                    } else {
                        if (allShowDatas[staffId].storeStaffNo == number || allShowDatas[staffId].value.indexOf(number) != -1) {
                            preState.currentShowServicerDatas.push(staffId);
                        }
                    }
                } else {//店内编号空输查询
                    if (filterKey && filterKey.length > 0) {//当前服务人的分类筛选非所有人
                        if (allShowDatas[staffId].position == filterKey) {
                            preState.currentShowServicerDatas.push(staffId);
                        }
                    } else {
                        preState.currentShowServicerDatas.push(staffId);
                    }
                }
            });

            if (preState.currentShowServicerDatas.length < 1) {
                preState.currentShowServicerDatas = [];

                showFilterMsgBoard = 0;
                showFilterKeyBoard = true;
            }

            preState.showFilterKeyBoard = showFilterKeyBoard;
            preState.showFilterMsgBoard = showFilterMsgBoard;
            preState.filterServicer = true;
            preState.queryInputText = number;

            return preState;
        });
    }
};

//订单保存后发生异常，重新读取单据
const reloadOrderInfo = (self) => {
    let userInfo = self.props.auth.userInfo;
    let queryParams = {
        companyId: userInfo.companyId,
        storeId: userInfo.storeId,
        staffId: userInfo.staffId,
        staffDBId: userInfo.staffDBId,
        isSynthesis: userInfo.isSynthesis,//是否综合店
        flowNumber: self.state.flowNumber
    }

    self.props.getOrderInfo(queryParams);
}

//展示提示信息
const showToast = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
};

//判定对象是否
const imEmpty = (obj) => {
    let count = 0;
    for (let key in obj) {
        count++;
        break;
    }

    return count > 0;
}

//按配置计算价格小数点
var priceFixed = function (price) {
    var roundMode = this && this.state? this.state.roundMode : company_roundMode;
    if (price) {
        if (roundMode) {
            return parseFloat(price).toFixed(roundMode);
        } else {
            return parseFloat(price).toFixed(0);
        }
    } else {
        return 0;
    }
};

//获取数组交集
const arrayIntersection = (arr1, arr2) => {
    let elemSet = {};
    let resArr = [];

    arr1.forEach(element => {
        elemSet[element] = 1;
    });

    arr2.forEach(element => {
        elemSet[element] = elemSet[element] ? elemSet[element] + 1 : 1;
    });

    for (let elem in elemSet) {
        if (elemSet[elem] > 1) {
            resArr.push(elem);
        }
    }

    return resArr;
}


//mapping props
const mapStateToProps = state => {
    return {
        auth: state.auth,
        orderInfo: state.billingOrder,
        servicers: state.component.staffSevice.data
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        clearCacheData: () => {
            dispatch(clearBillingCacheAction())
        },
        initOrderInfo: (navParams) => {
            dispatch(cashierBillingInitAction(navParams))
        },
        initOrderFlowNumber: () => {
            dispatch(cashierBillingFlowNumberInitAction(true))
        },
        saveOrderInfo: (billingData) => {
            dispatch(cashierBillingSaveAction(billingData))
        },
        getOrderInfo: (flowNumber) => {
            dispatch(cashierBillingGetAction(flowNumber))
        },
        deleteBilling: (param)=>{
            dispatch(deleteBillingAction(param))
        },
        submitOrderInfo: (billingData, prePayData, payType, channel) => {
            dispatch(cashierBillingPayAction(billingData, prePayData, payType, channel))
        },
        resetToCashier: (toPendingOrder) => {
            if (toPendingOrder) {
                dispatch(getPendingListAction('', true));
            }
            props.navigation.setParams({back: null});
            AppNavigate.goBack()
        },
        checkFlowNumber: (params) => {
            dispatch(cashierCheckFlowNumberAction(params))
        }
    };
};

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 0,
        height: 90,
        paddingRight: 20,
    }
})

export const CashierBillingActivity = connect(
    mapStateToProps,
    mapDispatchToProps
)(CashierBillingView);
