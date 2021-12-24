// 轮牌设置弹层.
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  InteractionManager,
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { rotateBigModalStyle } from '../../styles';
import {
  PixelUtil,
} from 'utils';

export class SettingItem extends React.PureComponent {
    render() {
    return (
      <View style={rotateBigModalStyle.rotateModalBodyLRow}>
	  	<CheckBox
			center
			title='赵乐'
			checkedIcon='dot-circle-o'
			uncheckedIcon='dot-circle-o'
			containerStyle={rotateBigModalStyle.checkBoxContainer}
			textStyle={rotateBigModalStyle.rotateModalText}
			checkedColor={'#111c3c'}
			uncheckedColor={'#111c3c'}
			// checked={this.state.checked}
		/>
		<CheckBox
			center
			title='赵乐'
			checkedIcon='dot-circle-o'
			uncheckedIcon='circle-o'
			containerStyle={rotateBigModalStyle.checkBoxContainer}
			textStyle={rotateBigModalStyle.rotateModalText}
			checkedColor={'#111c3c'}
			uncheckedColor={'#999'}
			// checked={this.state.checked}
		/>
		<CheckBox
			center
			title='赵乐'
			checkedIcon='dot-circle-o'
			uncheckedIcon='circle-o'
			containerStyle={rotateBigModalStyle.checkBoxContainer}
			textStyle={rotateBigModalStyle.rotateModalText}
			checkedColor={'#111c3c'}
			uncheckedColor={'#999'}
			// checked={this.state.checked}
		/>
		<CheckBox
			center
			title='赵乐'
			checkedIcon='dot-circle-o'
			uncheckedIcon='circle-o'
			containerStyle={rotateBigModalStyle.checkBoxContainer}
			textStyle={rotateBigModalStyle.rotateModalText}
			checkedColor={'#111c3c'}
			uncheckedColor={'#999'}
			// checked={this.state.checked}
		/>
		<CheckBox
			center
			title='赵乐'
			checkedIcon='dot-circle-o'
			uncheckedIcon='circle-o'
			containerStyle={rotateBigModalStyle.checkBoxContainer}
			textStyle={rotateBigModalStyle.rotateModalText}
			checkedColor={'#111c3c'}
			uncheckedColor={'#999'}
			// checked={this.state.checked}
		/>





	  </View>
    )
  }
}



export class RotateSettingModal extends React.Component {

  render() {

    return (
      // <Modal
      //   transparent={true}
      //   animationType={'fade'}
      //   onRequestClose={() => null}
      // >
		<View style={rotateBigModalStyle.modalBackground}>
            <View style={rotateBigModalStyle.rotateWrapper}>
				<View style={rotateBigModalStyle.rotateModalTitle}>
					<Text style={rotateBigModalStyle.rotateModalText}>上牌管理</Text>
				</View>
				<View style={rotateBigModalStyle.rotateModalBody}>
					<ScrollView style={rotateBigModalStyle.rotateModalBodyL}>
						<SettingItem/>
						<SettingItem/>
						<SettingItem/>
						<SettingItem/>
						<SettingItem/>
						<SettingItem/>
					</ScrollView>
					<ScrollView style={rotateBigModalStyle.rotateModalBodyR}>
						<Text style={rotateBigModalStyle.rotateModalBodyRDuty}>职务分类</Text>
						<Text style={rotateBigModalStyle.rotateModalBodyRItemActive}>全部</Text>
						<Text style={rotateBigModalStyle.rotateModalBodyRItem}>发型师</Text>
						<Text style={rotateBigModalStyle.rotateModalBodyRItem}>技师</Text>
						<Text style={rotateBigModalStyle.rotateModalBodyRItem}>助理</Text>
					</ScrollView>
				</View>
				<View style={rotateBigModalStyle.modalBtm}>
					<TouchableOpacity style={[rotateBigModalStyle.modalBtmBtn,rotateBigModalStyle.modalCancelBtn]}>
					<Text style={rotateBigModalStyle.modalBtmBtnText}>取消</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[rotateBigModalStyle.modalBtmBtn,rotateBigModalStyle.modalSuccessBtn]}>
					<Text style={rotateBigModalStyle.modalBtmBtnText}>确定</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
    );
  }
}
