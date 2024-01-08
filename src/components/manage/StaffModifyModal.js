//libs
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image, InteractionManager, Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SimulateKeyboardInpBox, StaffSelectBoxV2} from '../../components';
import {getImage, ImageQutity} from '../../utils';
import {AmendServicerModalStyle, cashierBillingStyle} from '../../styles';
import {getStaffModifySettingAction, moidfyStaffAction} from '../../actions';

class StaffModifyModalClass extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            staff: {},
            staffIndex: null,
            project: {},
            currentModifyItem: null,
            showBox: null,
			visible: false,
			loading: false
		};

		this.captionMap = {
			assign: '请选择设置',
			staff: '选择服务人',
			position: '设置职务',
			performance: '设置业绩',
			handWork: '设置提成',
		  };
	}

	componentDidMount() {
        const { getSetting } = this.props;
		getSetting();
    }

	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (nextProps.projectId != this.props.projectId || nextProps.staffIndex != this.props.staffIndex) {
		// 	let project = this.props.consumeItems.filter((item) => item.id === nextProps.projectId)[0];
		// 	let staff = project.staffs[nextProps.staffIndex];
		// 	this.setState({ staff: staff, project: project });
		// }
	}

	show = (project, staffIndex) => {
		let staff = project.assistList[staffIndex];

		this.setState({
			staff: { ...staff } || {},
			project: project,
			visible: true,
			currentModifyItem: staff.id ? (project.service === 1 ? 'assign' : 'staff') : 'staff',
			staffIndex: staffIndex
		});
	};

	save = () => {
		const { staff, project, staffIndex } = this.state;
		const { onSave }=this.props;
		if(onSave){
			onSave(project,staffIndex,staff);
		}else{
			this.props.save(project.id, staffIndex, staff);
		}

		this.setState({ visible: false });
	};

	cancel = () => {
		this.setState({ visible: false });
	};

	delete = () => {
		this.setState({ staff: {} });
	};

	staffSelect = () => {
		if(this.props.enableChangeStaff!==false)
			this.setState({ showBox: 'staff', currentModifyItem: 'staff' });
	};

	staffSelected = (staff) => {
		this.setState({
			staff: {
				...staff,
				workTypeId: staff.positionId,
				workTypeDesc: staff.positionInfo,
				workPositionTypeId: staff.staffType
			}
		});
	};

	assignSelect = () => {
		this.setState({ showBox: 'assign', currentModifyItem: 'assign' });
	};

	assignSelected = (isAssign) => {
		if (!this.state.staff.id) return;
		this.setState({ staff: { ...this.state.staff, appoint: isAssign } });
	};

	positionSelect = () => {
		this.setState({ showBox: 'position', currentModifyItem: 'position' });
	};

	positionSelected = (position) => {
		if (!this.state.staff.id) return;
		this.setState({
			staff: {
				...this.state.staff,
				workTypeId: position.id,
				workTypeDesc: position.name,
				workPositionTypeId: position.positionTypeId

				// position: position.name,
				// positionId: position.id,
				// positionInfo: position.name,
				// positionType: position.positionTypeId
			}
		});
	};

	performanceSelect = () => {
		this.setState({ showBox: 'performance', currentModifyItem: 'performance' });
	};

	performanceConfirmed = (performance) => {
		if (!this.state.staff.id) return;

		let value = performance === '' ? performance : Number(performance).toFixed(2);
		this.setState({
			staff: {
				...this.state.staff,
				performance: value,
				staffPerformance: value,
				performanceMap: ''
			},
			currentModifyItem: null
		});
	};

	performanceClear = () => {
		this.setState({
			staff: {
				...this.state.staff,
				performance: '',
				performanceMap: '',
				staffPerformance: ''
			},
			//currentModifyItem: null
		});
	};

	handWorkSelect = () => {
		this.setState({ showBox: 'handWork', currentModifyItem: 'handWork' });
	};

	handWorkConfirmed = (handWork) => {
		if (!this.state.staff.id) return;
		let value = handWork === '' ? handWork : Number(handWork).toFixed(2);
		this.setState({
			staff: {
				...this.state.staff,
				workerFee: value,
				staffWorkfee: value
			},
			currentModifyItem: null
		});
	};

	handWorkClear = () => {
		this.setState({
			staff: {
				...this.state.staff,
				workerFee: '',
				staffWorkfee: ''
			},
			//currentModifyItem: null
		});
	};

	render() {
		const { staff, project, currentModifyItem, showBox, visible } = this.state;
		const { accessRights ,enableChangeStaff,useWriteAccessRigths } = this.props;
		if(useWriteAccessRigths){
			accessRights.canEditProject=accessRights.hasWriteProjectRight;
			accessRights.canEditTakeout=accessRights.hasWriteTakeoutRight;
			accessRights.canEditHandFee=accessRights.hasWriteHandFeeRight;
		}else{
			accessRights.canEditProject=accessRights.hasChangeProjectRight;
			accessRights.canEditTakeout=accessRights.hasChangeTakeoutRight;
			accessRights.canEditHandFee=accessRights.hasChangeHandFeeRight;
		}
		let caption = this.captionMap[currentModifyItem];
		return (
			<Modal
				animationType={'fade'}
				transparent={false}
				// style={MemberQueryStyle.container}
				onRequestClose={() => null}
				visible={visible}
				style={{flex: 1}}
			>
				<View style={AmendServicerModalStyle.modalBackground}>
					<View style={AmendServicerModalStyle.cashierBillInfoWrapper}>
						<View style={AmendServicerModalStyle.container}>
							<View style={AmendServicerModalStyle.servicerBox}>
								<View style={AmendServicerModalStyle.servicertitle}>
									<Text style={cashierBillingStyle.servicerItemTitle}>服务人信息</Text>
									{(!staff.id  && enableChangeStaff !==false) &&
										<View style={AmendServicerModalStyle.titleDeleteBox}>
											<Image resizeMethod="resize"
												source={require('@imgPath/delete-icon-gray.png')}
												style={AmendServicerModalStyle.daleteIconImg}
											/>
											<Text style={AmendServicerModalStyle.textColor9C}>删除</Text>
										</View>}
									{(staff.id && enableChangeStaff !==false) &&
										<TouchableOpacity
											style={AmendServicerModalStyle.titleDeleteBox}
											onPress={this.delete}
										>
											{/* <TouchableOpacity onPress={this.delete}> */}
											<Image resizeMethod="resize"
												style={AmendServicerModalStyle.daleteIconImg}
												source={require('@imgPath/delete-icon-red.png')}
											/>
											<Text style={AmendServicerModalStyle.textColorRed}>删除</Text>
											{/* </TouchableOpacity> */}
										</TouchableOpacity>
									}
								</View>
								<View style={AmendServicerModalStyle.servicerBoxBorder}>
									{/* 服务人信息 */}
									<StaffInfo
										enableChangeStaff={enableChangeStaff}
										currentModifyItem={currentModifyItem}
										accessRights={accessRights}
										project={project}
										staff={staff}
										onStaffSelected={this.staffSelect}
										onAssignSelected={this.assignSelect}
										onPositionSelected={this.positionSelect}
										onPerformanceSelected={this.performanceSelect}
										onHandWorkSelected={this.handWorkSelect}
									/>
								</View>
								<View style={AmendServicerModalStyle.servicerAccount}>
									{/* 操作区域 */}
									<TouchableOpacity style={AmendServicerModalStyle.backBtn} onPress={this.cancel}>
										<Text style={cashierBillingStyle.consumedBtnText}>返回</Text>
									</TouchableOpacity>
									<TouchableOpacity style={cashierBillingStyle.payBtn} onPress={this.save}>
										<Text style={cashierBillingStyle.consumedBtnText}>保存</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View style={AmendServicerModalStyle.consumeBox}>
								{/* 右侧-标题 */}
								<View style={AmendServicerModalStyle.consumeTitle}>
									<Text style={AmendServicerModalStyle.textColor333}>{caption}</Text>
								</View>
								<View style={AmendServicerModalStyle.consumeBoxBorder}>
									<View
										style={
											currentModifyItem === 'position' ? (
												{ display: 'flex', flex: 1 }
											) : (
												{ display: 'none' }
											)
										}
									>
										{/* 服务人职务类型 */}
										<Positions  onPositionSelected={this.positionSelected} />
									</View>
									<View
										style={
											currentModifyItem === 'staff' ? (
												{ display: 'flex', flex: 1 }
											) : (
												{ display: 'none' }
											)
										}
									>
										{/* 服务人选择*/}
										{enableChangeStaff!==false && <StaffSelectBoxV2 onSelected={this.staffSelected} />}
									</View>
									<View
										style={
											currentModifyItem === 'assign' ? (
												{ display: 'flex', flex: 1 }
											) : (
												{ display: 'none' }
											)
										}
									>
										{/* 选择指定类型 */}
										<AssignSelect onAssignSelected={this.assignSelected} isAssign={staff.appoint} />
									</View>
									<View
										style={
											currentModifyItem === 'performance' || currentModifyItem === 'handWork' ? (
												{ display: 'flex', flex: 1 }
											) : (
												{ display: 'none' }
											)
										}
									>
										<EditNumber
											staff={staff}
											type={currentModifyItem}
											onConfirm={(num) => {
												if (this.state.currentModifyItem === 'performance') {
													this.performanceConfirmed(num);
												} else if (this.state.currentModifyItem === 'handWork') {
													this.handWorkConfirmed(num);
												}
											}}
											onClear={() => {
												if (this.state.currentModifyItem === 'performance') {
													this.performanceClear();
												} else if (this.state.currentModifyItem === 'handWork') {
													this.handWorkClear();
												}
												//this.setState({ currentModifyItem: null });
											}}
										/>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

//mapping props
const mapStateToProps = (state) => {
	const { component } = state;
	return {
		accessRights: component.staffModify.accessRights
	};
};
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			save: moidfyStaffAction,
			getSetting:getStaffModifySettingAction
		},
		dispatch
	);
export const StaffModifyModal = connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
	StaffModifyModalClass
);

class StaffInfo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currentModifyItem: null
		};
	}

	render() {
		const { staff, project, accessRights, currentModifyItem,enableChangeStaff } = this.props;
		const {
			onStaffSelected,
			onAssignSelected,
			onPositionSelected,
			onPerformanceSelected,
			onHandWorkSelected
		} = this.props;
		//const { currentModifyItem } = this.state;
		return (
			<View>
				{/* 未选择服务人 */}
				{!staff.id ? (
					<View style={AmendServicerModalStyle.serviceImgInfoBox}>
						<TouchableOpacity
							style={
								currentModifyItem === 'staff' ? (
									AmendServicerModalStyle.noServicerBoxActive
								) : (
								AmendServicerModalStyle.noServicerBox
								)
							}
							onPress={() => {
								this.setState({ currentModifyItem: 'staff' });
								onStaffSelected();
							}}
						>
							<Image resizeMethod="resize"
								source={require('@imgPath/add-icon-gray.png')}
								style={AmendServicerModalStyle.addIconImg}
							/>
						</TouchableOpacity>
						<View style={AmendServicerModalStyle.serviceTextInfoBoxOther}>
							<Text style={AmendServicerModalStyle.textColor9C}>请选择服务人</Text>
						</View>
					</View>
				) : (
					<View style={AmendServicerModalStyle.serviceImgInfoOtherBox}>
						<View
							style={
								currentModifyItem === 'staff' ? (
									AmendServicerModalStyle.servicerInfoBoxActive
								) : (
								AmendServicerModalStyle.servicerInfoBox
								)
							}
						>
							<TouchableOpacity
								onPress={() => {
									this.setState({ currentModifyItem: 'staff' });
									onStaffSelected();
								}}
							>
								<View style={AmendServicerModalStyle.redactBox}>
									{enableChangeStaff!==false && <Image resizeMethod="resize"
										source={require('@imgPath/redact-fff-box.png')}
										style={AmendServicerModalStyle.redactImg}
									/>}
								</View>
								<Image resizeMethod="resize"
									source={getImage(
										staff.showImage,
										ImageQutity.staff,
										require('@imgPath/rotate-portrait.png')
									)}
									style={AmendServicerModalStyle.personImg}
								/>
							</TouchableOpacity>
						</View>
						<View style={AmendServicerModalStyle.serviceTextInfoBox}>
							<Text style={AmendServicerModalStyle.textColor333}>{staff.value}</Text>
							<View style={cashierBillingStyle.designerNumber}>
								<Image resizeMethod="resize"  source={require('@imgPath/store-staff-No.png')} style={cashierBillingStyle.storeStaffImg}  resizeMode={'contain'}/>
								<Text style={cashierBillingStyle.designerNumberText} numberOfLines={1} ellipsizeMode={'tail'}>{staff.storeStaffNo}</Text>
							</View>
							{project.service === 1 && (
								<TouchableOpacity
									onPress={() => {
										this.setState({ currentModifyItem: 'assign' });
										onAssignSelected();
									}}
								>
									<View style={AmendServicerModalStyle.servicerGenreBox}>
										{staff.appoint === 'true' && (
											<Image resizeMethod="resize"
												source={require('@imgPath/assign.png')}
												style={AmendServicerModalStyle.addTypeAssign}
												resizeMode={'contain'}
											/>
										)}
										{/*<View*/}
										{/*	style={*/}
										{/*		currentModifyItem === 'assign' ? (*/}
										{/*			AmendServicerModalStyle.servicerGenreTextBoxActive*/}
										{/*		) : (*/}
										{/*		AmendServicerModalStyle.servicerGenreTextBox*/}
										{/*		)*/}
										{/*	}*/}
										{/*>*/}
										{/*	<Text style={AmendServicerModalStyle.servicerGenreText}>*/}
										{/*		{staff.appoint === 'true' ? '指定' : '非指定'}*/}
										{/*	</Text>*/}
										{/*	<Image resizeMethod="resize"*/}
										{/*		source={require('@imgPath/redact-111c3c.png')}*/}
										{/*		style={AmendServicerModalStyle.redactImgOther}*/}
										{/*	/>*/}
										{/*</View>*/}
									</View>
								</TouchableOpacity>
							)}
						</View>
					</View>
				)}

				<View style={AmendServicerModalStyle.serviceTypeBox}>
					<View style={AmendServicerModalStyle.serviceTypeTitle}>
						<Text style={AmendServicerModalStyle.textColor333}>
							{project.service === 1 ? '服务项目' : '外卖'}
						</Text>
					</View>
					<View style={AmendServicerModalStyle.serviceTypeName}>
						<Text numberOfLines={2} ellipsizeMode={'tail'} style={AmendServicerModalStyle.text28Color333}>
							{project.itemName}
						</Text>
					</View>
				</View>
				<View style={AmendServicerModalStyle.serviceClassifyBox}>
					<TouchableOpacity
						disabled={project.service === 0}
						style={
							project.service === 0 ? (
								AmendServicerModalStyle.serviceClassifyLiUnable
							) : currentModifyItem === 'position' ? (
								AmendServicerModalStyle.serviceClassifyLiActive
							) : (
								AmendServicerModalStyle.serviceClassifyLi
							)
						}
						onPress={() => {
							if (project.service === 0) return;

							this.setState({ currentModifyItem: 'position' });
							onPositionSelected();
						}}
					>
						<View style={AmendServicerModalStyle.serviceClassifyTitleLi}>
							<Text style={AmendServicerModalStyle.textColor333}>职务</Text>
						</View>
						<View style={AmendServicerModalStyle.serviceClassifyNumLi}>
							<Text style={AmendServicerModalStyle.text28Color333}>{staff.id ? staff.workTypeDesc : ''}</Text>
							{project.service !== 0  &&<Image resizeMethod="resize"
								source={require('@imgPath/redact-111c3c.png')}
								style={AmendServicerModalStyle.redactIconImg}
							/>}
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						disabled={
							(project.service === 1 && !accessRights.canEditProject) ||
							(project.service === 0 && !accessRights.canEditTakeout)
						}
						style={
							(project.service === 1 && !accessRights.canEditProject) ||
							(project.service === 0 && !accessRights.canEditTakeout) ? (
								AmendServicerModalStyle.serviceClassifyLiUnable
							) : currentModifyItem === 'performance' ? (
								AmendServicerModalStyle.serviceClassifyLiOtherActive
							) : (
								AmendServicerModalStyle.serviceClassifyLiOther
							)
						}
						onPress={() => {
							if (project.service === 1 && !accessRights.canEditProject) return;
							if (project.service === 0 && !accessRights.canEditTakeout) return;

							this.setState({ currentModifyItem: 'performance' });
							onPerformanceSelected();
						}}
					>
						<View style={AmendServicerModalStyle.serviceClassifyTitleLi}>
							<Text style={AmendServicerModalStyle.textColor333}>业绩</Text>
						</View>

						<View style={AmendServicerModalStyle.serviceClassifyNumLi}>
							<Text style={AmendServicerModalStyle.text28Color333}>
								{staff.id ? staff.staffPerformance || '--' : ''}
							</Text>
							{ !((project.service === 1 && !accessRights.canEditProject) ||
								(project.service === 0 && !accessRights.canEditTakeout))
							 && <Image resizeMethod="resize"
								source={require('@imgPath/redact-111c3c.png')}
								style={AmendServicerModalStyle.redactIconImg}
							/>}
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						disabled={!accessRights.canEditHandFee}
						style={
							!accessRights.canEditHandFee ? (
								AmendServicerModalStyle.serviceClassifyLiUnable
							) : currentModifyItem === 'handWork' ? (
								AmendServicerModalStyle.serviceClassifyLiActive
							) : (
								AmendServicerModalStyle.serviceClassifyLi
							)
						}
						onPress={() => {
							if (!accessRights.canEditHandFee) return;

							this.setState({ currentModifyItem: 'handWork' });
							onHandWorkSelected();
						}}
					>
						<View style={AmendServicerModalStyle.serviceClassifyTitleLi}>
							<Text style={AmendServicerModalStyle.textColor333}>提成</Text>
						</View>

						<View style={AmendServicerModalStyle.serviceClassifyNumLi}>
							<Text style={AmendServicerModalStyle.text28Color333}>
								{staff.id ? staff.staffWorkfee || '--' : ''}
							</Text>
							{ accessRights.canEditHandFee &&<Image resizeMethod="resize"
								source={require('@imgPath/redact-111c3c.png')}
								style={AmendServicerModalStyle.redactIconImg}
							/>}
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

class PositionsClass extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currentSelectedId: null
		};
	}

	render() {
		const { data, onPositionSelected} = this.props;
		const { currentSelectedId } = this.state;
		let positions = [];
		if (data) {
			positions = Object.keys(data).reduce((result, key) => {
				return result.concat(data[key]);
			}, []);//.filter(x=>x.categoryId==categoryId);
		}
		return (
			<ScrollView>
				<View style={AmendServicerModalStyle.dutyBtnBOX}>
					{positions.map((position, index) => {
						return (
							<TouchableOpacity
								key={index}
								underlayColor="white"
								style={
									currentSelectedId === position.id ? (
										AmendServicerModalStyle.dutyBtnItemActive
									) : (
										AmendServicerModalStyle.dutyBtnItem
									)
								}
								onPress={() => {
									onPositionSelected(position);
									this.setState({ currentSelectedId: position.id });
								}}
							>
								<Text
									style={
										currentSelectedId === position.id ? (
											AmendServicerModalStyle.dutyBtnTextActive
										) : (
											AmendServicerModalStyle.dutyBtnText
										)
									}
								>
									{position.name}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</ScrollView>
		);
	}
}
const Positions = connect((state) => {
	const { component  } = state;
	return {
		data: component.staffModify.staffPositions
	};
})(PositionsClass);

class AssignSelect extends PureComponent {
	render() {
		const { onAssignSelected, isAssign } = this.props;
		//const { isAssign } = this.state;
		return (
			<View style={AmendServicerModalStyle.btnBOX}>
                <Text>暂无</Text>
				{/*<View style={AmendServicerModalStyle.appointBtnBox}>*/}
				{/*	<Image resizeMethod="resize"*/}
				{/*		source={require('@imgPath/assign.png')}*/}
				{/*		style={AmendServicerModalStyle.appointBtnAssign}*/}
				{/*	/>*/}
				{/*	<TouchableOpacity*/}
				{/*		underlayColor="white"*/}
				{/*		style={*/}
				{/*			isAssign === 'true' ? (*/}
				{/*				AmendServicerModalStyle.appointBtn*/}
				{/*			) : (*/}
				{/*				AmendServicerModalStyle.unAppointBtn*/}
				{/*			)*/}
				{/*		}*/}
				{/*		onPress={() => {*/}
				{/*			onAssignSelected('true');*/}
				{/*		}}*/}
				{/*	>*/}
				{/*		<Text style={AmendServicerModalStyle.appointBtnText}>指定</Text>*/}
				{/*	</TouchableOpacity>*/}
				{/*</View>*/}
				{/*<TouchableOpacity*/}
				{/*	underlayColor="white"*/}
				{/*	style={*/}
				{/*		isAssign === 'true' ? AmendServicerModalStyle.unAppointBtn : AmendServicerModalStyle.appointBtn*/}
				{/*	}*/}
				{/*	onPress={() => {*/}
				{/*		onAssignSelected('false');*/}
				{/*	}}*/}
				{/*>*/}
				{/*	<Text style={AmendServicerModalStyle.appointBtnText}>非指定</Text>*/}
				{/*</TouchableOpacity>*/}
			</View>
		);
	}
}

class EditNumber extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			num: '',
			holderValue: '',
			error: false
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// if (this.props.type !== nextProps.type) {
		// 	this.setState({ num: '' });
		// }
		const { staffPerformance, performanceMap, performance, workerFee, staffWorkfee } = nextProps.staff;
		if (nextProps.type === 'performance') {
			this.setState({
				num: performanceMap || performance || '',
				holderValue: staffPerformance
			});
		} else if (nextProps.type === 'handWork') {
			this.setState({
				num: workerFee || '',
				holderValue: staffWorkfee
			});
		}
	}

	render() {
		const { type, onConfirm, staff, onClear } = this.props;
		const { num, holderValue } = this.state;
		let title = type === 'performance' ? '业绩' : type === 'handWork' ? '提成' : '';

		return (
			<View style={AmendServicerModalStyle.KeyboardBOX}>
				<View style={AmendServicerModalStyle.simulateKeyboardbox}>
					<Text style={AmendServicerModalStyle.textColor333}>{title}</Text>
					{/* <Text style={AmendServicerModalStyle.simulateKeyboardTextActiveView}>{num}</Text> */}
					<View style={AmendServicerModalStyle.simulateKeyboardTextActiveView}>
						<TextInput
							value={num}
							placeholder={holderValue}
							underlineColorAndroid="transparent"
							style={AmendServicerModalStyle.simulateKeyboardTextActiveInp}
						/>
					</View>
				</View>
				<SimulateKeyboardInpBox onPress={this.onInput} onBack={this.onBack} />
				<View style={AmendServicerModalStyle.simulateKeyboardBtnbox}>
					<TouchableOpacity
						underlayColor="white"
						style={AmendServicerModalStyle.backBtn}
						onPress={() => {
							this.setState({ num: '', holderValue: '' });
							onClear();
						}}
					>
						<Text style={cashierBillingStyle.consumedBtnText}>清除</Text>
					</TouchableOpacity>
					<TouchableOpacity
						underlayColor="white"
						style={cashierBillingStyle.payBtn}
						onPress={() => {
							this.setState({ num: '' });
							onConfirm(num);
						}}
					>
						<Text style={cashierBillingStyle.consumedBtnText}>确定</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	onInput = (num) => {
		let value = this.state.num;

		if (value === '0' && num !== '.') value = '';

		if (value.indexOf('.') > -1 && num === '.') return;

		if (value.indexOf('.') > -1 && value.indexOf('.') < value.length - 2) return;

		if ((value + num).length > 8) return;

		this.setState({ num: value + num });
	};

	onBack = () => {
		let {num, holderValue } = this.state;
		if (!num) return;
		let newNum = num.slice(0, -1);
		this.setState({ num: newNum, holderValue: newNum.length ? holderValue : '' });
	};
}
