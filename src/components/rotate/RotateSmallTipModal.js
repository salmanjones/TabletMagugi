//轮牌-操作-提示框
import React from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';

import { rotateSmallModalStyle } from '../../styles';

export class RotateSmallTipModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	UNSAFE_componentWillMount() {
		let visible;
		if (this.props.visible === undefined || this.props.visible === null) visible = true;
		else visible = this.props.visible;

		this.setState({
			visible: visible
		});
	}

	visible = (visible) => {
		this.setState({ visible: visible });
	};

	render() {
		let type = this.props.type; // 0
		let showTxt = this.props.showTxt;
		return (
			<Modal transparent={true} animationType={'none'} onRequestClose={() => null} visible={this.state.visible}>
				<View style={rotateSmallModalStyle.modalBackground}>
					<View style={rotateSmallModalStyle.rotateWrapper}>
						<View style={rotateSmallModalStyle.rotateBox}>
							{type === 0 ? (
								<Text style={rotateSmallModalStyle.rotateModalText}>
									确定要删除 <Text style={rotateSmallModalStyle.textDarkBlue}>{showTxt}</Text> 吗？
								</Text>
							) : null}
							{type === 1 ? (
								// <Text style={rotateSmallModalStyle.rotateModalText}>确定要将全部轮牌洗牌吗？</Text>
								<Text style={rotateSmallModalStyle.rotateModalText}>确定要将全部轮牌下牌吗？</Text>

							) : null}
							{type === 2 ? <Text style={rotateSmallModalStyle.rotateModalText}>确定要下牌吗？</Text> : null}
						</View>
						<View style={rotateSmallModalStyle.modalBtm}>
							<TouchableOpacity
								style={[ rotateSmallModalStyle.modalBtmBtn, rotateSmallModalStyle.modalCancelBtn ]}
								onPress={this.props.onCanel.bind(this, type)}
							>
								<Text style={rotateSmallModalStyle.modalBtmBtnText}>取消</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[ rotateSmallModalStyle.modalBtmBtn, rotateSmallModalStyle.modalSuccessBtn ]}
								onPress={this.props.onSure.bind(this, type)}
							>
								<Text style={rotateSmallModalStyle.modalBtmBtnText}>确定</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
