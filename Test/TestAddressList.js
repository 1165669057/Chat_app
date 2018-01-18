/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ToastAndroid,
    View
    } from 'react-native';
import {
    Color,
    FontSize,
    Action,
    AddressList
    } from '../UIlib';
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.listData=[
            '样式',
            '图片',
            '手势响应系统',
            '动画',
            '无障碍功能',
            '直接操作',
            '快速入门',
            '在Linux上使用React Native',
            '安卓环境配置',
            ' Linux和Windows支持',
            '新手引导',
            '使用指南',
             '样式',
            '图片',
        ]
        this.state = {}
    }

    componentWillReceiveProps() {

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <AddressList listData={this.listData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports=React_native;
