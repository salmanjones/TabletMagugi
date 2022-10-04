// 轮牌设置弹层.
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Modal, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { rotateBigModalStyle, RotateSettingStyles, openCardAccountStyle } from '../../styles';
import { getImage, ImageQutity, showMessage, PixelUtil } from '../../utils';
import { getServiceStaffs } from '../../services';
import { CheckBox } from 'react-native-elements';
class StaffPositions extends React.PureComponent {
    render() {
        const { onSelectCate, currentCate, cates } = this.props;
        return (
            <View style={rotateBigModalStyle.rotateModalBodyR}>
                <View style={rotateBigModalStyle.rotateModalBodyRDuty}>
                    <Text style={rotateBigModalStyle.rotateModalBodyRDutyT}>职务分类</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => onSelectCate({ index: -1, name: '全部' })}
                        style={currentCate.index === -1 ? rotateBigModalStyle.rotateModalBodyRItemActive : rotateBigModalStyle.rotateModalBodyRItem}
                    >
                        <Text
                            style={
                                currentCate.index === -1 ? rotateBigModalStyle.rotateModalBodyRItemTActive : rotateBigModalStyle.rotateModalBodyRItemT
                            }
                        >
                            全部
                        </Text>
                    </TouchableOpacity>
                    {cates.map((cate, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onSelectCate({ index: index, name: cate })}
                            style={
                                currentCate.index === index
                                    ? rotateBigModalStyle.rotateModalBodyRItemActive
                                    : rotateBigModalStyle.rotateModalBodyRItem
                            }
                        >
                            <Text
                                style={
                                    currentCate.index === index
                                        ? rotateBigModalStyle.rotateModalBodyRItemTActive
                                        : rotateBigModalStyle.rotateModalBodyRItemT
                                }
                            >
                                {cate}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export class ItemImgOther extends React.PureComponent {
    render() {
        const { staff, selected, onSelected } = this.props;
        return (
            <TouchableOpacity
                style={selected ? rotateBigModalStyle.servicerItemActive : rotateBigModalStyle.servicerItem}
                onPress={() => onSelected(staff)}
            >
                <View style={rotateBigModalStyle.servicerItemBox}>
                    <Image resizeMethod="resize"
                        source={getImage(staff.showImage, ImageQutity.staff, require('@imgPath/rotate-portrait.png'))}
                        style={rotateBigModalStyle.servicerItemImg}
                    />
                    <View style={rotateBigModalStyle.servicerInfo}>
                        <View style={rotateBigModalStyle.servicerItemNum}>
                            <Text numberOfLines={1} style={rotateBigModalStyle.servicerItemText}>
                                {staff.storeStaffNo}
                            </Text>
                        </View>
                        <View style={rotateBigModalStyle.servicerItemName}>
                            <Text style={rotateBigModalStyle.servicerItemText} numberOfLines={1}>
                                {staff.value}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class RotateStaffSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            staffsGroups: {},
            staffs4Select: [],
            cates: [],
            currentCate: { index: -1, name: '全部' },
            selectedStaff: {},
            selectedStaffs: [], //多选
            startState: true,
            selectAll: false,
            clearAll: false,
        };
    }
    UNSAFE_componentWillMount() {
        this.query();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { visible, excludeStaffs, includeStaffs } = nextProps;

        let isReset = visible == true && this.props.visible == false;
        if (isReset) {
            let staffs = this.getAllStaffs(this.state.staffsGroups);
            staffs = this.filterStaffs(staffs, excludeStaffs, includeStaffs,nextProps.type);
            let catesMap = staffs.reduce((result, staff) => {
                result[staff.positionInfo] = staff.positionInfo;
                return result;
            }, {});

            staffs.sort((a, b) => (a.storeStaffNo > b.storeStaffNo ? 1 : a.storeStaffNo < b.storeStaffNo ? -1 : 0));
            this.setState({
                staffsGroups: this.state.staffsGroups,
                cates: Object.keys(catesMap),
                selectedStaff: {},
                staffs4Select: staffs,
                currentCate: { index: -1, name: '全部' },
                selectedStaffs: [],
                selectAll: false,
                clearAll: false,
            });
        }
        this.setState({ visible });
    }
    onCancel = () => {
        this.props.onClose();
    };
    onConfirm = () => {
        if (!this.state.selectedStaffs.length) {
            Alert.alert('请选择员工！', '', [{ text: '确定', onPress: () => true }]);
        } else {
            this.props.onConfirm(this.state.selectedStaffs, this.props.type, this.state.clearAll);
        }
    };
    onSelectCate = cate => {
        let staffs = [];
        if (cate.name === '全部') {
            staffs = this.getAllStaffs(this.state.staffsGroups);
        } else {
            staffs = this.state.staffsGroups[cate.name];
        }
        staffs = this.filterStaffs(staffs, this.props.excludeStaffs, this.props.includeStaffs,this.props.type);
        staffs.sort((a, b) => (a.storeStaffNo > b.storeStaffNo ? 1 : a.storeStaffNo < b.storeStaffNo ? -1 : 0));
        this.setState({ staffs4Select: staffs, currentCate: cate, selectedStaff: {} });
    };
    filterStaffs = (orgStaffs, excludeStaffs, includeStaffs,type) => {
        if (excludeStaffs) {
            let exculdeMap = excludeStaffs.reduce(function(result, item) {
                result[item['staffId']] = item;
                return result;
            }, {});
            orgStaffs = orgStaffs.filter(item => !exculdeMap[item.id]);
        }
        if (includeStaffs) {
            if (type == 'add') {
                let inculdeMap = includeStaffs.reduce(function(result, item) {
                    result[item['staffId']] = item;
                    return result;
                }, {});
                orgStaffs = orgStaffs.filter(item => inculdeMap[item.id]);
            }
            if (type == 'delete') {
                orgStaffs = includeStaffs.reduce(function(result, includeStaff) {
                    let data = orgStaffs.find(x => x.id == includeStaff.staffId);
                    if (data) {
                        result.push(data);
                    } else {
                        result.push({ id: includeStaff.staffId, value: includeStaff.staffName });
                    }
                    return result;
                }, []);
            }
        }

        return orgStaffs;
    };
    onSelected = staff => {
        let exists = this.state.selectedStaffs.find(x => x.id == staff.id);
        if (exists) {
            this.setState({ selectedStaffs: this.state.selectedStaffs.filter(x => x.id != staff.id) });
        } else {
            this.setState({ selectedStaffs: [...this.state.selectedStaffs, staff] });
        }
    };
    getAllStaffs(groups) {
        let that = this;
        let staffs = [];
        Object.keys(groups).forEach(key => {
            staffs = staffs.concat(groups[key]);
        });
        return staffs;
    }
    query() {
        let that = this;
        const { storeId } = this.props;
        let cfk = 'cfk_' + storeId + '_staffs';
        return getServiceStaffs({ type: 'staff', cfk: cfk })
            .then(backData => {
                that.setState({
                    staffsGroups: backData.data,
                });
            })
            .catch(err => {
                showMessage('网络异常');
                console.log(err);
            });
    }
    sliceRows(staffs4Select) {
        let i,
            j,
            temparray,
            chunk = 5;
        let rows = [];
        for (i = 0, j = staffs4Select.length; i < j; i += chunk) {
            temparray = staffs4Select.slice(i, i + chunk);
            rows.push(temparray);
        }
        return rows;
    }
    selectAll = () => {
        if (this.state.selectAll) {
            this.setState({ selectedStaffs: [], selectAll: false });
        } else {
            this.setState({ selectedStaffs: [...this.state.staffs4Select], selectAll: true });
        }
    };

    render() {
        const { visible, onGoToSetting, isAdmin, type } = this.props;
        const { staffs4Select, staffsGroups, currentCate, cates, selectedStaffs, selectAll, clearAll } = this.state;
        //let cates = Object.keys(staffsGroups);
        let rows = this.sliceRows(staffs4Select);
        console.log('staff select model render');
        return (
            <Modal transparent={true} animationType={'fade'} onRequestClose={() => null} visible={visible}>
                <View style={rotateBigModalStyle.modalBackground}>
                    <View style={rotateBigModalStyle.rotateWrapper}>
                        <View style={rotateBigModalStyle.rotateModalTitle}>
                            <Text style={rotateBigModalStyle.rotateModalText}>{type == 'add' ? '选择上牌员工' : '选择下牌员工'}</Text>
                        </View>

                        {staffs4Select && staffs4Select.length ? (
                            <View style={rotateBigModalStyle.rotateModalBody}>
                                <FlatList
                                    data={rows}
                                    style={rotateBigModalStyle.rotateModalBodyL}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item }) => (
                                        <View style={rotateBigModalStyle.rotateModalBodyLRow}>
                                            {item.map((staff, index) => {
                                                let isSelected = selectedStaffs.find(item => item.id == staff.id);
                                                return <ItemImgOther key={index} staff={staff} onSelected={this.onSelected} selected={isSelected} />;
                                            })}
                                        </View>
                                    )}
                                />
                                <StaffPositions onSelectCate={this.onSelectCate} currentCate={currentCate} cates={cates} />
                            </View>
                        ) : (
                            <View style={rotateBigModalStyle.rotateModalBodyO}>
                                <Image resizeMethod="resize"  source={require('@imgPath/rotate-sp.png')} style={RotateSettingStyles.qsSetting} resizeMode={'contain'} />
                                <Text style={RotateSettingStyles.qsText}>没有数据</Text>
                                {isAdmin && (
                                    <TouchableOpacity onPress={onGoToSetting} style={RotateSettingStyles.settingBtn}>
                                        <Image resizeMethod="resize"
                                            source={require('@imgPath/setting_btn.png')}
                                            style={RotateSettingStyles.settingBtnImg}
                                            resizeMode={'contain'}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        <View style={rotateBigModalStyle.modalBtmOther}>
                            <View style={rotateBigModalStyle.modalBtmOtherLeft}>
                                <CheckBox
                                    left
                                    title="全选"
                                    iconType="materialdesignicons"
                                    checkedIcon="check-box"
                                    uncheckedIcon="check-box-outline-blank"
                                    containerStyle={rotateBigModalStyle.rotateModalRuleCheckbox}
                                    textStyle={rotateBigModalStyle.rotateModalText}
                                    checkedColor={'#111c3c'}
                                    uncheckedColor={'#999'}
                                    onPress={this.selectAll}
                                    checked={selectAll}
                                />
                                {type == 'delete' && (
                                    <CheckBox
                                        right
                                        iconType="materialdesignicons"
                                        checkedIcon="check-box"
                                        uncheckedIcon="check-box-outline-blank"
                                        containerStyle={rotateBigModalStyle.rotateModalRuleCheckbox}
                                        textStyle={rotateBigModalStyle.rotateModalText}
                                        checkedColor={'#111c3c'}
                                        uncheckedColor={'#999'}
                                        onPress={() => this.setState({ clearAll: !this.state.clearAll })}
                                        checked={clearAll}
                                        title="清空昨日轮牌"
                                    />
                                )}
                            </View>
                            <TouchableOpacity onPress={this.onCancel} style={[rotateBigModalStyle.modalBtmBtn, rotateBigModalStyle.modalCancelBtn]}>
                                <Text style={rotateBigModalStyle.modalBtmBtnText}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onConfirm} style={[rotateBigModalStyle.modalBtmBtn, rotateBigModalStyle.modalSuccessBtn]}>
                                <Text style={rotateBigModalStyle.modalBtmBtnText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        storeId: state.auth.userInfo.storeId,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export const RotateStaffSelectModal = connect(mapStateToProps, mapDispatchToProps)(RotateStaffSelect);
