import React, {PureComponent} from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {amendItemInfoStyle, cashierBillingStyle, manageConsumablesStyle} from '../../styles';
import {SimulateKeyboardInpBox} from '../../components';
import {loadConsumablesAction} from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ConsumableSelectBox extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			consumables: [],
			selectedConsumable: null,
			selectedCategoryId: null,
			loading: false
		};
	}

	componentWillMount() {
		if (this.props.categoryConsumables) {
			this.setState(this.buildState(this.props.categoryConsumables));
		}
	}

	componentDidMount() {
		let userInfo = this.props.auth.userInfo;
        let isSynthesis = userInfo.isSynthesis==='1'; //0专业店 1综合店
		this.props.LoadData(isSynthesis?'all':this.props.primeCategoryId.toString());
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.primeCategoryId !== nextProps.primeCategoryId && nextProps.primeCategoryId) {
			this.props.LoadData(nextProps.primeCategoryId.toString()); //(nextProps.primeCategoryId.toString());
			return;
		}

		if (
			(nextProps.categoryConsumables && this.props.categoryConsumables != nextProps.categoryConsumables) ||
			this.props.keyWord !== nextProps.keyWord
		) {
			let categoryConsumables = nextProps.categoryConsumables;

			if (nextProps.keyWord) {
				categoryConsumables = Object.keys(categoryConsumables).reduce((result, key) => {
					let datas = categoryConsumables[key].filter(
						(x) =>
							(x.itemNo && x.itemNo==nextProps.keyWord) || (x.name && x.name.indexOf(nextProps.keyWord) > -1)
					);
					if (datas && datas.length) result[key] = datas;
					return result;
				}, {});

			}
			this.setState({selectedCategoryId:null});
			this.setState(this.buildState(categoryConsumables));
		}

		if (nextProps.selectedData) {
			//if(this.props.selectedData != nextProps.selectedData)

			let data = nextProps.selectedData;
			let mapData = {
				id: data.itemId,
				name: data.itemName,
				itemTypeId: data.itemTypeId,
				specUnit: data.unit,
				unit: data.unitLev1,
				deptId: data.deptId,
				itemNo: data.itemNo,
				curAmount: data.amount,
				curUnit: data.unitType === '1' ? 'unit' : 'specUnit'
			};
			this.setState({
				selectedConsumable: mapData
			});
		} else {
			this.setState({
				selectedConsumable: null
			});
		}
	}

	buildState = (categoryConsumables) => {
		let categories = Object.keys(categoryConsumables).map((key) => {
			let pieces = key.split(';');
			return {
				id: pieces[0].split(':')[1],
				name: pieces[1],
				items: categoryConsumables[key]
			};
		});

		return {
			consumables: categories.reduce((result, category) => result.concat(category.items), []),
			categories: categories
		};
	};

	render() {
		const { onSelected, keyWord, selectedData, onCancel } = this.props;
		const { categories, consumables, selectedConsumable, selectedCategoryId } = this.state;
		const hasConsumables=!!consumables.length && consumables.length>0;
		return (
			<View style={{width:'100%', height: '100%', display:'flex', flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}}>
				{/*内容*/}
				{!selectedConsumable &&(
					<View style={manageConsumablesStyle.consumeChooseBody}>
						{hasConsumables && (<View style={cashierBillingStyle.consumeBodyHeight}>
							<ConsumableItems datas={consumables} onSelected={this.fillConsumableInfo} />
						</View>)}
						{!hasConsumables && (<View style={cashierBillingStyle.queryNoContent}>
							<Image source={require('@imgPath/no-content.png')} resizeMode={'contain'} style={cashierBillingStyle.queryNoContentImg}/>
							<Text style={cashierBillingStyle.queryNoContentTxt}>没有查询到相关结果</Text>
							<TouchableOpacity style={cashierBillingStyle.queryCancelBtn} onPress={onCancel}>
								<Text style={cashierBillingStyle.queryInputTxt}>返回</Text>
							</TouchableOpacity>
						</View>)}
					</View>
				)}
				{/*分类*/}
				{!selectedConsumable && (
					<View style={manageConsumablesStyle.consumeChooseCategory}>
						<ConsumalbeCategories
							datas={categories}
							onSelected={this.filter}
							selectedCategoryId={selectedCategoryId}
						/>
					</View>
				)}
				{selectedConsumable && (
					<ConsumableEdit
						data={selectedConsumable}
						onSaved={this.confirm}
						onCanceled={() => {
							onCancel();
							this.setState({ selectedConsumable: null });
						}}
					/>
				)}
			</View>
		);
	}

	filter = (categoryId) => {
		let that = this;

		if (categoryId) {
			let category = this.state.categories.filter((category) => category.id === categoryId)[0];
			if (!category) return;
			this.setState({
				consumables: category.items,
				selectedCategoryId: categoryId
			});
		} else {
			let allConsumables = this.state.categories.reduce((result, category) => {
				return result.concat(category.items);
			}, []);
			this.setState({
				consumables: allConsumables,
				selectedCategoryId: null
			});
		}
	};

	fillConsumableInfo = (consumable) => {
		this.setState({
			selectedConsumable: consumable
		});
	};

	confirm = (data) => {
		this.setState({
			selectedConsumable: null
		});

		if (this.props.selectedData) {
			//this.props.onSelected(data);
			this.props.onUpdate(data);
		} else {
			this.props.onAdd(data);
		}
	};
}

//mapping props
const mapStateToProps = (state) => {
	const { component } = state;
	return {
		auth: state.auth,
		categoryConsumables: component.consumables.categoryConsumables
	};
};
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			LoadData: loadConsumablesAction
		},
		dispatch
	);
export const ConsumableSelectBoxComponent = connect(mapStateToProps, mapDispatchToProps)(ConsumableSelectBox);

class ConsumableItems extends PureComponent {
	render() {
		const { datas, selectedId, onSelected } = this.props;
		return (
			<FlatList
				data={datas}
				numColumns={3}
				initialNumToRender={6}
				keyExtractor={(item, index) => index}
				renderItem={({ item }) => (
					<TouchableOpacity style={manageConsumablesStyle.addServicerLi} onPress={() => onSelected(item)}>
						<View style={manageConsumablesStyle.addServicerLiBox}>
							<Text style={manageConsumablesStyle.addServicerNumber}>{item.itemNo}</Text>
							<Text style={manageConsumablesStyle.addServicerName} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		);
	}
}

class ConsumalbeCategories extends PureComponent {
	render() {
		const { datas, selectedCategoryId, onSelected } = this.props;
		return (
			<ScrollView>
				<TouchableOpacity style={cashierBillingStyle.consumeOrderGenreLi} onPress={() => onSelected(null)}>
					<Text
						style={
							selectedCategoryId === null ? (
								cashierBillingStyle.consumeOrderGenreTextActive
							) : (
								cashierBillingStyle.consumeOrderGenreText
							)
						}
					>
						所有类
					</Text>
				</TouchableOpacity>
				{datas.map((data, index) => (
					<TouchableOpacity
						onPress={() => onSelected(data.id)}
						key={index}
						style={cashierBillingStyle.consumeOrderGenreLi}>
						<Text
							style={
								selectedCategoryId === data.id ? (
									cashierBillingStyle.consumeOrderGenreTextActive
								) : (
									cashierBillingStyle.consumeOrderGenreText
								)
							}>
							{data.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		);
	}
}

class ConsumableEdit extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			quantity: '1',
			unit: 'specUnit',
			error: false
		};
	}

	componentWillMount() {
		if (this.props.data && this.props.data.curAmount) {
			this.setState({ quantity: this.props.data.curAmount.toString() });
		}

		if (this.props.data && this.props.data.curUnit) {
			this.setState({ unit: this.props.data.curUnit });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data && nextProps.data.curAmount) {
			this.setState({ quantity: nextProps.data.curAmount.toString() });
		}

		if (nextProps.data && nextProps.data.curUnit) {
			this.setState({ unit: nextProps.data.curUnit });
		}
	}

	render() {
		const { data, onSaved, onCanceled } = this.props;
		const { quantity, unit, error } = this.state;
		return (
			<View style={manageConsumablesStyle.consumeEditBody}>
				<View style={amendItemInfoStyle.iteminfoBox}>
					<Text style={amendItemInfoStyle.AmendCardItemNameText} numberOfLines={1} ellipsizeMode={'tail'}>
						消耗：{data.name}
					</Text>
					<View style={amendItemInfoStyle.AmendCardItemPrice}>
						<Text style={amendItemInfoStyle.AmendCardItemPriceText}>规格：</Text>
						<View style={manageConsumablesStyle.unitBox}>
							<TouchableOpacity
								onPress={() => this.onUnitSeleted('specUnit')}
								style={
									unit === 'specUnit' ? (
										manageConsumablesStyle.unitItemActive
									) : (
										manageConsumablesStyle.unitItem
									)
								}
							>
								<Text style={manageConsumablesStyle.unitItemText}>{data.specUnit}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => this.onUnitSeleted('unit')}
								style={
									unit === 'unit' ? (
										manageConsumablesStyle.unitItemActive
									) : (
										manageConsumablesStyle.unitItem
									)
								}
							>
								<Text style={manageConsumablesStyle.unitItemText}>{data.unit}</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={manageConsumablesStyle.AmendCardItemCount}>
						<Text style={amendItemInfoStyle.AmendCardItemCountText}>数量：</Text>
						<View style={manageConsumablesStyle.AmendCardItemCountTextBox}>
							<View
								style={
									error ? (
										manageConsumablesStyle.AmendCardItemCountTextInpError
									) : (
										manageConsumablesStyle.AmendCardItemCountTextInp
									)
								}
							>
								<Text style={amendItemInfoStyle.AmendCardItemCountT}>{quantity}</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={manageConsumablesStyle.AmendCardItemKeyboard}>
					<SimulateKeyboardInpBox onPress={this.onInput} onBack={this.onBack} />
				</View>
				<View style={manageConsumablesStyle.bodyBottom}>
					<TouchableOpacity style={manageConsumablesStyle.bodyCanelBtn} onPress={() => onCanceled()}>
						<Text style={amendItemInfoStyle.bodyCanelBtnText}>取消</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={manageConsumablesStyle.bodyConfirmBtn}
						onPress={() => {
							if (this.state.quantity.length === 0) {
								this.setState({ error: true });
								return;
							}
							onSaved({
								consumable: data,
								quantity: Number(this.state.quantity),
								unit: this.state.unit
							});
						}}
					>
						<Text style={amendItemInfoStyle.bodyConfirmText}>确定</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	display = (value) => {
		this.setState({ display: value });
	};

	onInput = (num) => {
		let value = this.state.quantity;

		if (value === '0' && num !== '.') value = '';

		if (value.indexOf('.') > -1 && num === '.') return;

		if (value.indexOf('.') > -1 && value.indexOf('.') < value.length - 2) return;

		if ((value + num).length > 6) return;

		this.setState({ quantity: value + num, error: false });
	};

	onBack = (num) => {
		this.setState({ quantity: this.state.quantity.slice(0, -1) });
	};

	onUnitSeleted = (unit) => {
		this.setState({
			unit: unit
		});
	};
}
