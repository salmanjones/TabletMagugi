// 员工轮牌设置主页
import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {cashierBillingStyle, rotateBigModalStyle, RotateSettingStyles} from '../../styles';
import {SearchModule, StaffSelectBoxV2,} from '../../components';
import {getImage, ImageQutity, showMessage} from '../../utils';
import {findStaffRotateInfoResult, saveStaffRotateInfoResult} from '../../services';

import {CheckBox} from 'react-native-elements';
import {AppNavigate} from "../../navigators";

export class RotateSettingStaffActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFilterKeyBoard: false,
            staffsGroups: {},
            staffs4Select: [],
            currentCate: { index: -1, name: '全部' },
            selectedStaff: {},
            checked: "0",
            settingState: false,
            staffSettingState: false,
            staffInfo:{},
            staffRotateInfo:[],
            rotateInfoList:[],
            searchKey:null
        };
    }
    //使用键盘过滤项目|外卖|服务人
    filterItemsByNum() {
        this.setState((prevState, props) => {
            prevState.showFilterKeyBoard = true;
            return prevState;
        });
    }
    //通过键盘进行查询
    queryByNumber(number = '') {
        buildQueryItems(this, number);
    }

    UNSAFE_componentWillMount() {
        //this.query();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    }

    onSelected = (staff) => {
        this.findStaffRotateInfoResult(staff);
    };

    typeStatChange = (item) => {
        item.checked=!item.checked;
        this.setState({rotateInfoList :[...this.state.rotateInfoList]});
	};

    rotateSave () {
        if(this.state.staffRotateInfo){
            let staffId = this.state.staffInfo.id;
            let companyId = this.state.staffInfo.companyId;
            let storeId = this.state.staffInfo.storeId;
            let rotateList = this.state.rotateInfoList;
            let checkIdStr = "";

            for(var i =0 ; i< rotateList.length ; i++){
                var rotateInfo = rotateList[i];
                if(rotateInfo.checked == true){
                    checkIdStr += rotateInfo.id + ",";
                }
            }

            this.saveStaffRotateInfoResult(staffId , companyId, storeId, checkIdStr);
        }
    };

    queryData = query => {

            this.setState({
                searchKey: query
            });

    };

    resetData = query => {
        this.setState({
            searchKey: null
        });
    };

    gotoPage  = () => {
        let params = {};
        AppNavigate.navigate('RotateSettingIndexActivity', params);
    };

    render() {

        let filter=this.state.searchKey?(staff=>staff.storeStaffNo=== this.state.searchKey):null;
        return (
            <View style={RotateSettingStyles.container}>
                <View style={RotateSettingStyles.staffTitleBox}>
                    <View style={RotateSettingStyles.staffLeftO}>
                        <Text style={RotateSettingStyles.titleText}>选择服务人</Text>
                        <SearchModule
                            placeholder={'请输入员工店内编号'}
                            onSearchPress={this.queryData}
                            onResetPress={this.resetData}
                            wrapperStyle={RotateSettingStyles.consumeInpBox}
                        />
                    </View>
                    <View style={RotateSettingStyles.staffRightTitle}><Text style={RotateSettingStyles.titleText}>员工VS轮牌</Text></View>
                </View>
                <View style={RotateSettingStyles.staffBodyBox}>
                    <View style={RotateSettingStyles.staffLeft}>
                        <View style={RotateSettingStyles.staffInfoBox}>
                            <StaffSelectBoxV2 option={{categoryPosition:'left'}}
                                onSelected={this.onSelected.bind(this)}
                                filter={filter}
                            />
                        </View>
                    </View>
                    <View style={RotateSettingStyles.staffRight}>
                        {
                            this.state.staffSettingState ? (
                                <View  style={RotateSettingStyles.staffRightContent}>
                                        <View style={RotateSettingStyles.servicerInfoContent}>
                                            <View style={RotateSettingStyles.servicerInfoBox}>
                                                <View style={RotateSettingStyles.servicerItemBox}>
                                                    <Image resizeMethod="resize"
                                                        source={getImage(
                                                            this.state.staffInfo.showImage,
                                                            ImageQutity.staff,
                                                            require('@imgPath/rotate-portrait.png')
                                                        )}
                                                        style={RotateSettingStyles.servicerItemImg}
                                                    />

                                                </View>
                                                <View style={RotateSettingStyles.servicerInfo}>
                                                    <Text style={[RotateSettingStyles.titleText, RotateSettingStyles.marginTop12]}>{this.state.staffInfo.value}</Text>
                                                    <Text style={[RotateSettingStyles.servicerItemText, RotateSettingStyles.marginTop12]} numberOfLines={1}>{this.state.staffInfo.position}</Text>
                                                    <View style={RotateSettingStyles.designerNumber}>
                                                        <Image resizeMethod="resize"  source={require('@imgPath/store-staff-No.png')} style={cashierBillingStyle.storeStaffImg}  resizeMode={'contain'}/>
                                                        <Text style={RotateSettingStyles.servicerNum} numberOfLines={1}>{this.state.staffInfo.storeStaffNo}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {
                                                this.state.settingState && this.state.rotateInfoList.length > 0 ? (
                                                    <FlatList
                                                        data={this.state.rotateInfoList}
                                                        numColumns={2}
                                                        initialNumToRender={10}
                                                        keyExtractor={(item, index) => index}
                                                        style={RotateSettingStyles.servicerSettingsBox}
                                                        renderItem={({ item }) => (
                                                            <CheckBox
                                                                    title={item.cardInfo.cardName}
                                                                    iconType = 'materialdesignicons'
                                                                    checkedIcon="check-box"
                                                                    uncheckedIcon="check-box-outline-blank"
                                                                    containerStyle={RotateSettingStyles.settingCheckBox}
                                                                    textStyle={rotateBigModalStyle.rotateModalText}
                                                                    checkedColor={'#111c3c'}
                                                                    uncheckedColor={'#999'}
                                                                    checked={item.checked}
                                                                    onPress={()=>this.typeStatChange(item)}
                                                                />
                                                        )}
                                                    />
                                                ) : (
                                                        <View style={RotateSettingStyles.servicerSettingsQs}>
                                                            <Image resizeMethod="resize"  source={require('@imgPath/rotate_setting_qs.png')} style={RotateSettingStyles.qsSetting} resizeMode={'contain'} />
                                                            <Text style={RotateSettingStyles.qsText}>还未设置轮牌，请前往轮牌设置</Text>
                                                            <TouchableOpacity style={RotateSettingStyles.settingBtn} onPress = {this.gotoPage.bind()}>
                                                                <Image resizeMethod="resize"  source={require('@imgPath/setting_btn.png')} style={RotateSettingStyles.settingBtnImg} resizeMode={'contain'} />
                                                            </TouchableOpacity>

                                                        </View>
                                                    )

                                             }

                                        </View>
                                    {
                                        this.state.settingState && (

                                            <View style={RotateSettingStyles.bottomBtnGroup}>
                                                <TouchableOpacity style={RotateSettingStyles.settingSaveBtn}
                                                    onPress = {this.rotateSave.bind(this)}
                                                >
                                                    <Text style={RotateSettingStyles.settingbtnText}>保存</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                </View>
                            ) : (
                                    <View style={RotateSettingStyles.staffRightContent}>
                                        <View style={RotateSettingStyles.nullContent}>
                                            <Image resizeMethod="resize"  source={require('@imgPath/rotate_choice_saff.png')} style={RotateSettingStyles.nullImage} resizeMode={'contain'} />
                                            <Text style={RotateSettingStyles.nullTextTip}>请选择员工</Text>
                                        </View>
                                    </View>
                                )
                        }
                    </View>
                </View>
            </View >
        );
    }

    findStaffRotateInfoResult = (staff) => {
        let staffId = staff.id;
        let companyId = staff.companyId;
        let storeId = staff.storeId;
        var self =this;

        findStaffRotateInfoResult(staffId ,companyId ,storeId)
        .then(data => {
            let staffRotateInfo = data.data.staffRotateInfo;
            let rotateInfoList = data.data.rotateInfoList;

            let rotateList = staffRotateInfo.rotateList;
            if(rotateList && rotateList.length > 0){
                for(var i =0 ; i< rotateInfoList.length ; i++){
                    var rotateInfo = rotateInfoList[i];
                    if(rotateList.indexOf(rotateInfo.id) != -1){
                        rotateInfo.checked = true;
                    }
                }
            }

            let isRotateInfoList = false;
            if(rotateInfoList && rotateInfoList.length > 0){
                isRotateInfoList = true;
            }

            self.setState((prevState, props) => {
                prevState.settingState = isRotateInfoList;
                prevState.staffSettingState = true;
                prevState.staffInfo = staff;
                prevState.staffRotateInfo = staffRotateInfo;
                prevState.rotateInfoList = rotateInfoList;
                return prevState;
            });
        }).catch(err => {
            self.setState((prevState, props) => {
                prevState.settingState = false;
                prevState.staffSettingState = true;
                prevState.staffInfo = staff;
                prevState.staffRotateInfo = [];
                prevState.rotateInfoList = [];
                return prevState;
            });
        });
    };

    saveStaffRotateInfoResult = (staffId ,companyId ,storeId ,checkIdStr) => {

        saveStaffRotateInfoResult(staffId ,companyId ,storeId ,checkIdStr)
        .then(data => {
            if(data.code == '6000'){
                showMessage('操作成功');
                // Alert.alert('操作成功！', '', [
                //     {
                //       text: '确定',
                //       onPress: () => {
                //         null;
                //       },
                //     },
                //   ]);
            }
        }).catch(err => {
            showMessage('操作异常');
        });
    };
}
