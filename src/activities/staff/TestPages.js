import React, {useState} from 'react';
import {FlatList, Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {staffQueueStyles} from '../../styles';
import {testPagesStyles} from '../../styles';
import {connect} from 'react-redux';
import {AppConfig} from "../../utils";
import {fetchStaffList, fetchWorksList} from '../../services';
import {HeadeOrderInfoRight, PriceSwiper, StarRating} from "../../components";
import Toast from "react-native-root-toast";
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";

export class TestPagesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            staffList: [],
            worksList: [{},{},{},{},{},{},{}],
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            pageSize: 40,
            pageNo: 1,
            staffSelected: undefined
        };
        // const [num, setNum] = useState(0);
        // const [distance, setDistance] = useState(0);
    }

     handleTransform (type) {
         // this.setState({
         //     isLoading: true
         // })
        let dom = document.getElementById('box_lunbo');
        let innerWidth = window.innerWidth;
        let domReact = dom && dom.getBoundingClientRect();
        console.log('dom', domReact, innerWidth);

        let _distance = distance;
        // 判断是否支持滑动
        if (domReact?.width < innerWidth) {
            return;
        } else {
            // 判断是否支持向右滑动
            if (domReact?.x < 0) {
                if (type === 'right') {
                    console.log('向右滑动');
                    _distance = distance + 150;
                    console.log('_distance', _distance);


                    dom.style.transform = `translateX(${_distance}px`;
                    setNum(num + 1)

                    setDistance(_distance);

                }
            }

            // 判断是否支持向左滑动
            if (domReact?.right - innerWidth > 0) {
                if (type === 'left') {
                    console.log('向左滑动');
                    console.log('_distance', _distance);

                    _distance = distance - 150;
                    dom.style.transform = `translateX(${_distance}px`;
                    setNum(num - 1);

                    setDistance(_distance);


                }
            }
        }
    }
    componentDidMount() {
        // 右侧按钮
        let {navigation} = this.props
        navigation.setOptions({
            headerRight: () =>  (
                <TouchableOpacity onPress={()=>{
                    this.toCashier()
                }}>
                    <View style={staffQueueStyles.cashierBtn}>
                        <Text style={staffQueueStyles.cashierBtnTxt}>立即开单</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        // 获取员工信息
        this.loadStaffs()
    }

    // 加载数据
    loadStaffs(){
        let self = this
        // 未知原因导致第二次进入页面loading无法消失
        self.setState({
            isLoading: true
        })

        // 开始获取门店列表
        let {storeId} = this.props.userInfo
        fetchStaffList(storeId, 'pop').then(res=>{
            let {code, data} = res
            if(code == '6000'){ // 数据请求成功
                let staffList = data.result

                // 处理员工信息
                staffList.forEach((staff, idx)=>{
                    staff.nickName = decodeURIComponent(staff.nickName)
                    staff.staffPhoto = staff.staffPhoto && staff.staffPhoto.length > 0 ? AppConfig.imageServer + staff.staffPhoto + '?imageView2/3/w/650/q/85' : AppConfig.defaultAvatar
                    staff.selected = idx == 0 ? 'selected': ''
                })

                let staffSelected = staffList[0]
                this.setState({
                    staffList,
                    staffSelected
                }, ()=>{
                    // 加载第一位员工的作品
                    self.loadWorks(true)
                })
            }else{
                this.loadError()
            }
        }).catch(e=>{
            console.error("获取员工列表错误", e)
            this.loadError()
        }).finally(e=>{
            self.setState({
                isLoading: false
            })
        })
    }

    // 错误提醒
    loadError(){
        this.setState({
            isLoading: false
        })

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

    // 选择员工
    selectedStaff(index){
        const {staffList} = this.state
        staffList.forEach(staff=>{
            staff['selected'] = ''
        })
        staffList[index]['selected'] = 'selected'

        // 更新状态
        const staffSelected = staffList[index]
        this.setState((prevState, props) => {
            return {...prevState, staffList, worksList: [], staffSelected};
        }, ()=>{
            this.loadWorks(true)
        });
    }

    // 获取员工作品列表
    loadWorks(refresh){
        let self = this
        let {pageSize, pageNo, worksList, staffSelected} = this.state

        if(refresh){
            pageSize = 40
            pageNo = 1
            worksList = []
        }

        self.setState({
            isLoading: true,
            pageNo
        }, ()=>{
            staffSelected && fetchWorksList(staffSelected.staffAppUserId, pageNo, pageSize).then(res=>{
                let {code, data} = res
                if(code == '6000'){ // 数据请求成功
                    let worksData = data.result

                    // 处理员工信息
                    worksData && worksData.forEach((item, idx)=>{
                        let originalBlogDetail = item.originalBlogDetail
                        if(originalBlogDetail){
                            let imgUrls = originalBlogDetail.imgUrls || ""
                            item.imgUrls = imgUrls
                            item.showImg = originalBlogDetail.showImg
                            item.contentType = originalBlogDetail.contentType
                            item.videoUrl = originalBlogDetail.videoUrl
                            item.shortVideoUrl = originalBlogDetail.shortVideoUrl
                            item.videoResolution = originalBlogDetail.videoResolution
                        }

                        // 处理图片
                        item.showImg = AppConfig.imageServer + item.showImg + "?imageMogr2/auto-orient/thumbnail/!400x400r/crop/!400x400a0a0/sharpen/1"
                        item.imgUrls = item.imgUrls.split(",").map(item=>AppConfig.imageServer + item + "?imageView2/0/w/1024/q/95")
                        item.selected = ''
                        // 处理点赞数展示
                        item.countOfLike = this.convertNum(item.countOfLike)

                        // if(!item.systemSource){
                        //      worksList.push(item)
                        // }
                    })

                    this.setState({
                        worksList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
                    });
                }else{
                    this.loadError()
                }
            }).catch(e=>{
                console.error("获取员工列表错误", e)
                this.loadError()
            }).finally(e=>{
                self.setState({
                    isLoading: false
                })
            })
        })
    }
    onChangePriceItem = index => {
        console.log(index);
        var price = this.state.staffList[index];
        setTimeout(
            () =>
                this.setState({
                    currentPriceContent: price.content,
                    currentIndex: index,
                }),
            200
        );
    };

    // 选择作品
    // selectedWork(index){
    //     let self = this
    //     let checkedWork
    //     let {worksList, staffSelected} = self.state
    //     worksList.forEach((item, idx)=>{
    //         item.selected = idx == index ? 'selected':''
    //     })
    //
    //     this.setState({worksList}, ()=>{
    //         // 跳转参数
    //         let params = {
    //             workInfo: worksList[index],
    //             staffInfo: staffSelected
    //         }
    //         // 页面跳转
    //         AppNavigate.navigate('StaffWorksActivity', params)
    //     })
    // }

    // 加载更多
    loadMore = () => {
        let pageNo = this.state.pageNo + 1
        this.setState({pageNo}, ()=>{
            let {staffSelected} = this.state
            staffSelected && this.loadWorks()
        })
    }

    toCashier(){
        AppNavigate.navigate('CashierActivity')
    }

    // 转换点赞
    convertNum = (num) =>{
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

    render() {
        const {isLoading, staffList, worksList} = this.state
        // 单员工渲染
        const renderStaffItem = ({ item, index }) => (
            <TouchableOpacity onPress={()=>{ this.selectedStaff(index) }}>
                <View style={testPagesStyles.itemCell}>
                    <View style={item.selected == 'selected' ? testPagesStyles.itemSelectedCellWrap:testPagesStyles.itemCellWrap}>
                        <Image style={testPagesStyles.itemLeft} source={{uri: item.staffPhoto}} resizeMethod="resize"/>
                        <View style={testPagesStyles.itemRight}>
                            {/*人气值*/}
                            <View style={testPagesStyles.popularityBox}>
                                <Image resizeMethod="resize" source={require('@imgPath/icon-popularity.png')} style={testPagesStyles.iconPopularity}/>
                                <Text style={testPagesStyles.popularityTxt}>
                                    人气值:{item.popCount}
                                </Text>
                            </View>
                            {/*基础信息*/}
                            <View style={testPagesStyles.itemInfo}>
                                <Text style={testPagesStyles.NickName}>{item.nickName}</Text>
                                <Text style={testPagesStyles.PositionName}>{item.positionName}</Text>
                                <StarRating score={item.score}></StarRating>
                            </View>
                            {/*价格*/}
                            <View style={testPagesStyles.priceBox}>
                                {
                                    item.servicePrice ? (
                                        <View style={testPagesStyles.priceWrap}>
                                            <Text style={testPagesStyles.priceTxt}>¥{item.servicePrice}</Text>
                                            <Text style={testPagesStyles.priceDesc}>(洗剪吹)</Text>
                                        </View>
                                    ): <View></View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

        // 作品渲染
        const renderWorkItem = ({ item, index }) => (
            <TouchableOpacity onPress={()=>{ this.selectedWork(index) }}>
                <View className="swiper-wrapper">
                    <View style={index == this.state.worksList.length - 1 ? testPagesStyles.lastChild:testPagesStyles.normalChild}>
                        <View style={item.selected == 'selected' ? testPagesStyles.workSelectedCell:testPagesStyles.workCell }>
                            <Image style={testPagesStyles.workImg} source={{uri: item.showImg}} resizeMethod="resize" resizeMode={'contain'}/>
                            {
                                item.contentType == 1 && (
                                    <Image style={testPagesStyles.videoImg}
                                           resizeMethod="resize"
                                           source={{uri: 'http://pic.magugi.com/0f98d3833dc94fa7457567baaab6ea4c'}}
                                    />)
                            }
                            <View style={testPagesStyles.likeCountBox}>
                                <Image resizeMethod="resize" source={require('@imgPath/icon-like.png')} style={testPagesStyles.likeCountImg}/>
                                <Text style={testPagesStyles.likeCountTxt}>{item.countOfLike}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

        // 总视图
        return (
            <View style={testPagesStyles.content}>
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View style={testPagesStyles.containerList}>
                    <View style={testPagesStyles.ListHeader}>
                        <Text style={testPagesStyles.HeaderTxt}>设计师</Text>
                    </View>
                    <View style={testPagesStyles.StylistBox} id='box_lunbo'>
                        <TouchableOpacity style={testPagesStyles.StylistList} onPress={() => this.handleTransform('left')}>
                            <View ><Image resizeMethod="resize" source={require('@imgPath/icon-popularity.png')} style={testPagesStyles.SlideBtnLeft} /></View>
                        </TouchableOpacity>
                        <FlatList
                            style={testPagesStyles.StylistListBox}
                            data={staffList}
                            renderItem={renderStaffItem}
                            keyExtractor={(item, index) => index}
                            numColumns={1}
                            horizontal={true}
                            ItemSeparatorComponent={()=>{
                                return (
                                    <View></View>
                                )
                            }}
                            ListEmptyComponent={()=>{
                                return (
                                    <View style={staffQueueStyles.ListEmptyBox}>
                                        <Text>请配置发型师预约时间</Text>
                                    </View>
                                )
                            }}
                        />
                        <TouchableOpacity style={testPagesStyles.StylistList} onPress={() => this.handleTransform('right')}>
                            <View ><Image resizeMethod="resize" source={require('@imgPath/icon-popularity.png')} style={testPagesStyles.SlideBtnRight} /></View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={testPagesStyles.containerWorks}>
                    <View style={testPagesStyles.WorksBox}>
                        {
                            worksList.length < 1 ?
                                (
                                    // 无作品
                                    <View style={testPagesStyles.WorksEmptyBox}>
                                        <Image resizeMethod="resize" source={require('@imgPath/works_empty.png')} style={staffQueueStyles.WorksEmptyImg}/>
                                    </View>
                                )
                                :
                                (
                                    // 有作品
                                    <FlatList
                                        style={testPagesStyles.WorksListBox}
                                        data={worksList}
                                        renderItem={renderWorkItem}
                                        keyExtractor={(item, index) => index}
                                        numColumns={6}
                                        onEndReached={this.loadMore}
                                        onEndReachedThreshold={0.1}
                                        ItemSeparatorComponent={()=>{
                                            return (
                                                <View></View>
                                            )
                                        }}
                                    />
                                )
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

export const TestPages = connect(mapStateToProps)(
    TestPagesView
);

