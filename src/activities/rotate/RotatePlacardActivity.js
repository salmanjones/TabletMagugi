//轮牌-首页
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { rotateItemStyles } from '../../styles';
import { getStoreDutys, updateDutyStaffs, updateDutyStaffStatus, sortDutyStaffs, batchSaveDutyStaffs, resetDutyStaffs } from '../../services';
import { RotateTitleRight, PlacardGroup, RotateOperateModal, RotateStaffSelectModal, ModalLoadingIndicator } from '../../components';
import { showMessage } from '../../utils';

// 空牌
class NullRotate extends React.PureComponent {
    render() {
        return (
            <View style={rotateItemStyles.nullBody}>
                <Image resizeMethod="resize"  source={require('@imgPath/rotate-null.png')} style={rotateItemStyles.nullImage} />
                <Text style={rotateItemStyles.nullTextTip}>空空如也～轮牌还没有设置哟！</Text>
            </View>
        );
    }
}

class RotatePlacard extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <RotateTitleRight navigation={navigation} />,
        };
    };
    constructor() {
        super();
        this.state = {
            datas: [],
            hasData: true,
            err: null,
            isLoading: true,
            isSaving: false,
            scrollEnabled: true,
            isAdmin: false,
            staffsSetting: [], // 员工轮牌设置

            showOperateModal: false, //操作Modal显示状态

            showStaffSelectModal: false, //员工选择Modal显示状态
            staffSelectType: 'add', //员工选择Modal类型
            includeStaffs: [], //员工选择包含的数据

            operate_selectedStaff: null, //选中的员工
            operate_selectedGroup: null, //选中的员工对应的牌组

            add_setting: null, //添加员工时对应setting
            sort_currentGroup: null,
        };
    }

    componentWillMount() {
        let that = this;
        console.log('RotatePlacard will mount');

        this.subscribeDidFocus = this.props.navigation.addListener('didFocus', () => {
            console.log('RotatePlacard focus');
            that.query();
        });
        //this.query();
    }

    onAddStaff = item => {
        let that = this;
        this.setState({
            showStaffSelectModal: true,
            staffSelectType: 'add',
            includeStaffs: that.state.staffsSetting,
        });
    };
    onDeleteStaff = () => {
        let that = this;

        let staffMap = this.getStaffMapFromGroup();
        let includeStaffs = Object.keys(staffMap).map(x => {
            return { staffId: x ,staffName:staffMap[x].staffName};
        });
        this.setState({
            showStaffSelectModal: true,
            staffSelectType: 'delete',
            includeStaffs: includeStaffs,
        });
    };

    onSelectStaffs=(staffs, type, clearAll) => {
        if (!staffs || !staffs.length) {
            this.setState({ showStaffSelectModal: false });
            return;
        }

        if (type == 'add') {
            this.onAddStaffFinish(staffs);
        } else if (type == 'delete') {
            this.onDeleteStaffFinish(staffs, clearAll);
        }
    };

    onAddStaffFinish = staffs => {
        let that = this;
        let effectGroupsMap = {};
        //let staffMap = this.getStaffMapFromGroup();

        staffs.forEach(staff => {
            //根据setting 找到对应的组
            let groups = that.getStaffRelatedGroups(staff);

            if (!groups) return;

            groups.forEach(group => {
                let newStaff = {
                    serviceStatus: 0, //服务状态
                    serviceStartTimeL: '', //服务开始时间
                    staffJobNum: staff.storeStaffNo || '', //工号
                    orderAmt: 0, //指定数量
                    staffId: staff.id, //staffid
                    staffName: staff.value, //staffname
                    staffImg: staff.showImage || '', //img
                    awayStatus: 0, //离开状态
                    awayStartTimeL: '', //离开开始时间
                    standStatus: 0, //看门状态
                    standStartTimeL: '',
                    standAccL: '',
                    isRed: 0, //是否红牌
                    isReal: false, //是否真正的状态
                    offWork: false, //未上班
                };

                if (!group.staffInfo) group.staffInfo = [];

                let setting = group.cardInfo;
                let index=group.staffInfo.findIndex(x => x.staffId == staff.id);
                if (index!==-1) {
                    group.staffInfo[index]=newStaff;
                    group.staffInfo = [...group.staffInfo];
                }else{
                    group.staffInfo = setting.addSort === '1' ? (group.staffInfo = [...group.staffInfo, newStaff]) : [newStaff, ...group.staffInfo];
                }

                //同步状态
                // if (staffMap[staff.id]) {
                //     let sameStaff = staffMap[staff.id];
                //     newStaff.serviceStatus = sameStaff.serviceStatus;
                //     newStaff.awayStatus = sameStaff.awayStatus;
                //     newStaff.standStatus = sameStaff.standStatus;
                // }
                effectGroupsMap[group._id] = group;
            });
        });

        let effectDatas = Object.keys(effectGroupsMap).map(key => effectGroupsMap[key]);
        this.batchSave(effectDatas, backData => {
            that.setState({
                datas: [...that.state.datas],
                showStaffSelectModal: false,
            });
        });
    };

    onDeleteStaffFinish = (staffs, clearAll) => {
        let that = this;
        let effectGroupsMap = {};
        staffs.forEach(staff => {
            let staffObj = null;
            this.state.datas.forEach(group => {
                if (!group.staffInfo) return;
                let targetStaff = group.staffInfo.find(x => x.staffId == staff.id);
                if (!targetStaff) return;

                staffObj = targetStaff;
                effectGroupsMap[group._id] = group;

                let setting = group.cardInfo;
                if (setting.lastRotate !== '0' || clearAll) {
                    group.staffInfo = group.staffInfo.filter(x => x.staffId != staff.id); //targetStaff={...targetStaff,offWork:true};//.offWork = true;
                }
            });

            this.updateStaffStatus({
                staff: staffObj,
                isSpread: true,
                spreadFields: {
                    serviceStatus: 0,
                    serviceStartTimeL: '',
                    orderAmt: 0,
                    awayStatus: 0,
                    awayStartTimeL: '',
                    standStatus: 0,
                    standStartTimeL: '',
                    standAccL: '',
                    isRed: 0,
                    isReal: false,
                    offWork: true,
                },
                curGroup: {},
            });
        });

        let effectDatas = Object.keys(effectGroupsMap).map(key => effectGroupsMap[key]);
        this.batchSave(effectDatas, backData => {
            that.setState({
                datas: [...that.state.datas],
                showStaffSelectModal: false,
            });
        });
    };

    onCloseSelectStaffModal=() => {
        this.setState({
            showStaffSelectModal: false,
        });
    };

    getStaffMapFromGroup = condition => {
        let staffMap = {};
        this.state.datas.forEach(group => {
            if (!group.staffInfo) return;
            let newMap = group.staffInfo.filter(condition || (() => true)).reduce((result, x) => {
                result[x.staffId] = x;
                return result;
            }, {});
            staffMap = { ...staffMap, ...newMap };
        });
        return staffMap;
    };

    getStaffRelatedGroups = staff => {
        if (!this.state.staffsSetting) return null;
        let staffsSetting = this.state.staffsSetting;
        let setting = staffsSetting.find(x => x.staffId === staff.id);
        if (!setting || !setting.rotateList) return null;

        return this.state.datas.filter(data => setting.rotateList.includes(data._id));
    };

    onPlacardSelected = (staff, group) => {
        if (!staff || staff.offWork) return;
        this.setState({
            showOperateModal: true,
            operate_selectedStaff: staff,
            operate_selectedGroup: group,
        });
    };

    onSaveSort = (id, staffs) => {
        let that = this;
        this.sortStaffs(id, staffs, backData => {
            let group = that.state.datas.filter(x => x._id === id)[0];
            group.staffInfo = staffs;

            that.setState({
                showOperateModal: false,
                datas: that.state.datas,
            });
        });
    };

    onStaffStatusChanged = (staff, group, operate) => {
        let that = this;
        let updateParams = { staff, fields: {}, isSpread: false, spreadFields: null, curGroup: group, actions: ['update'] };
        switch (operate) {
            case 'rotate':
                let nextServiceStatus = staff.serviceStatus === 1 ? 0 : 1;
                if (nextServiceStatus === 1) {
                    updateParams.fields = { serviceStatus: 1, serviceStartTimeL: new Date().getTime().toString(), isReal: true };
                    updateParams.isSpread = true;
                    updateParams.spreadFields = { serviceStatus: 1, isReal: false };
                } else {
                    updateParams.fields = { serviceStatus: 0, serviceStartTimeL: '', isReal: false };
                    updateParams.isSpread = true;
                    updateParams.spreadFields = { serviceStatus: 0, serviceStartTimeL: '', isReal: false };
                }
                break;
            case 'order':
                updateParams.fields = { orderAmt: staff.orderAmt + 1 };
                break;
            case 'cancelOrder':
                updateParams.fields = staff.orderAmt > 0 ? { orderAmt: staff.orderAmt - 1 } : {};
                break;
            case 'away':
                updateParams.fields = { awayStatus: 1, awayStartTimeL: new Date().getTime().toString(), isReal: true };
                updateParams.isSpread = true;
                updateParams.spreadFields = { awayStatus: 1, isReal: false };
                break;
            case 'cancelAway':
                updateParams.fields = { awayStatus: 0, awayStartTimeL: '', isReal: false };
                updateParams.isSpread = true;
                updateParams.spreadFields = { awayStatus: 0, awayStartTimeL: '', isReal: false };
                break;
            case 'red':
                let alreadyRed = staff.isRed === 1 && group.cardInfo.redCardSetting === '0';
                updateParams.fields = alreadyRed ? { isRed: 0 } : { isRed: 1 };
                updateParams.actions = alreadyRed ? ['update', 'last'] : ['update'];
                break;
            case 'cancelRed':
                updateParams.fields = { isRed: 0 };
                break;
            case 'stand':
                updateParams.fields = { standStatus: 1, standStartTimeL: new Date().getTime().toString(), isReal: true };
                updateParams.isSpread = true;
                updateParams.spreadFields = { standStatus: 1, isReal: false };
                break;
            case 'cancelStand':
                updateParams.fields = { standStatus: 0, standStartTimeL: '', isReal: false };
                updateParams.isSpread = true;
                updateParams.spreadFields = { standStatus: 0, standStartTimeL: '', isReal: false };
                break;
            case 'last':
                updateParams.actions = ['last'];
                break;
            case 'first':
                updateParams.actions = ['first'];
                break;
            case 'remove':
                updateParams.actions = ['remove'];
                if (staff.isReal) {
                    updateParams.actions = ['update', 'remove'];
                    updateParams.isSpread = true;
                    updateParams.spreadFields = { serviceStatus: 0 };
                }
                break;
        }

        let effectGroupsMap = {};
        if (updateParams.actions.includes('update')) {
            let groupsMap = this.updateStaffStatus(updateParams);
            effectGroupsMap = { ...effectGroupsMap, ...groupsMap };
        }
        if (updateParams.actions.includes('last')) {
            let theStaff = group.staffInfo.find(x => x.staffId == staff.staffId);
            group.staffInfo = group.staffInfo.filter(x => x.staffId != staff.staffId);
            group.staffInfo.push(theStaff);
            effectGroupsMap[group._id] = group;
        }
        if (updateParams.actions.includes('first')) {
            let theStaff = group.staffInfo.find(x => x.staffId == staff.staffId);
            group.staffInfo = group.staffInfo.filter(x => x.staffId != staff.staffId);
            group.staffInfo.unshift(theStaff);
            effectGroupsMap[group._id] = group;
        }
        if (updateParams.actions.includes('remove')) {
            group.staffInfo = group.staffInfo.filter(x => x.staffId != staff.staffId);
            effectGroupsMap[group._id] = group;
        }

        let effectDatas = Object.keys(effectGroupsMap).map(key => effectGroupsMap[key]);
        this.batchSave(effectDatas, backData => {
            that.setState({
                datas: [...that.state.datas],
                showOperateModal: false,
            });
        });
    };

    updateStaffStatus = updateParams => {
        let { staff, curGroup, fields, isSpread, spreadFields } = updateParams;
        let effectGroupsMap = {};
        for (let i = 0; i < this.state.datas.length; i++) {
            let group = this.state.datas[i];
            let staffs = group.staffInfo;
            let isCurrentGroup = curGroup._id == group._id;

            if (!staffs) continue;

            if (!isSpread && !isCurrentGroup) continue;

            for (let j = 0; j < staffs.length; j++) {
                if (staffs[j].staffId !== staff.staffId) continue;

                let updateFields = isCurrentGroup ? fields : spreadFields;
                staffs[j] = { ...staffs[j], ...updateFields };
                effectGroupsMap[group._id] = group;
            }
            group.staffInfo = [...group.staffInfo];
        }
        return effectGroupsMap;
    };

    onCloseOperateModal=() => {
        this.setState({
            showOperateModal: false,
        });
    }

    render() {
        const { datas, hasData, operate_selectedStaff, operate_selectedGroup, isLoading, isSaving, staffsSetting, isAdmin } = this.state;
        let { showOperateModal, showStaffSelectModal, staffSelectType, includeStaffs } = this.state;
        console.log("Rotate main page render")
        return (
            <View>
                <ModalLoadingIndicator text={isLoading ? '加载中' : isSaving ? '请求中' : ''} loading={isLoading || isSaving} />
                {hasData ? (
                    <View style={rotateItemStyles.FlatListBox}>
                        <View style={rotateItemStyles.FlatListTitle}>
                            <View style={rotateItemStyles.FlatListTitleL}>
                                <View style={rotateItemStyles.titleItem}>
                                    <View style={[rotateItemStyles.titleItemL, rotateItemStyles.titleLWait]} />
                                    <Text style={rotateItemStyles.grayText}>等待中</Text>
                                </View>
                                <View style={rotateItemStyles.titleItem}>
                                    <View style={[rotateItemStyles.titleItemL, rotateItemStyles.titleLService]} />
                                    <Text style={rotateItemStyles.grayText}>服务中</Text>
                                </View>
                                <View style={rotateItemStyles.titleItem}>
                                    <View style={[rotateItemStyles.titleItemL, rotateItemStyles.titleLFurlough]} />
                                    <Text style={rotateItemStyles.grayText}>临休中</Text>
                                </View>
                                <View style={rotateItemStyles.titleItem}>
                                    <View style={[rotateItemStyles.titleItemL, rotateItemStyles.titleLUsher]} />
                                    <Text style={rotateItemStyles.grayText}>迎宾中</Text>
                                </View>
                                <View style={rotateItemStyles.titleItem}>
                                    <View style={rotateItemStyles.titleAbsentee} />
                                    <Text style={rotateItemStyles.grayText}>未上班</Text>
                                </View>
                            </View>
                            <View style={rotateItemStyles.FlatListTitleR}>
                                <TouchableOpacity underlayColor="transparent" onPress={() => this.onAddStaff()} style={rotateItemStyles.titleRItem}>
                                    <Image resizeMethod="resize"
                                        source={require('@imgPath/rotate-sp-icon.png')}
                                        style={rotateItemStyles.titleRItemImg}
                                        resizeMode={'contain'}
                                    />
                                    <Text style={rotateItemStyles.titleRText}>上牌</Text>
                                </TouchableOpacity>
                                {isAdmin && (
                                    <TouchableOpacity
                                        underlayColor="transparent"
                                        onPress={() => this.onDeleteStaff()}
                                        style={rotateItemStyles.titleRItem}
                                    >
                                        <Image resizeMethod="resize"
                                            source={require('@imgPath/rotate-xp-icon.png')}
                                            style={rotateItemStyles.titleRItemImg}
                                            resizeMode={'contain'}
                                        />
                                        <Text style={rotateItemStyles.titleRText}>下牌</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <FlatList
                            // style={index%2==1?rotateItemStyles.scrollContentOdd:rotateItemStyles.scrollContent}
                            style={rotateItemStyles.scrollContentother}
                            data={datas}
                            initialNumToRender={datas.length}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => (
                                <PlacardGroup
                                    index={index}
                                    id={item._id}
                                    staffs={item.staffInfo || []}
                                    setting={item.cardInfo}
                                    onItemSeleted={staff => {
                                        this.onPlacardSelected(staff, item);
                                    }}
                                    onAddStaff={() => {
                                        this.onAddStaff(item);
                                    }}
                                    onSaveSort={(id, staffs) => {
                                        this.onSaveSort(id, staffs);
                                    }}
                                />
                            )}
                        />
                    </View>
                ) : (
                    <NullRotate />
                )}

                <RotateOperateModal
                    staff={operate_selectedStaff}
                    setting={operate_selectedGroup == null ? null : operate_selectedGroup.cardInfo}
                    group={operate_selectedGroup}
                    visible={showOperateModal || false}
                    isAdmin={isAdmin}
                    onChangeStatus={this.onStaffStatusChanged}
                    onClose={this.onCloseOperateModal}
                />
                <RotateStaffSelectModal
                    visible={showStaffSelectModal || false}
                    type={staffSelectType}
                    onGoToSetting={this.onGoToSetting}
                    isAdmin={isAdmin}
                    includeStaffs={includeStaffs}
                    onClose={this.onCloseSelectStaffModal}
                    onConfirm={this.onSelectStaffs}
                />

            </View>
        );
    }

    onGoToSetting=() => {
        this.props.navigation.replace('RotateSettingStaffActivity');
    }

    query() {
        console.log('query');
        let that = this;
        that.setState({ isLoading: true });
        getStoreDutys(null)
            .then(o => {
                if (!o.data || !o.data.groups || !o.data.groups.length) {
                    that.setState({
                        isLoading: false,
                        isAdmin: o.data.isAdmin,
                        staffsSetting: o.data.staffsSetting,
                        hasData: false,
                    });
                } else {
                    that.setState({
                        datas: o.data.groups,
                        isAdmin: o.data.isAdmin,
                        staffsSetting: o.data.staffsSetting,
                        hasData: true,
                        isLoading: false,
                    });
                }
            })
            .catch(err => {
                showMessage('网络异常');
                console.log(err);
                that.setState({ isLoading: false });
            });
    }

    addOrRemoveStaff(staff, id, type, addType, cb) {
        let that = this;
        let params = { ...staff, id: id, type: type, addType: addType };
        that.setState({ isSaving: true });
        updateDutyStaffs(params)
            .then(o => {
                cb && cb(o);
                that.setState({ isSaving: false });
            })
            .catch(err => {
                showMessage('网络异常');
                console.log(err);
                that.setState({ isSaving: false });
            });
    }

    batchSave(datas, cb) {
        let that = this;
        let params = { datas: datas };
        that.setState({ isSaving: true },()=>{
            setTimeout(()=>{
                batchSaveDutyStaffs(params)
                .then(o => {
                    cb && cb(o);
                    that.setState({ isSaving: false });
                })
                .catch(err => {
                    showMessage('网络异常');
                    console.log(err);
                    that.setState({ isSaving: false });
                });
            },1);
        });
        // batchSaveDutyStaffs(params)
        // .then(o => {
        //     cb && cb(o);
        //     that.setState({ isSaving: false });
        // })
        // .catch(err => {
        //     showMessage('网络异常');
        //     console.log(err);
        //     that.setState({ isSaving: false });
        // });
    }


    updateStaffStatue(staff, groupId, fields, cb) {
        let that = this;
        let params = { staffId: staff.staffId, groupId: groupId, fields: JSON.stringify(fields) };
        that.setState({ isSaving: true });
        updateDutyStaffStatus(params)
            .then(o => {
                cb && cb(o);
                that.setState({ isSaving: false });
            })
            .catch(err => {
                showMessage('网络异常');
                console.log(err);
                that.setState({ isSaving: false });
            });
    }

    sortStaffs(groupId, staffs, cb) {
        let that = this;
        let params = { id: groupId, newSortStaffs: JSON.stringify(staffs) };
        that.setState({ isSaving: true });
        sortDutyStaffs(params)
            .then(o => {
                cb && cb(o);
                that.setState({ isSaving: false });
            })
            .catch(err => {
                showMessage('网络异常');
                console.log(err);
                that.setState({ isSaving: false });
            });
    }
}

//mapping props
const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export const RotatePlacardActivity = connect(
    mapStateToProps,
    mapDispatchToProps
)(RotatePlacard);
