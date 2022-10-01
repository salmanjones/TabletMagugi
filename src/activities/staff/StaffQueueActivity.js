import React from 'react';
import {FlatList, Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {staffQueueStyles} from '../../styles';
import {connect} from 'react-redux';
import {AppConfig} from "../../utils";
import {fetchStaffList, fetchWorksList} from '../../services';
import {StarRating} from "../../components";
import Toast from "react-native-root-toast";
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";

export class StaffQueueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            staffList: [],
            worksList: [],
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            pageSize: 20,
            pageNo: 1,
            staffSelected: undefined
        };
    }

    componentDidMount() {
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
            pageSize = 20
            pageNo = 1
            worksList = []
        }

        self.setState({
            isLoading: true,
            pageNo
        }, ()=>{
            fetchWorksList(staffSelected.staffAppUserId, pageNo, pageSize).then(res=>{
                let {code, data} = res
                if(code == '6000'){ // 数据请求成功
                    let worksData = data.result

                    // 处理员工信息
                    worksData.forEach((item, idx)=>{
                        let originalBlogDetail = item.originalBlogDetail
                        if(originalBlogDetail){
                            let imgUrls = originalBlogDetail.imgUrls || ""
                            item.imgUrls = imgUrls
                            item.showImg = originalBlogDetail.showImg
                            item.contentType = originalBlogDetail.contentType
                            item.videoUrl = originalBlogDetail.videoUrl
                            item.shortVideoUrl = originalBlogDetail.shortVideoUrl
                            item.videoResolution = originalBlogDetail.videoResolution
                            item.contentType = originalBlogDetail.contentType
                        }

                        // 处理图片
                        item.showImg = AppConfig.imageServer + item.showImg + "?imageView2/1/w/400/h/400"
                        item.selected = ''

                        // 放入数组
                        worksList.push(item)
                    })

                    this.setState({
                        worksList
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

    // 选择作品
    selectedWork(index){
        let self = this
        let {worksList} = self.state
        worksList.forEach((item, idx)=>{
            item.selected = idx == index ? 'selected':''
        })
        this.setState({worksList}, ()=>{

        })
    }

    // 加载更多
    loadMore = () => {
        let pageNo = this.state.pageNo + 1
        this.setState({pageNo}, ()=>{
            let {staffSelected} = this.state
            console.log(staffSelected.staffAppUserId, pageNo)
            staffSelected && this.loadWorks()
        })
    }

    render() {
        const {isLoading, staffList, worksList} = this.state

        // 单员工渲染
        const renderStaffItem = ({ item, index }) => (
            <TouchableOpacity onPress={()=>{ this.selectedStaff(index) }}>
                <View style={staffQueueStyles.itemCell}>
                    <View style={item.selected == 'selected' ? staffQueueStyles.itemSelectedCellWrap:staffQueueStyles.itemCellWrap}>
                        <Image style={staffQueueStyles.itemLeft} source={{uri: item.staffPhoto}} resizeMethod="resize"/>
                        <View style={staffQueueStyles.itemRight}>
                            {/*人气值*/}
                            <View style={staffQueueStyles.popularityBox}>
                                <Image resizeMethod="resize" source={require('@imgPath/icon-popularity.png')} style={staffQueueStyles.iconPopularity}/>
                                <Text style={staffQueueStyles.popularityTxt}>
                                    人气值:{item.popCount}
                                </Text>
                            </View>
                            {/*基础信息*/}
                            <View style={staffQueueStyles.itemInfo}>
                                <Text style={staffQueueStyles.NickName}>{item.nickName}</Text>
                                <Text style={staffQueueStyles.PositionName}>{item.positionName}</Text>
                                <StarRating score={item.score}></StarRating>
                            </View>
                            {/*价格*/}
                            <View style={staffQueueStyles.priceBox}>
                                {
                                    item.servicePrice ? (
                                        <View style={staffQueueStyles.priceWrap}>
                                            <Text style={staffQueueStyles.priceTxt}>¥{item.servicePrice}</Text>
                                            <Text style={staffQueueStyles.priceDesc}>(洗剪吹)</Text>
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
                <View style={index == this.state.worksList.length - 1 ? staffQueueStyles.lastChild:staffQueueStyles.normalChild}>
                    <View style={item.selected == 'selected' ? staffQueueStyles.workSelectedCell:staffQueueStyles.workCell }>
                        <Image style={staffQueueStyles.workImg} source={{uri: item.showImg}} resizeMethod="resize" resizeMode={'contain'}/>
                        {
                            item.contentType == 1 && (
                                <Image style={staffQueueStyles.videoImg}
                                       resizeMethod="resize"
                                       source={{uri: 'http://pic.magugi.com/0f98d3833dc94fa7457567baaab6ea4c'}}
                                />)
                        }
                        <View style={staffQueueStyles.likeCountBox}>
                            <Image resizeMethod="resize" source={require('@imgPath/icon-like.png')} style={staffQueueStyles.likeCountImg}/>
                            <Text style={staffQueueStyles.likeCountTxt}>{item.countOfLike}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
                <View style={staffQueueStyles.containerList}>
                    <View style={staffQueueStyles.ListHeader}>
                        <Text style={staffQueueStyles.HeaderTxt}>发型师</Text>
                    </View>
                    <FlatList
                        style={staffQueueStyles.ListBox}
                        data={staffList}
                        renderItem={renderStaffItem}
                        keyExtractor={(item, index) => index}
                        numColumns={1}
                        ItemSeparatorComponent={()=>{
                            return (
                                <View></View>
                            )
                        }}
                    />
                </View>
                <View style={staffQueueStyles.containerWorks}>
                    <View style={staffQueueStyles.WorksHeader}>
                        <Text style={staffQueueStyles.HeaderTxt}>作品</Text>
                    </View>
                    <View style={staffQueueStyles.WorksBox}>
                        {
                            worksList.length < 1 ?
                            (
                                // 无作品
                                <View style={staffQueueStyles.WorksEmptyBox}>
                                    <Image resizeMethod="resize" source={require('@imgPath/works_empty.png')} style={staffQueueStyles.WorksEmptyImg}/>
                                </View>
                            )
                            :
                            (
                                // 有作品
                                <FlatList
                                    style={staffQueueStyles.WorksListBox}
                                    data={worksList}
                                    renderItem={renderWorkItem}
                                    keyExtractor={(item, index) => index}
                                    numColumns={4}
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

export const StaffQueueActivity = connect(mapStateToProps)(
    StaffQueueView
);
