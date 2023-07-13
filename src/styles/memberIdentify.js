import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const memberIdentifyStyle = StyleSheet.create({
    cantioner: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    Body: {
        // 主体
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    Box: {
        // 左侧内容
        width:'50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        backgroundColor: '#fff',
    },
    MemberQueryBoxLeft: {
        // 搜索框
        marginLeft: PixelUtil.size(-40),
        marginBottom: PixelUtil.size(31),
    },
    ShowMemberCardBox: {
        // 右侧内容
        width: '100%',
        height: '100%',
        position: 'relative',
        // backgroundColor:'red'
    },
    noneCardBox: {
        //无卡展示
        width: '100%',
        height: '88%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noneCardImg: {
        //无卡图片
        width: '50%',
        height: '50%',
    },
    ShowMemberCardList: {
        // 右侧内容-主体
        width: '100%',
        height: '100%',
        paddingLeft: PixelUtil.size(8),
        paddingRight: PixelUtil.size(8),
        paddingTop: PixelUtil.size(18),
        paddingBottom: '4%'
    },
    ShowMemberCardOtherList: {
        // 右侧内容-主体
        width: '100%',
        height: '100%',
        paddingLeft: PixelUtil.size(8),
        paddingRight: PixelUtil.size(8),
        paddingTop: PixelUtil.size(18),
        marginBottom: '9.2%',
    },
    btnBoxB: {
        height: PixelUtil.size(108),
        width: '100%',
        borderBottomWidth: PixelUtil.size(1),
        borderBottomColor: '#cbcbcb',
        marginTop:PixelUtil.size(-10)
    },
    btnBox: {
        // 右侧按钮
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '50%',
        height: PixelUtil.size(106),
        // marginLeft: PixelUtil.size(-18),
    },
    rechargeBtnImg: {
        // 充值按钮
        height: PixelUtil.rect(172, 68).height,
        width: PixelUtil.rect(172, 68).width,
    },
    memberQueryBoxNone: {
        // 顾客识别-识别展示(无内容)
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    memberQueryNoneText: {
        // 顾客识别-识别展示(无内容)
        fontSize: PixelUtil.size(32),
        color: '#9c9c9c',
        marginTop: '25%',
    },
    // 当前等待
    waitTextBox: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        marginBottom: PixelUtil.size(30),
    },
    waitTextBoxImg: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    waitText: {
        fontSize: PixelUtil.size(30),
        color: '#8E8E8E',
    },
    waitRefreshText: {
        fontSize: PixelUtil.size(30),
        color: '#2A89E2',
        marginLeft: PixelUtil.size(11),
    },

    waitRefreshTextImage: {
        //顾客识别-列-信息-会员性别
        width: PixelUtil.rect(30, 30).width,
        height: PixelUtil.rect(30, 30).height,
    },
});
