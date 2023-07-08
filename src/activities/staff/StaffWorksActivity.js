import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {staffQueueStyles, staffWorksStyles} from '../../styles';
import {connect} from 'react-redux';
import Swiper from "react-native-web-swiper";
import {AppNavigate} from "../../navigators";
import Video from "react-native-video";
import Toast from "react-native-root-toast";
import {
    getBillFlowNO,
    getMemberBillCards,
    getMemberCards,
    getMemberPortrait,
    getStaffPermission
} from "../../services/reserve";
import {getImage, ImageQutity, showMessageExt} from "../../utils";
import Spinner from "react-native-loading-spinner-overlay";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide1: {
        backgroundColor: 'rgba(20,20,200,0.3)',
    },
    slide2: {
        backgroundColor: 'rgba(20,200,20,0.3)',
    },
    slide3: {
        backgroundColor: 'rgba(200,20,20,0.3)',
    },
})

let _mediaPlayer
export class StaffWorksView extends React.Component {
    constructor(props) {
        super(props);

        // 处理state
        let {staffInfo, workInfo} = this.props.route.params;
        this.state = {
            staffInfo,
            workInfo,
            isLoading: false,
            showVideo: true
        }
    }

    componentDidMount() {
        this.setState({
            showVideo: true
        })
    }

    componentWillUnmount() {
        this.setState({
            showVideo: false
        })
    }

    toCashier(){
        this.setState({
            showVideo: false
        }, async () => {
            // 加载中
            this.setState({
                isLoading: true
            })

            try {
                // 服务人信息
                const waiterId =  this.state.staffInfo['staffId']
                const imgUrl = this.props.route.params.imgUrl
                const memberId = this.props.route.params.memberId

                // 登录的员工信息
                const loginUser = this.props.userInfo// 获取员工可用的权限
                const permissionBackData = await getStaffPermission({
                    staffId: loginUser.staffId,
                    companyId: loginUser.companyId
                })
                // 获取水单号
                const flowNumberBackData = await getBillFlowNO()
                if(memberId && memberId.length > 0){ // 散客扫码-->转会员
                    // 开始准备开单的数据-获取BMS会员档案
                    const portraitBackData = await getMemberPortrait({
                        p: 1,
                        ps: 30,
                        cardInfoFlag: false,
                        solrSearchType: 0,
                        kw: memberId
                    })
                    // 开始准备开单的数据-获取BMS会员卡
                    const cardsBackData = await getMemberCards({memberId: memberId})
                    // 获取开单用的会员卡数据
                    const billCardsBackData = await getMemberBillCards({
                        companyId: loginUser.companyId,
                        storeId: loginUser.storeId,
                        customerId: memberId
                    })
                    // 会员档案
                    if(portraitBackData.code != '6000'
                        || cardsBackData.code != '6000'
                        || permissionBackData.code != '6000'
                        || billCardsBackData.code != '6000'
                        || flowNumberBackData.code != '6000'){
                        // 错误
                        showMessageExt("开单失败")
                        this.setState({
                            isLoading: false
                        })
                    }else{
                        this.setState({
                            isLoading: false
                        })
                        // BMS会员档案
                        const memberPortrait = portraitBackData['data']['memberList'][0]
                        // BMS会员卡
                        const memberCardInfo =  cardsBackData['data']
                        // 员工权限
                        const staffPermission = permissionBackData['data']
                        // 开单用的会员卡
                        const billCards = billCardsBackData['data']
                        // 水单号
                        const flowNumber = flowNumberBackData['data']
                        //0专业店 1综合店
                        const isSynthesis = loginUser.isSynthesis;
                        // 可用主营分类
                        const operatorCategory = loginUser.operateCategory[0];

                        // 是否允许调整价格
                        let moduleCode = "1"
                        let moduleCodeIndex = 0;
                        const staffAclMap = staffPermission['staffAclMap'];
                        if (staffAclMap
                            && staffAclMap.moduleCode
                            && staffAclMap.moduleCode == 'ncashier_billing_price_adjustment') { // 是否能允许调整价格
                            moduleCodeIndex++;
                        }
                        if (moduleCodeIndex > 0) {
                            moduleCode = '1'
                        } else {
                            moduleCode = 0
                        }

                        // 开单参数
                        const params = {
                            companyId: loginUser.companyId,
                            storeId: loginUser.storeId,
                            deptId: operatorCategory.deptId,
                            operatorId: operatorCategory.value,
                            operatorText: operatorCategory.text,
                            waiterId: waiterId,
                            staffId: loginUser.staffId,
                            staffDBId: loginUser.staffDBId,
                            isSynthesis: isSynthesis,
                            numType: "flownum",
                            numValue: flowNumber,
                            page: 'ReserveBoardActivity',
                            member: Object.assign({}, memberPortrait, {
                                userImgUrl: getImage(
                                    imgUrl,
                                    ImageQutity.member_small,
                                    'https://pic.magugi.com/magugi_default_01.png'
                                ),
                                vipStorageCardList: billCards.vipStorageCardList || memberCardInfo.vipStorageCardList,
                                cardBalanceCount: memberCardInfo.cardBalanceCount,
                                cardCount: memberCardInfo.cardCount
                            }),
                            type: "vip",
                            roundMode: staffPermission.roundMode,
                            moduleCode: moduleCode,
                            isOldCustomer: memberCardInfo.isOldCustomer,
                            orderInfoLeftData: {
                                handNumber: '',
                                customerNumber: '1',
                                isOldCustomer: memberCardInfo.isOldCustomer,
                            },
                            isShowReserve: true
                        }
                        // 开单
                        AppNavigate.navigate('CashierBillingActivity', params)
                    }
                }else{ // 散客直接开单
                    // 会员档案
                    if(permissionBackData.code != '6000'
                        || flowNumberBackData.code != '6000'){
                        // 错误
                        showMessageExt("开单失败")
                        // 加载中
                        this.setState({
                            isLoading: false
                        })
                    }else{
                        // 加载中
                        this.setState({
                            isLoading: false
                        })
                        // 员工权限
                        const staffPermission = permissionBackData['data']
                        // 水单号
                        const flowNumber = flowNumberBackData['data']
                        //0专业店 1综合店
                        const isSynthesis = loginUser.isSynthesis;
                        // 可用主营分类
                        const operatorCategory = loginUser.operateCategory[0];
                        // 是否允许调整价格
                        let moduleCode = "1"
                        let moduleCodeIndex = 0;
                        const roundMode = staffPermission.roundMode
                        const staffAclMap = staffPermission['staffAclMap'];
                        if (staffAclMap
                            && staffAclMap.moduleCode
                            && staffAclMap.moduleCode == 'ncashier_billing_price_adjustment') { // 是否能允许调整价格
                            moduleCodeIndex++;
                        }
                        if (moduleCodeIndex > 0) {
                            moduleCode = '1'
                        } else {
                            moduleCode = 0
                        }

                        const params = {
                            orderInfoLeftData:{
                                customerNumber:"1",
                                isOldCustomer:"0",
                                handNumber:""
                            },
                            companyId: loginUser.companyId,
                            storeId: loginUser.storeId,
                            deptId: operatorCategory.deptId,
                            operatorId: operatorCategory.value,
                            operatorText: operatorCategory.text,
                            waiterId: waiterId,
                            staffId: loginUser.staffId,
                            staffDBId: loginUser.staffDBId,
                            isSynthesis: isSynthesis,
                            numType: "flownum",
                            numValue: flowNumber,
                            page: "ReserveBoardActivity",
                            member:null,
                            type: "vip",
                            roundMode: roundMode,
                            moduleCode: moduleCode,
                            isOldCustomer: "0", // 散客
                            staffAppoint: "false" // 非指定
                        }

                        // 开单
                        AppNavigate.navigate('CashierBillingActivity', params)
                    }
                }
            } catch (e) {
                // 加载中
                this.setState({
                    isLoading: false
                })
                console.error("散客开单失败", e)
            }
        })
    }

    videoError(){
        Toast.show('视频加载错误', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    render() {
        let {workInfo, staffInfo, showVideo, isLoading} = this.state
        // 总视图
        return (
            <View style={staffWorksStyles.content}>
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View style={staffQueueStyles.floatButtonBox}>
                    {/*立即开单*/}
                    <TouchableOpacity
                        style={staffQueueStyles.reserveButtonKaiDan}
                        onPress={()=>{
                            this.toCashier()
                        }}>
                        <Image
                            style={staffQueueStyles.reserveButtonKaiDanIcon}
                            resizeMode={'contain'}
                            source={require('@imgPath/reserve_customer_button_kaidan.png')}/>
                    </TouchableOpacity>
                </View>


                {
                    showVideo && workInfo.contentType == 1 ?
                        (
                            <Video source={{uri: workInfo.videoUrl}}
                                   ref={(ref) => {_mediaPlayer = ref}}
                                   onBuffer={this.onBuffer}
                                   onError={this.videoError}
                                   poster={workInfo.showImg}
                                   repeat={true}
                                   resizeMode={'contain'}
                                   posterResizeMode={'contain'}
                                   style={staffWorksStyles.videoBox}/>
                        )
                        :
                        (
                        <Swiper
                            from={0}
                            minDistanceForAction={0.1}
                            controlsProps={{
                                dotsTouchable: true,
                                prevPos: 'left',
                                nextPos: 'right',
                                DotComponent: ({ index, activeIndex, isActive, onPress }) => {
                                    return (
                                        <TouchableOpacity onPress={onPress}>
                                            <View style={activeIndex==index ? staffWorksStyles.activeDot: staffWorksStyles.normalDot}/>
                                        </TouchableOpacity>
                                    )
                                },
                                dotsWrapperStyle: staffWorksStyles.dotsWrapperStyle,
                                NextComponent: ({ onPress }) => (
                                    <TouchableOpacity onPress={onPress}>
                                        <Image style={staffWorksStyles.iconImg} source={require('@imgPath/icon-work-next-op.png')} resizeMethod="resize"/>
                                    </TouchableOpacity>
                                ),
                                PrevComponent: ({ onPress }) => (
                                    <TouchableOpacity onPress={onPress}>
                                        <Image style={staffWorksStyles.iconImg} source={require('@imgPath/icon-work-prev-op.png')} resizeMethod="resize"/>
                                    </TouchableOpacity>
                                ),
                            }}
                        >
                            {workInfo && workInfo.imgUrls.map((item, index)=>{
                                return (
                                    <View style={staffWorksStyles.imgBox} key={index}>
                                        <Image style={staffWorksStyles.workImg} source={{uri: item}} resizeMethod="resize" resizeMode={'contain'}/>
                                    </View>
                                )
                            })}
                        </Swiper>
                    )
                }
                <View style={staffWorksStyles.footerWrap}>
                    <View style={staffWorksStyles.footerLeft}>
                        <Image style={staffWorksStyles.staffPhoto} source={{uri: staffInfo.staffPhoto}} resizeMethod="resize"/>
                        <Text style={staffWorksStyles.staffName}>{staffInfo.nickName}</Text>
                        <Text style={staffWorksStyles.staffName}>{staffInfo.positionName}</Text>
                        <Image resizeMethod="resize" source={require('@imgPath/icon-like.png')} style={staffWorksStyles.likeCountImg}/>
                        <Text style={staffWorksStyles.likeCountTxt}>{workInfo.countOfLike}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

//mapping props
const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo
    };
};

export const StaffWorksActivity = connect(mapStateToProps)(
    StaffWorksView
);
