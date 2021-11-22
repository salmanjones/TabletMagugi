import { StyleSheet } from 'react-native';
import { PixelUtil } from 'utils';

export const cardInfoStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000060',
  },
  cashierBillInfoWrapper: {
    backgroundColor: '#FFF',
    height: '89%',
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: PixelUtil.size(165),
    overflow:'hidden',
    position: 'relative',
  },
  containerStyle: {
    width: PixelUtil.rect(480, 68).width,
    height: PixelUtil.rect(480, 68).height,
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 0,
    marginTop: PixelUtil.size(22),
    marginBottom: PixelUtil.size(26),
  },
  MemberQueryContainer: {
    width: PixelUtil.size(1968),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonStyle: {
    width: PixelUtil.rect(172, 68).width,
    height: PixelUtil.rect(172, 68).height,
    marginRight: PixelUtil.size(40),
    backgroundColor: '#fff',
    borderRadius: PixelUtil.size(200),
  },
  selectedButtonStyle: {
    width: PixelUtil.rect(172, 68).width,
    height: PixelUtil.rect(172, 68).height,
    backgroundColor: '#111c3c',
    borderRadius: PixelUtil.size(200),
  },
  textStyle: {
    fontSize: PixelUtil.size(32),
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: PixelUtil.size(32),
    color: '#fff',
  },
  titleBox: {
    width: PixelUtil.rect(1968, 116).width,
    height: '10%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: PixelUtil.size(2),
    backgroundColor: '#fff',
  },
  cardInfoBox: {
    backgroundColor: '#fff',
    width: '100%',
    height: '76.96%',
  },
  cardImg: {
    //储值卡
    width: '100%',
    height: '37.45%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PixelUtil.size(20),
  },
  cardInfoItemBox: {
    width: '100%',
    height: '62.55%',
    paddingLeft: PixelUtil.size(60),
    paddingRight: PixelUtil.size(60),
  },
  cardInfo: {
    //信息
    width: '100%',
    height: '33.3%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomColor: '#CFDDFF',
    borderBottomWidth: PixelUtil.size(2),
  },
  cardInfoLast: {
    //信息
    width: '100%',
    height: '33.3%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfoItem: {
    //信息-项
    width: '18%',
    height: '100%',
    overflow: 'hidden',
  },
  cardInfoDiscount: {
    width: '38.4%',
    height: '100%',
    overflow: 'hidden',
  },
  cardInfoNote: {
    //信息-备注
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  cardInfoText: {
    //信息-文字
    height: PixelUtil.size(45),
    fontSize: PixelUtil.size(32),
    color: '#333',
    textAlign: 'left',
    marginTop: PixelUtil.size(12),
    overflow: 'hidden',
  },
  MemberQueryBtnBox: {
    //操作区域
    width: '100%',
    height: '13%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: PixelUtil.size(2),
    borderTopColor: '#cbcbcb',
  },
});
