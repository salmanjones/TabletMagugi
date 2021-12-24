import React, {PureComponent} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {getImage, ImageQutity} from '../../utils';
import {cashierBillingStyle, manageConsumablesStyle} from '../../styles';
import Swipeout from 'react-native-swipeout';

export class ConsumableList extends PureComponent {
	render() {
		const { consumables, onStaffSelected, onConsumableSelected, onDelete, onAdd } = this.props;
		//let availableConsumables=consumables.filter(item=>!item.delFlag);
		return (
			<View>
                <ScrollView style={{width: '100%', height: '100%'}}>
                    {
                        consumables.map((item, index)=>{
                            return item.delFlag ? (
                                <View />
                            ) : (
                                <ConsumableItem
                                    item={item}
                                    onStaffSelected={(staffIndex, staff) => onStaffSelected({ staff, index, staffIndex })}
                                    onItemSelected={() => onConsumableSelected({ item, index })}
                                    onDelete={() => {
                                        onDelete({ item, index });
                                    }}
                                />
                            )
                        })
                    }
                </ScrollView>
				<TouchableOpacity style={cashierBillingStyle.addServicerBodyLi} onPress={onAdd}>
					<View style={cashierBillingStyle.addServicerBodyBox}>
						<Image resizeMethod="resize"
							source={require('@imgPath/add.png')}
							style={cashierBillingStyle.addServicerBodyLiIcon}
						/>
						<Text style={cashierBillingStyle.addServicerBodyLiText}>消耗品</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

class ConsumableItem extends PureComponent {
	render() {
		const { item, onStaffSelected, onItemSelected, onDelete } = this.props;
		let hasActiveItem = item.active || item.assistList.filter((x) => x.active)[0];
		return (
			<Swipeout
				autoClose={true}
				backgroundColor="#fff"
				style={{ height: 90, marginBottom: 2 }}
				right={[
					{
						text: '删除',
						backgroundColor: 'red',
						underlayColor: '#ff4444',
						onPress: onDelete
					}
				]}
			>
				<View style={cashierBillingStyle.servicerBodyLiBox}>
					<View style={cashierBillingStyle.servicerBodyLi}>
						<ConsumableItemDesc data={item} onSelected={onItemSelected} />
						<ConsumableItemStaff
							data={item.assistList[0]}
							onSelected={() => {
								onStaffSelected(0, item.assistList[0]);
							}}
						/>
						<ConsumableItemStaff
							data={item.assistList[1]}
							onSelected={() => {
								onStaffSelected(1, item.assistList[1]);
							}}
						/>
						<ConsumableItemStaff
							data={item.assistList[2]}
							onSelected={() => {
								onStaffSelected(2, item.assistList[2]);
							}}
						/>
					</View>
				</View>
			</Swipeout>
		);
	}
}

class ConsumableItemDesc extends PureComponent {
	render() {
		const { onSelected, data } = this.props;
		let unitDisplay = data.unitType === '1' ? data.unitLev1 : data.unit;
		return (
			<TouchableOpacity
				style={data.active ? cashierBillingStyle.showServicerLiActive : cashierBillingStyle.showServicerLi}
				onPress={onSelected}
			>
				<View style={cashierBillingStyle.showServicerLiBox}>
					<Text style={cashierBillingStyle.showServicerName}>{data.itemName}</Text>
					<View style={cashierBillingStyle.showServicerInfo}>
						<Text style={manageConsumablesStyle.addServicerNumber}>消耗：{data.amount + unitDisplay}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

class ConsumableItemStaff extends PureComponent {
	render() {
		const { onSelected, data } = this.props;

		return data.id ? (
			<View style={cashierBillingStyle.servicerPersonAppoint}>
				<TouchableOpacity
					style={
						data.active ? (
							cashierBillingStyle.servicerPersonInfoActive
						) : (
							cashierBillingStyle.servicerPersonInfo
						)
					}
					onPress={onSelected}
				>
					<View style={cashierBillingStyle.servicerPersonBox}>
						<Image resizeMethod="resize"
							source={getImage(
								data.showImage,
								ImageQutity.staff,
								require('@imgPath/rotate-portrait.png')
							)}
							style={cashierBillingStyle.servicerPersonImg}
						/>
						<View style={cashierBillingStyle.servicerPersonNameBox}>
							<Text style={cashierBillingStyle.servicerPersonName}>
							{data.value}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
				{/* <Image resizeMethod="resize"  source={require('@imgPath/assign.png')} style={cashierBillingStyle.servicerAppointImg} /> */}
			</View>
		) : (
			<View style={cashierBillingStyle.servicerPersonInfoBox}>
				<TouchableOpacity
					style={
						data.active ? (
							cashierBillingStyle.servicerPersonInfoActive
						) : (
							cashierBillingStyle.servicerPersonInfo
						)
					}
					onPress={onSelected}
				>
					<View style={cashierBillingStyle.servicerPersonBox}>
						<Image resizeMethod="resize"  source={require('@imgPath/add.png')} style={cashierBillingStyle.addServicerPerson} />
					</View>
				</TouchableOpacity>
			</View>
		);

		// return data ? (
		// 	<View style={cashierBillingStyle.servicerPersonAppoint} onPress={onSelected}>
		// 		<TouchableOpacity style={cashierBillingStyle.servicerPersonInfoActive}>
		// 			<View style={cashierBillingStyle.servicerPersonBox}>
		// 				<Image resizeMethod="resize"
		// 					source={getImage(data.img, ImageQutity.staff, require('@imgPath/index-sculpt.png'))}
		// 					style={cashierBillingStyle.servicerPersonImg}
		// 				/>
		// 				<Text style={cashierBillingStyle.servicerPersonName}>{data.value}</Text>
		// 			</View>
		// 		</TouchableOpacity>
		// 		<Image resizeMethod="resize"  source={require('@imgPath/assign.png')} style={cashierBillingStyle.servicerAppointImg} />
		// 	</View>
		// ) : (
		// 	<TouchableOpacity style={cashierBillingStyle.addServicerBodyLi} onPress={onSelected}>
		// 		<View style={cashierBillingStyle.addServicerBodyBox}>
		// 			<Image resizeMethod="resize"  source={require('@imgPath/add.png')} style={cashierBillingStyle.addServicerBodyLiIcon} />
		// 		</View>
		// 	</TouchableOpacity>
		// );
	}
}
