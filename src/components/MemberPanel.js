import {Animated, Image, LogBox, PanResponder, TouchableOpacity, View} from "react-native";
import {PixelUtil} from "../utils";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {MemberPanelStyles} from "../styles/MemberPanel";

/**
 * 会员右滑组件
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const MemberPanelForwardRef = forwardRef((props, refArgs) => {
    // 左滑动画
    const animateLeft = new Animated.Value(PixelUtil.screenSize.width - PixelUtil.size(120));
    const [animateState, setAnimateState] = useState({
        sliderShow: false,
        sliderLeft: animateLeft
    })
    // 屏蔽动画警告
    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

    // 手势处理
    const panResponder = PanResponder.create({
        // 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        // 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互: 需要注意，当水平位移大于10时，才进行后面的操作，不然可能是点击事件
        onMoveShouldSetPanResponder(evt, gestureState) {
            if (gestureState.dx > 10 && Math.abs(gestureState.dy) < 5){ // 右滑手势
                return true;
            }else {
                return false;
            }
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: ()=>{
            // 最近一次的移动距离为gestureState.move{X,Y}
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        // 滑动响应
        onPanResponderGrant: (evt, gestureState) => {
            hideRightPanel()
        },
        onPanResponderRelease: (evt, gestureState) => {
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            return true;
        }
    });

    /// 展示面板
    const showRightPanel = () => {
        Animated.timing(animateState.sliderLeft, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        setAnimateState({
            ...animateState,
            sliderShow: true
        })
    }

    /// 隐藏面板
    const hideRightPanel = () => {
        Animated.timing(animateState.sliderLeft, {
            toValue: animateLeft,
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            setAnimateState({
                ...animateState,
                sliderShow: false
            })
        });
    }

    /// 向父组件开放方法
    useImperativeHandle(refArgs, () => ({
        showRightPanel,
        hideRightPanel
    }))

    return (
        <View style={animateState.sliderShow ? MemberPanelStyles.rightPanelMask: {display: 'none'}}>
            <Animated.View
                {...panResponder.panHandlers}
                style={animateState.sliderShow ? [MemberPanelStyles.rightPanelBox, {left: animateState.sliderLeft}] : {display: 'none'}}>
                {/*左侧点击区域*/}
                <TouchableOpacity onPress={()=>{hideRightPanel()}}
                                  activeOpacity={1}
                                  style={MemberPanelStyles.leftPanMask}>
                    <View style={MemberPanelStyles.hideIconBox}>
                        <TouchableOpacity onPress={()=>{hideRightPanel()}}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/p-hide-box.png')}
                                   style={[MemberPanelStyles.hideIconButton, {resizeMode: 'contain'}]}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {/*右侧*/}
                <View style={MemberPanelStyles.memberWrapBox}>
                </View>
            </Animated.View>
        </View>
    )
})

// 使用React.memo渲染缓存，防止父组件属性变更导致子组件渲染
export default React.memo(MemberPanelForwardRef)
