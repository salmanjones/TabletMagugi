// 价目单首页
import { StyleSheet ,Platform } from 'react-native';
import { PixelUtil } from '../utils';

export const priceIndexStyle = StyleSheet.create({
    bgBox:{
        display: 'flex',
        position: 'relative',
    },
    //价目单-目录
    catalogViewBox:{
        marginRight: PixelUtil.size(40),
        height: PixelUtil.size(110),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    catalogView:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: PixelUtil.size(108),
    },
    catalogImg:{
        width: PixelUtil.rect(40, 32).width,
        height: PixelUtil.rect(40, 32).height,
    },
    catalogText: {
        marginTop: PixelUtil.size(6),
        fontSize: PixelUtil.size(26),
        color: '#fff',
    },
    //价目单-首页
    indexBox:{
        position: 'relative',
    },
    swiperLi:{
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    labelBox:{
        position: 'absolute',
        left: PixelUtil.size(78),
        top: PixelUtil.size(52),
        height: PixelUtil.size(90),
        paddingLeft:PixelUtil.size(34),
        paddingRight:PixelUtil.size(34),
        borderRadius: PixelUtil.size(50),
        backgroundColor: 'rgba(0,0,0,.4)',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    labelText:{
        fontSize: PixelUtil.size(50),
        color: '#fff',
    },
    indexImg:{
        width: '100%',
        height: '100%',
    },
    tipTextBox:{
        paddingBottom: PixelUtil.size(24),
        paddingTop: PixelUtil.size(24),
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 99,
        width: '100%',
    },
    tipText:{
        fontSize: PixelUtil.size(30),
        lineHeight: PixelUtil.size(50),
        color: '#fff',
        textAlign: 'justify',
    },
    // 轮播图-左右按钮
    nextButton:{
        width: PixelUtil.rect(130, 130).width,
        height: PixelUtil.rect(130, 130).height
    },
    // 购物车-动画框
    rightPositionBox:{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top:0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 2
    },
    rightPositionBoxShow:{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        left:0,
        top:0,
        backgroundColor: 'rgba(0,0,0,.5)',
        flexDirection: 'row',
        zIndex: 1
    },
    rightPositionBoxO:{
        flex: 0,
        width: '50%',
        height: '100%',
        position: 'absolute',
        left:0,
        top:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor:'transparent',
        zIndex: 3
    },
    rightPositionTitleB:{
        width: PixelUtil.rect(120, 346).width,
        height: PixelUtil.rect(120, 346).height,
        position:'absolute',
        right: 0,
        top: PixelUtil.size(60),
    },
    rightPositionT:{
        width: PixelUtil.rect(120, 170).width,
        height: PixelUtil.rect(120, 170).height,
        backgroundColor: 'rgba(0,0,0,0.50)',
        borderTopLeftRadius: PixelUtil.size(10),
        borderBottomLeftRadius: PixelUtil.size(10),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightPositionImgB:{
        width: PixelUtil.rect(60, 60).width,
        height: PixelUtil.rect(60, 60).height,
        position: 'relative',
        marginBottom:PixelUtil.size(8)
    },
    rightImg:{
        width: PixelUtil.rect(60, 60).width,
        height: PixelUtil.rect(60, 60).height,
    },
    rightTextBox:{
        position: 'absolute',
        top:  PixelUtil.size(-10),
        right: PixelUtil.size(-10),
        zIndex: 2,
        width: PixelUtil.rect(36, 36).width,
        height: PixelUtil.rect(36, 36).height,
        backgroundColor: '#FF7149',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: PixelUtil.size(18)
    },
    rigthNum:{
        fontSize: PixelUtil.size(24),
        color: '#fff',

    },
    rightText:{
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    rightPositionB:{
        marginTop: PixelUtil.size(6),
        width: PixelUtil.rect(120, 170).width,
        height: PixelUtil.rect(120, 170).height,
        backgroundColor: 'rgba(0,0,0,0.50)',
        borderTopLeftRadius: PixelUtil.size(10),
        borderBottomLeftRadius: PixelUtil.size(10),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // 右浮内容
    rightAnBox:{
        flex: 0,
        width: '50%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        zIndex: 4,
        backgroundColor: 'cyan'
    },
    hideBox:{
        width: PixelUtil.rect(84, 168).width,
        height: PixelUtil.rect(84, 168).height,
    },
    hideBtn:{
        width: PixelUtil.rect(84, 168).width,
        height: PixelUtil.rect(84, 168).height,
    },

    trolleyBox:{
        width: '100%',
        height: '100%',
        backgroundColor: '#f4f4f4',
    },
    trolleyTitleBox:{
        width: '100%',
        height: '10%',
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth:PixelUtil.size(1),
        borderBottomColor: '#e9e9e9',
        flexShrink: 0,
    },
    trolleyTitleLi:{
        width: '50%',
        height: '100%',
        flexShrink:0,
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    trolleyTitle:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    trolleyTitleLine:{
        width: PixelUtil.size(2),
        height: PixelUtil.size(60),
        backgroundColor: '#dbdbdb',
        position: 'absolute',
        left: '50%',
    },
    rigthTrolleyNum:{
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
        marginLeft: PixelUtil.size(14),
    },
    // 价目列
    jmTrolleyBox:{
        width: '100%',
        height:'100%'
    },
    jmTrolleyLi:{
        marginTop: PixelUtil.size(20),
        height: PixelUtil.size(250),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: PixelUtil.size(30),
        paddingBottom: PixelUtil.size(30),
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
        backgroundColor: '#fff',
        borderRadius: PixelUtil.size(20),
        marginLeft:PixelUtil.size(20),
        marginRight: PixelUtil.size(20)
    },
    jmTrolleyLiL:{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
    },
    jmTrolleyLiLImg:{
        width: PixelUtil.rect(255, 190).width,
        height: PixelUtil.rect(255, 190).height,
        marginRight: PixelUtil.size(20),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(1)
    },
    jmTrolleyLiLRight:{
        width: '60%',
        height: PixelUtil.size(180),
        paddingTop: PixelUtil.size(10),
        flex: 0,
        justifyContent: 'space-between',
    },
    jmTrolleyLiLText:{
        fontSize: PixelUtil.size(30),
        color: '#333',
        textAlign: 'justify'
    },
    jmTrolleyPrice:{
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    jmTrolleyLiR:{
        height: '100%',
        width: '25%',
        flex: 0,
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    jmTrolleyLiRO:{
        height: '100%',
        width: '25%',
        flex: 0,
        justifyContent: 'center',
        alignItems:'center',
    },
    jmTrolleyLiRText:{
        fontSize: PixelUtil.size(30),
        color: '#F98F1F',
    },
    jmOperateBtn:{
        width: PixelUtil.rect(216, 60).width,
        height: PixelUtil.rect(216, 60).height,
    },
    // 购物车
    trolleyBody:{
        width:'100%',
        height:'90%',
    },
    gmTrolleyBox:{
        flex: 1,
    },
    gmTrolleyBoxT:{
        width:'100%',
        height:'90.34%',
    },
    gmTrolleyLiR:{
        height: '100%',
        width: '25%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    jmTrolleyLiRBtnL:{
        width: PixelUtil.rect(60, 60).width,
        height: PixelUtil.rect(60, 60).height,
        borderWidth: PixelUtil.size(2),
        borderColor: '#ccc',
        borderRightWidth: 0,
        flex: 0,
        justifyContent: 'center',
        alignItems:'center',
    },
    jmTrolleyLiRBtnR:{
        width: PixelUtil.rect(60, 60).width,
        height: PixelUtil.rect(60, 60).height,
        borderWidth: PixelUtil.size(2),
        borderColor: '#ccc',
        borderLeftWidth: 0,
        flex: 0,
        justifyContent: 'center',
        alignItems:'center',
    },
    jmTrolleyLiRBtnText:{
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
    },
    openCardTextInput:{
        height: PixelUtil.size(60),
        width: '45.46%',
        borderWidth: PixelUtil.size(2),
        borderColor: '#ccc',
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
        paddingTop: 0,
        paddingBottom: 0,
    },
    gmTrolleyBoxB:{
        height: PixelUtil.size(120),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
        borderTopColor: '#e9e9e9',
        borderTopWidth: PixelUtil.size(1),
        backgroundColor: '#fff',
        position: 'absolute',
        bottom:0,
        left: 0,
        width: '100%',
    },
    totalText:{
        fontSize: PixelUtil.size(30),
        color: '#333',
    },
    btmRight:{
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deletrBox:{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    delelteImg:{
        width: PixelUtil.rect(32, 38).width,
        height: PixelUtil.rect(32, 38).height,
        marginRight: PixelUtil.size(9),
    },
    deleteText:{
        fontSize: PixelUtil.size(32),
        color: '#ff4444',
    },
    gmBtnBox:{
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        borderRadius: PixelUtil.size(34),
        flex: 0,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#111c3c',
        marginLeft: PixelUtil.size(50),
    },
    btnText:{
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },

    // 弹层样式
    modalBackground:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width:'100%',
        height:'100%',
        position:'absolute',
        zIndex:9999,
    },
    rotateWrapper:{
      backgroundColor: '#fff',
	  width: '96.094%',
	  height: '85%',
	  overflow: 'hidden',
	  position: 'relative',
	  marginTop: PixelUtil.size(120),
    },
    rotateModalTitle:{
        width: '100%',
        height: PixelUtil.size(116),
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    modalTitleO:{
        width: PixelUtil.rect(100, 116).width,
        height: PixelUtil.rect(100, 116).height,
        position: 'absolute',
        right: 0,
        top: 0,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hideImage:{
        width: PixelUtil.size(35),
		height: PixelUtil.size(35),
    },
    // 弹层标题
    modalTitle:{
        width: PixelUtil.rect(168, 68).width,
        height: PixelUtil.rect(168, 68).height,
        backgroundColor: '#fff',
        borderRadius: PixelUtil.size(34),
        marginRight: PixelUtil.size(32),
    },
    // 弹层标题-选中
    modalTitleAct:{
        width: PixelUtil.rect(168, 68).width,
        height: PixelUtil.rect(168, 68).height,
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(34),
        marginRight: PixelUtil.size(32),
    },
    modalTitleBox:{
        width: PixelUtil.rect(168, 68).width,
        height: PixelUtil.rect(168, 68).height,
        flex:0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitleImg:{
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
        marginRight: PixelUtil.size(14)
    },
    modalTitleText:{
        fontSize: PixelUtil.size(32),
        color: '#111c3c'
    },
    modalTitleTextAct:{
        fontSize: PixelUtil.size(32),
        color: '#fff'
    },
    // 弹层内容
    // 左
    modalBody:{
        width: '100%',
        height: '90.6%',
        flex:0,
        flexDirection: 'row',
    },
    modalBodyL:{
        width: '84.25%',
    },
    modalLBox:{
        flex:1,
        flexDirection: 'row',
    },
    nullBox:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nullImg:{
        width: PixelUtil.size(264),
        height: PixelUtil.size(143),
    },
    nullImgO:{
        width: PixelUtil.size(334),
        height: PixelUtil.size(454),
    },
    nullText:{
        fontSize: PixelUtil.size(30),
        marginTop: PixelUtil.size(30),
        color: '#B4B4B4'
    },
    modalList:{
        width: '100%',
        height: Platform.OS === 'ios' ? '100%' : '96%',
        paddingTop: PixelUtil.size(58),
        paddingLeft: PixelUtil.size(90),
        paddingRight: PixelUtil.size(90),
    },
    modalLImgBox:{
        width: PixelUtil.rect(438, 292).width,
        height: PixelUtil.rect(438, 292).height,
        position: 'relative',
        marginRight: PixelUtil.size(60),
        marginBottom: PixelUtil.size(60),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(1),
    },
    modalLImgB:{
        width: PixelUtil.rect(436, 290).width,
        height: PixelUtil.rect(436, 290).height,
        backgroundColor: '#000'
    },
    modalLImg:{
        width: PixelUtil.rect(436, 290).width,
        height: PixelUtil.rect(436, 290).height,
    },
    labelTextBox:{
        backgroundColor: 'rgba(0,0,0,.4)',
        width: '100%',
        height: PixelUtil.size(70),
        flex:0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    labelTextO:{
        fontSize: PixelUtil.size(30),
        color: '#fff',
    },
    // 右
    modalBodyR:{
        width: '17.75%',
        height: '100%',
        borderLeftWidth: PixelUtil.size(2),
        borderLeftColor: '#cbcbcb',
    },
    modalRBox:{
        flex:1,
    },
    consumeOrderGenreLi: {
        //右边框-单据类型-列
        width: '89%',
        height: PixelUtil.rect(154, 150).height,
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(10),
        paddingRight:  PixelUtil.size(10),
      },
      consumeOrderGenreLiAct:{
          //右边框-单据类型-列-选中
        width: '89%',
        height: PixelUtil.rect(154, 150).height,
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(10),
        paddingRight:  PixelUtil.size(10),
        backgroundColor: '#dee8ff'
      },

      consumeOrderGenreText: {
        //右边框-单据类型-文字
        color: '#333',
        fontSize: PixelUtil.size(34),
        textAlign:'center'
      },
      consumeOrderGenreTextAct: {
        color: '#111c3c',
        fontSize: PixelUtil.size(34),
        textAlign:'center'
      },

});
