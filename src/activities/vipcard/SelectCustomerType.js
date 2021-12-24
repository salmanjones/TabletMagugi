import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  InteractionManager,
  Alert,
} from 'react-native';
import {
  BottomCopyModule,
  ModalMemberIndentify,
  ModalCreateMember,
  ModalLoadingIndicator,
} from '../../components';
import { PixelUtil, displayError } from '../../utils';
import { selectCustomerTypeStyles } from '../../styles';
import { fetchMemberNO } from '../../services';

export class SelectCustomerType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '',
      oper: 'addAndCard',
      isFetchMemberNoPending: false,
      memberNo: '',
    };
  }

  onConfirm = (member , oper) => {
    const { navigation } = this.props;

    if(oper == 'add'){
      this.setState({ visible: false , oper: ""});
    }else{
        this.setState({ visible: false , oper: ""});

        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('VipcardActivity', {
              type: 'vip',
              member: member,
            });
        });
    }
  };

  onCancel = () => {
    this.setState({
      visible: '',
    });
  };

  onCreateMember (oper){
    let that = this;
    that.setState({
      isFetchMemberNoPending: true,
    });

    fetchMemberNO()
      .then(res => {
        that.setState({
          isFetchMemberNoPending: false,
          visible: 'create',
          oper: oper,
          memberNo: res.data,
        });
      })
      .catch(err => {
        that.setState({
          isFetchMemberNoPending: false,
        });
        displayError(err, '获取会员号码异常');
      });
  };

  render() {
    const { visible, isFetchMemberNoPending, memberNo,oper } = this.state;
    return (
      <View style={selectCustomerTypeStyles.container}>
        {isFetchMemberNoPending && <ModalLoadingIndicator />}

        <ModalMemberIndentify
          navigation={this.props.navigation}
          visible={visible === 'indentify'}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
        />

        <ModalCreateMember
          navigation={this.props.navigation}
          visible={visible === 'create'}
          memberNo={memberNo}
          oper={oper}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
        />

        <View style={selectCustomerTypeStyles.openOrderBox}>
          <TouchableOpacity
              style={selectCustomerTypeStyles.orderGenre}
              onPress={this.onCreateMember.bind(this,'add')}>
            <Image resizeMethod="resize"
                   source={require('@imgPath/add_vip.png')}
                   style={{
                     width: PixelUtil.rect(376, 376).width,
                     height: PixelUtil.rect(376, 376).height,
                     resizeMode: 'contain',
                   }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={selectCustomerTypeStyles.orderGenre}
            onPress={this.onCreateMember.bind(this , 'addAndCard')}>
            <Image resizeMethod="resize"
              source={require('@imgPath/individual-card.png')}
              style={{
                width: PixelUtil.rect(376, 376).width,
                height: PixelUtil.rect(376, 376).height,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={selectCustomerTypeStyles.orderGenre}
            onPress={() => this.setState({ visible: 'indentify' })}>
            <Image resizeMethod="resize"
              source={require('@imgPath/member-card.png')}
              style={{
                width: PixelUtil.rect(376, 376).width,
                height: PixelUtil.rect(376, 376).height,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

        </View>
        <BottomCopyModule />
      </View>
    );
  }
}
