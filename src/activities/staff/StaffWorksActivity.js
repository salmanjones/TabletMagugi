import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {staffWorksStyles} from '../../styles';
import {connect} from 'react-redux';
import Swiper from "react-native-web-swiper";
import {AppNavigate} from "../../navigators";
import Video from "react-native-video";
import Toast from "react-native-root-toast";


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
        }, ()=>{
            AppNavigate.navigate('CashierActivity')
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
        let {workInfo, staffInfo, showVideo} = this.state
        // 总视图
        return (
            <View style={staffWorksStyles.content}>
                {
                    showVideo && workInfo.contentType == 1 ?
                        (
                            <Video source={{uri: workInfo.videoUrl}}
                                   ref={(ref) => {_mediaPlayer = ref}}
                                   onBuffer={this.onBuffer}
                                   onError={this.videoError}
                                   poster={workInfo.showImg}
                                   repeat={true}
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
                    <View style={staffWorksStyles.footerRight}>
                        <TouchableOpacity onPress={()=>{
                            this.toCashier()
                        }}>
                            <View style={staffWorksStyles.cashierBtn}>
                                <Text style={staffWorksStyles.cashierBtnTxt}>立即开单</Text>
                            </View>
                        </TouchableOpacity>
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
