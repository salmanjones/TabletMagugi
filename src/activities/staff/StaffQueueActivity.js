import React from 'react';
import {FlatList, Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {staffQueueStyles} from '../../styles';
import {connect} from 'react-redux';
import {AppConfig, decodeContent, getImage, ImageQutity, showMessageExt} from "../../utils";
import {fetchMBlogDetail, fetchMBlogs, fetchStaffList} from '../../services';
import Toast from "react-native-root-toast";
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";
import {
    getBillFlowNO,
    getMemberBillCards,
    getMemberCards,
    getMemberPortrait,
    getStaffPermission
} from "../../services/reserve";
import {TimerRightWidget} from "../../components/header/TimerRightWidget";
import {cloneDeep} from "lodash/lang";

export class StaffQueueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            staffList: [],
            staffListRaw: [],
            filterPositions: [],
            worksList: [],
            worksTotal: 0,
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            pageSize: 40,
            pageNo: 1,
            staffSelected: undefined,
            waiterId: ''
        };
    }

    componentDidMount() {
        // 右侧时间
        const {navigation} = this.props;
        navigation.setOptions({
            headerRight: () => (
                <TimerRightWidget/>
            )
        })

        // 获取员工信息
        this.loadStaffs()
    }

    // 加载数据
    loadStaffs() {
        let self = this
        // 未知原因导致第二次进入页面loading无法消失
        self.setState({
            isLoading: true
        })

        // 开始获取门店列表
        let {storeId} = this.props.userInfo
        fetchStaffList(storeId, 'pop').then(res => {
            let {code, data} = res
            if (code == '6000') { // 数据请求成功
                let staffList = data.result

                // 员工职务信息
                const positionsData = []

                // 处理员工信息
                staffList.forEach((staff) => {
                    staff.nickName = decodeContent(staff.nickName)
                    staff.staffPhoto = staff.staffPhoto && staff.staffPhoto.length > 0 ? AppConfig.imageServer + staff.staffPhoto + '?imageView2/3/w/650/q/85' : AppConfig.defaultAvatar
                    staff.selected = ''

                    const positionId = staff['positionId']
                    const positionName = staff['positionName']
                    const isPosExist = positionsData.filter(item => {
                        return item.id == positionId
                    }).length > 0
                    if (!isPosExist) {
                        positionsData.push({
                            id: positionId,
                            name: positionName,
                            active: false
                        })
                    }
                })
                positionsData.sort((pos1, pos2) => {
                    const pid1 = parseInt(pos1.id)
                    const pid2 = parseInt(pos2.id)
                    return pid1 - pid2
                })

                let staffSelected = staffList[0]
                this.setState({
                    staffList,
                    staffListRaw: cloneDeep(staffList),
                    staffSelected,
                    waiterId: staffSelected.staffId,
                    filterPositions: positionsData
                }, () => {
                    // 加载第一位员工的作品
                    self.fetchMBlogs(true)
                })
            } else {
                this.loadError()
            }
        }).catch(e => {
            console.error("获取员工列表错误", e)
            this.loadError()
        }).finally(e => {
            self.setState({
                isLoading: false
            })
        })
    }

    // 错误提醒
    loadError(type) {
        this.setState({
            isLoading: false
        })

        if (type == 'works') {
            Toast.show('获取作品失败', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        } else {
            Toast.show('获取员工列表失败', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });

            AppNavigate.goBack()
        }
    }

    // 选择员工
    selectedStaff(index) {
        const {staffList} = this.state
        staffList.forEach(staff => {
            staff['selected'] = ''
        })
        staffList[index]['selected'] = 'selected'

        // 更新状态
        const staffSelected = staffList[index]
        this.setState((prevState) => {
            return {...prevState, staffList, worksList: [], staffSelected, waiterId: staffSelected.staffId};
        }, () => {
            // 新作品获取
            this.fetchMBlogs(true)
        });
    }

    // 测试加载作品
    fetchMBlogs(refresh) {
        let self = this
        let {pageSize, pageNo, worksList, staffSelected} = this.state

        if (refresh) {
            pageSize = 40
            pageNo = 1
            worksList = []
        }
        self.setState({
            isLoading: true,
            pageNo
        }, () => {
            staffSelected && fetchMBlogs({
                staffId: staffSelected.staffId,
                storeId: staffSelected.storeId,
                pageNo,
                pageSize
            }).then(backData => {
                const {code, data} = backData
                if (code == '0') {
                    // 处理员工信息
                    const worksData = data.list
                    const worksTotal = data.total

                    worksData && worksData.forEach((item) => {
                        worksList.push(item)
                    })

                    this.setState({
                        worksList,
                        worksTotal
                    })
                } else {
                    self.loadError('works')
                }
            }).catch(e => {
                console.error("获取员工作品错误", e)
                self.loadError('works')
            }).finally(e => {
                self.setState({
                    isLoading: false
                })
            })
        })
    }

    // 选择作品
    selectedWork(index) {
        let self = this
        let {worksList, staffSelected} = self.state
        worksList.forEach((item, idx) => {
            item.selected = idx == index ? 'selected' : ''
        })

        this.setState({
            worksList,
            isLoading: true
        }, () => {
            // 开始加载详情数据
            const workInfo = worksList[index]
            fetchMBlogDetail({id: workInfo.id}).then(backResult => {
                const {code, data} = backResult
                if (code == '0') {
                    const imgUrl = self.props.route.params.imgUrl
                    const memberId = self.props.route.params.memberId
                    const pagerName = self.props.route.params.pagerName

                    // 跳转参数
                    let params = {
                        workInfo: data,
                        staffInfo: staffSelected,
                        memberId,
                        imgUrl,
                        pagerName
                    }
                    // 页面跳转
                    AppNavigate.navigate('StaffWorksActivity', params)
                } else {
                    self.loadError('works')
                }
            }).catch(e => {
                console.error("获取员工作品错误", e)
                self.loadError('works')
            }).finally(_ => {
                self.setState({
                    isLoading: false
                })
            })
        })
    }

    // 加载更多
    loadMore = () => {
        let pageNo = this.state.pageNo + 1
        this.setState({pageNo}, () => {
            let {staffSelected} = this.state
            staffSelected && this.fetchMBlogs()
        })
    }

    // 去开单
    async toCashier() {
        // 加载中
        this.setState({
            isLoading: true
        })

        // 来源页面
        const {pagerName} = this.props.route.params

        try {
            // 服务人信息
            const waiterId = this.state.waiterId
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
            if (memberId && memberId.length > 0) { // 散客扫码-->转会员
                // 开始准备开单的数据-获取BMS会员档案
                const portraitBackData = await getMemberPortrait({
                    p: 1,
                    ps: 30,
                    cardInfoFlag: false,
                    solrSearchType: 0,
                    kw: memberId
                })
                // 开始准备开单的数据-获取BMS会员卡
                const cardsBackData = await getMemberCards({
                    memberId: memberId,
                    isExpireCard: 1
                })
                // 获取开单用的会员卡数据
                const billCardsBackData = await getMemberBillCards({
                    companyId: loginUser.companyId,
                    storeId: loginUser.storeId,
                    customerId: memberId,
                    isExpireCard: 1
                })
                // 会员档案
                if (portraitBackData.code != '6000'
                    || cardsBackData.code != '6000'
                    || permissionBackData.code != '6000'
                    || billCardsBackData.code != '6000'
                    || flowNumberBackData.code != '6000') {
                    // 错误
                    showMessageExt("开单失败")
                    this.setState({
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                    // BMS会员档案
                    const memberPortrait = portraitBackData['data']['memberList'][0] || {}
                    if (!memberPortrait || !memberPortrait.id) {
                        memberPortrait['id'] = memberId
                    }
                    // BMS会员卡
                    const memberCardInfo = cardsBackData['data']
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
                        page: pagerName,
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
                        isShowReserve: true,
                        staffAppoint: "false" // 非指定
                    }
                    // 开单
                    AppNavigate.navigate('CashierBillingActivity', params)
                }
            } else { // 散客直接开单
                // 会员档案
                if (permissionBackData.code != '6000'
                    || flowNumberBackData.code != '6000') {
                    // 错误
                    showMessageExt("开单失败")
                    // 加载中
                    this.setState({
                        isLoading: false
                    })
                } else {
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
                        orderInfoLeftData: {
                            customerNumber: "1",
                            isOldCustomer: "0",
                            handNumber: ""
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
                        page: pagerName,
                        member: null,
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
    }

    // 转换点赞
    convertNum = (num) => {
        let rs = '';
        num = num.toString();
        if (num.length > 3) {
            let nums = num.split('');
            if (nums[nums.length - 3] == '0') {
                rs = num.substr(0, nums.length - 3) + 'k';
            } else {
                rs = num.substr(0, nums.length - 3) + '.' + num.substr(nums.length - 3, 1) + 'k';
            }
            return rs;
        } else {
            return num;
        }
    }

    setFilterItem = (index) => {
        const filterPositions = this.state.filterPositions.map((item, idx) => {
            if (index == idx) {
                item.active = !item.active
            } else {
                item.active = false
            }

            return item
        })

        // 处理筛选数据
        let staffListData = cloneDeep(this.state.staffListRaw)
        const filterItem = filterPositions.find(item => item.active === true)
        if(filterItem && filterItem.active === true){
            staffListData = staffListData.filter(item=>{
                return item.positionId == filterItem.id
            })
        }

        this.setState({
            staffList: staffListData,
            filterPositions,
            staffSelected: undefined,
            waiterId: ''
        })
    }

    render() {
        const {isLoading, staffList, filterPositions, worksList} = this.state
        // 是够已选中发型师
        const hasSelectedStaff = staffList.filter(item => item.selected && item.selected.length > 0).length > 0

        // 作品渲染
        const renderWorkItem = ({item, index}) => (
            <TouchableOpacity onPress={() => {
                this.selectedWork(index)
            }}>
                <View
                    style={index == this.state.worksList.length - 1 ? staffQueueStyles.lastChild : staffQueueStyles.normalChild}>
                    <View
                        style={item.selected == 'selected' ? staffQueueStyles.workSelectedCell : staffQueueStyles.workCell}>
                        <Image style={staffQueueStyles.workImg}
                               source={{uri: item['picUrl'] + '?imageView2/0/w/800/q/85'}} resizeMethod="resize"
                               resizeMode={'contain'}/>
                        {
                            item.contentType == '2' && (
                                <Image style={staffQueueStyles.videoImg}
                                       resizeMethod="resize"
                                       resizeMode={'contain'}
                                       source={{uri: 'https://pic.magugi.com/0f98d3833dc94fa7457567baaab6ea4c'}}
                                />)
                        }
                        <View style={staffQueueStyles.likeCountBox}>
                            <Image resizeMethod="resize" source={require('@imgPath/icon-like.png')}
                                   style={staffQueueStyles.likeCountImg}/>
                            <Text style={staffQueueStyles.likeCountTxt}>{item['likeNumber']}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

        // 单员工渲染
        const renderStaffItem = ({item, index}) => (
            <TouchableOpacity onPress={() => {
                this.selectedStaff(index)
            }}>
                <View style={staffQueueStyles.itemCell}>
                    <View
                        style={item.selected == 'selected' ? staffQueueStyles.itemSelectedCellWrap : staffQueueStyles.itemCellWrap}>
                        <Image style={staffQueueStyles.itemLeft} source={{uri: item.staffPhoto}} resizeMethod="resize"/>
                        <View style={staffQueueStyles.itemRight}>
                            {/*人气值*/}
                            <View style={staffQueueStyles.popularityBox}>
                                <Image resizeMethod="resize" source={require('@imgPath/icon-popularity.png')}
                                       style={staffQueueStyles.iconPopularity}/>
                                <Text style={staffQueueStyles.popularityTxt}>
                                    人气值:{item.popCount}
                                </Text>
                            </View>
                            {/*基础信息*/}
                            <View style={staffQueueStyles.itemInfo}>
                                <Text style={staffQueueStyles.NickName}>{item.nickName}</Text>
                                <Text style={staffQueueStyles.PositionName}>{item.positionName}</Text>
                                {/*<StarRating score={item.score}></StarRating>*/}
                            </View>
                            {/*价格*/}
                            <View style={staffQueueStyles.priceBox}>
                                {
                                    item.servicePrice ? (
                                        <View style={staffQueueStyles.priceWrap}>
                                            <Text style={staffQueueStyles.priceTxt}>¥{item.servicePrice}</Text>
                                            <Text style={staffQueueStyles.priceDesc}>(洗剪吹)</Text>
                                        </View>
                                    ) : <View></View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

        // 筛选职务
        const filterItem = ({item, index}) => (

                <View style={index == 0 ? staffQueueStyles.filterPosItem0 : staffQueueStyles.filterPosItem}>
                    <TouchableOpacity onPress={() => {
                        this.setFilterItem(index)
                    }}>
                    <Text
                        style={item.active ? staffQueueStyles.filterPosItemTextActive : staffQueueStyles.filterPosItemText}>
                        {item.name}
                    </Text>
                    </TouchableOpacity>
                </View>

        );

        // 总视图
        return (
            <View style={staffQueueStyles.content}>
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                {
                    hasSelectedStaff && (
                        <View style={staffQueueStyles.floatButtonBox}>
                            {/*立即开单*/}
                            <TouchableOpacity
                                style={staffQueueStyles.reserveButtonKaiDan}
                                onPress={() => {
                                    this.toCashier()
                                }}>
                                <Image
                                    style={staffQueueStyles.reserveButtonKaiDanIcon}
                                    resizeMode={'contain'}
                                    source={require('@imgPath/reserve_customer_button_kaidan.png')}/>
                            </TouchableOpacity>
                        </View>
                    )
                }
                <View style={staffQueueStyles.containerList}>
                    <View style={staffQueueStyles.ListHeader}>
                        <Text style={staffQueueStyles.HeaderTxt}>发型师</Text>
                    </View>
                    <FlatList style={staffQueueStyles.FilterPosBox}
                              horizontal={true}
                              data={filterPositions}
                              renderItem={filterItem}
                              keyExtractor={(item) => {
                                  return item.id
                              }}
                              ItemSeparatorComponent={() => {
                                  return (
                                      <View></View>
                                  )
                              }}
                    />
                    {
                        staffList && staffList.length > 0 && (
                            <FlatList
                                style={staffQueueStyles.ListBox}
                                data={staffList}
                                renderItem={renderStaffItem}
                                keyExtractor={(item, index) => item.staffId}
                                numColumns={1}
                                ItemSeparatorComponent={() => {
                                    return (
                                        <View></View>
                                    )
                                }}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={staffQueueStyles.ListEmptyBox}>
                                            <Text>请配置发型师预约时间</Text>
                                        </View>
                                    )
                                }}
                            />
                        )
                    }
                </View>
                <View style={staffQueueStyles.containerWorks}>
                    <View style={staffQueueStyles.WorksHeader}>
                        <Text style={staffQueueStyles.HeaderTxt}>作品</Text>
                    </View>
                    <View style={staffQueueStyles.WorksBox}>
                        {
                            (() => {
                                if (hasSelectedStaff == true) {
                                    if (!worksList || worksList.length < 1) {
                                        return ( // 无作品
                                            <View style={staffQueueStyles.WorksEmptyBox}>
                                                <Image resizeMethod="resize"
                                                       source={require('@imgPath/works_empty.png')}
                                                       style={staffQueueStyles.WorksEmptyImg}/>
                                            </View>
                                        )
                                    } else {
                                        return ( // 有作品
                                            <FlatList
                                                style={staffQueueStyles.WorksListBox}
                                                data={worksList}
                                                renderItem={renderWorkItem}
                                                keyExtractor={(item, index) => index}
                                                numColumns={4}
                                                onEndReached={this.loadMore}
                                                onEndReachedThreshold={0.1}
                                                ItemSeparatorComponent={() => {
                                                    return (
                                                        <View></View>
                                                    )
                                                }}
                                            />
                                        )
                                    }
                                } else {
                                    return ( // 未选择发型师
                                        <View style={staffQueueStyles.WorksEmptyBox}>
                                            <Image resizeMethod="resize"
                                                   source={require('@imgPath/staff_queue_no_select.png')}
                                                   style={staffQueueStyles.staffEmptyImg}/>
                                        </View>
                                    )
                                }
                            })()
                        }
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

export const StaffQueueActivity = connect(mapStateToProps)(
    StaffQueueView
);
