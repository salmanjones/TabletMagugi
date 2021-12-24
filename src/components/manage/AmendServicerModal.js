//libs
import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    Alert
} from 'react-native';
import {
    SimulateKeyboardInpBox,
} from 'components';
//self
import { cashierBillingStyle, AmendServicerModalStyle } from '../../styles';

export class AmendServicerModal extends React.Component {

    render() {
        return (
            <View style={AmendServicerModalStyle.modalBackground}>
                <View style={AmendServicerModalStyle.cashierBillInfoWrapper}>
                    <View style={AmendServicerModalStyle.container}>
                        <View style={AmendServicerModalStyle.servicerBox}>
                            <View style={AmendServicerModalStyle.servicertitle}>
                                <Text style={cashierBillingStyle.servicerItemTitle}>服务人信息</Text>
                                {/* <View style={AmendServicerModalStyle.titleDeleteBox}>
                                    <Image resizeMethod="resize"  source={require('@imgPath/delete-icon-gray.png')} style={AmendServicerModalStyle.daleteIconImg} />
                                    <Text style={AmendServicerModalStyle.textColor9C}>删除</Text>
                                </View> */}
                                <View style={AmendServicerModalStyle.titleDeleteBox}>
                                    <Image resizeMethod="resize"  source={require('@imgPath/delete-icon-red.png')} style={AmendServicerModalStyle.daleteIconImg} />
                                    <Text style={AmendServicerModalStyle.textColorRed}>删除</Text>
                                </View>
                            </View>
                            <View style={AmendServicerModalStyle.servicerBoxBorder}>
                                {/* 未选择服务人 */}
                                <View style={AmendServicerModalStyle.serviceImgInfoBox} style={{ display: 'none' }}>
                                    <TouchableOpacity style={AmendServicerModalStyle.noServicerBox}>
                                        <Image resizeMethod="resize"  source={require('@imgPath/add-icon-gray.png')} style={AmendServicerModalStyle.addIconImg} />
                                    </TouchableOpacity>
                                    <View style={AmendServicerModalStyle.serviceTextInfoBox}>
                                        <Text style={AmendServicerModalStyle.textColor9C}>请选择服务人</Text>
                                    </View>
                                </View>
                                {/* 已选择服务人 */}
                                <View style={AmendServicerModalStyle.serviceImgInfoOtherBox}>
                                    <View style={AmendServicerModalStyle.servicerInfoBox}>
                                        <View style={AmendServicerModalStyle.redactBox}>
                                            <Image resizeMethod="resize"  source={require('@imgPath/redact-fff.png')} style={AmendServicerModalStyle.redactImg} />
                                        </View>
                                        <Image resizeMethod="resize"  source={require('@imgPath/rotate-portrait.png')} style={AmendServicerModalStyle.personImg} />
                                    </View>
                                    <View style={AmendServicerModalStyle.serviceTextInfoBox}>
                                        <Text style={AmendServicerModalStyle.textColor333}>杨田梅子</Text>
                                        <Text style={AmendServicerModalStyle.servicerNum}>045</Text>
                                        <View style={AmendServicerModalStyle.servicerGenreBox}>
                                            <Image resizeMethod="resize"  source={require('@imgPath/assign.png')} style={AmendServicerModalStyle.addTypeAssign} />
                                            <Text style={AmendServicerModalStyle.servicerGenreText}>指定</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={AmendServicerModalStyle.serviceTypeBox}>
                                    <View style={AmendServicerModalStyle.serviceTypeTitle}>
                                        <Text style={AmendServicerModalStyle.textColor333}>服务项目</Text>
                                    </View>
                                    <View style={AmendServicerModalStyle.serviceTypeName}>
                                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={AmendServicerModalStyle.text28Color333}>负离子营养烫发负离子负离子营养烫发负离子营养烫发负离子负离子营养烫发负离子负离子营养烫发负离子营养烫发负离子</Text>
                                    </View>
                                </View>
                                <View style={AmendServicerModalStyle.serviceClassifyBox}>
                                    <View style={AmendServicerModalStyle.serviceClassifyLiActive}>
                                        <View style={AmendServicerModalStyle.serviceClassifyTitleLi}>
                                            <Text style={AmendServicerModalStyle.textColor333}>职务</Text>
                                        </View>
                                        <View style={AmendServicerModalStyle.serviceClassifyNumLi}>
                                            <Text style={AmendServicerModalStyle.text28Color333}>10000</Text>
                                            <Image resizeMethod="resize"  source={require('@imgPath/redact-111c3c.png')} style={AmendServicerModalStyle.redactIconImg} />
                                        </View>
                                    </View>
                                    <View style={AmendServicerModalStyle.serviceClassifyLi}>
                                        <View style={AmendServicerModalStyle.serviceClassifyTitleLi}>
                                            <Text style={AmendServicerModalStyle.textColor333}>业绩</Text>
                                        </View>

                                        <View style={AmendServicerModalStyle.serviceClassifyNumLi}>
                                            <Text style={AmendServicerModalStyle.text28Color333}>10000</Text>
                                            <Image resizeMethod="resize"  source={require('@imgPath/redact-111c3c.png')} style={AmendServicerModalStyle.redactIconImg} />
                                        </View>
                                    </View>
                                    <View style={AmendServicerModalStyle.serviceClassifyLi}>
                                        <View style={AmendServicerModalStyle.serviceClassifyTitleLi}>
                                            <Text style={AmendServicerModalStyle.textColor333}>业绩</Text>
                                        </View>

                                        <View style={AmendServicerModalStyle.serviceClassifyNumLi}>
                                            <Text style={AmendServicerModalStyle.text28Color333}>10000</Text>
                                            <Image resizeMethod="resize"  source={require('@imgPath/redact-111c3c.png')} style={AmendServicerModalStyle.redactIconImg} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={AmendServicerModalStyle.servicerAccount}>
                                {/* 操作区域 */}
                                <TouchableOpacity style={AmendServicerModalStyle.backBtn}>
                                    <Text style={cashierBillingStyle.consumedBtnText}>返回</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={cashierBillingStyle.payBtn}>
                                    <Text style={cashierBillingStyle.consumedBtnText}>保存</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={AmendServicerModalStyle.consumeBox}>
                            {/* 右侧-标题 */}
                            <View style={AmendServicerModalStyle.consumeTitle}>
                                <Text style={AmendServicerModalStyle.textColor333}>选择服务人</Text>
                                <ImageBackground
                                    source={require('@imgPath/search-right.png')}
                                    style={AmendServicerModalStyle.consumeInpBox}
                                    resizeMode={'cover'}
                                >
                                    <TextInput
                                        placeholder="请输入员工店内编号"
                                        underlineColorAndroid="transparent"
                                        style={AmendServicerModalStyle.consumeInp}
                                    />
                                </ImageBackground>
                            </View>
                            <View style={AmendServicerModalStyle.consumeBoxBorder}>
                                <View style={{ flex: 1, display: 'none' }}>
                                    {/* 服务人职务类型 */}
                                    <View style={cashierBillingStyle.consumeOrderGenre}>
                                        <ScrollView>
                                            <View style={cashierBillingStyle.consumeOrderGenreLi}>
                                                <TouchableOpacity>
                                                    <Text style={cashierBillingStyle.consumeOrderGenreText}>发型师</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={cashierBillingStyle.consumeOrderGenreLi}>
                                                <TouchableOpacity>
                                                    <Text style={cashierBillingStyle.consumeOrderGenreText}>技师</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={cashierBillingStyle.consumeOrderGenreLi}>
                                                <TouchableOpacity>
                                                    <Text style={cashierBillingStyle.consumeOrderGenreText}>助理</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    {/* 服务人*/}
                                    <View style={cashierBillingStyle.servicerInfoBody}>
                                        <View style={AmendServicerModalStyle.servicerInfoBodyHeight}>
                                            <ScrollView>
                                                <View style={cashierBillingStyle.servicerImgBox}>
                                                    <View style={cashierBillingStyle.servicerDuty}>
                                                        <Text style={cashierBillingStyle.servicerDutyText}>
                                                            高级发型师
                      </Text>
                                                    </View>
                                                    <View style={cashierBillingStyle.servicerGroup}>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={cashierBillingStyle.servicerImgBox}>
                                                    <View style={cashierBillingStyle.servicerDuty}>
                                                        <Text style={cashierBillingStyle.servicerDutyText}>
                                                            明星发型师
                      </Text>
                                                    </View>
                                                    <View style={cashierBillingStyle.servicerGroup}>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={cashierBillingStyle.servicerItem}
                                                        >
                                                            <View style={cashierBillingStyle.servicerItemBox}>
                                                                <Image resizeMethod="resize"
                                                                    source={require('@imgPath/rotate-portrait.png')}
                                                                    style={cashierBillingStyle.servicerItemImg}
                                                                />
                                                                <View style={cashierBillingStyle.servicerInfo}>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        001
                            </Text>
                                                                    <Text style={cashierBillingStyle.servicerItemText}>
                                                                        杨田梅子
                            </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>
                                {/* 选择指定类型
                                <View style={AmendServicerModalStyle.btnBOX}>
                                    <View style={AmendServicerModalStyle.appointBtnBox}>
                                        <Image resizeMethod="resize"  source={require('@imgPath/assign.png')} style={AmendServicerModalStyle.appointBtnAssign} />
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.appointBtn}>
                                            <Text style={AmendServicerModalStyle.appointBtnText}>指定</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.unAppointBtn}>
                                        <Text style={AmendServicerModalStyle.appointBtnText}>非指定</Text>
                                    </TouchableOpacity>
                                </View>*/}
                                {/* 选择职务类型
                                <View  style={AmendServicerModalStyle.dutyBtnBOX} >
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.dutyBtnItemActive}>
                                            <Text style={AmendServicerModalStyle.dutyBtnText}>高级发型师</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.dutyBtnItem}>
                                            <Text style={AmendServicerModalStyle.dutyBtnText}>特级发型师</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.dutyBtnItemNoMargin}>
                                            <Text style={AmendServicerModalStyle.dutyBtnText}>创意总监</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.dutyBtnItem}>
                                            <Text style={AmendServicerModalStyle.dutyBtnText}>艺术总监</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.dutyBtnItem}>
                                            <Text style={AmendServicerModalStyle.dutyBtnText}>导师</Text>
                                        </TouchableOpacity>
                                </View>
                                */}
                                <View style={AmendServicerModalStyle.KeyboardBOX}>
                                    <View style={AmendServicerModalStyle.simulateKeyboardbox}>
                                        <Text style={AmendServicerModalStyle.textColor333}>提成：</Text>
                                        <Text style={AmendServicerModalStyle.simulateKeyboardTextActiveView}></Text>
                                    </View>
                                    <SimulateKeyboardInpBox/>
                                    <View style={AmendServicerModalStyle.simulateKeyboardBtnbox}>
                                        <TouchableOpacity underlayColor="white" style={AmendServicerModalStyle.backBtn}>
                                            <Text style={cashierBillingStyle.consumedBtnText}>取消</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity underlayColor="white" style={cashierBillingStyle.payBtn}>
                                            <Text style={cashierBillingStyle.consumedBtnText}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


