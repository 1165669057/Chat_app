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
    View
    } from 'react-native';
import {
    Color,
    FontSize,
    TobBar,
    Button,
    MainNavigator,
    BackHandler,
    Action,
    ComplexList,
    } from '../UIlib';
var GuidePage=require('./guidePage/GuidePage');
 class React_native extends Component {
    constructor(props) {
        super(props);
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
            <MainNavigator
                Obj={GuidePage}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
//AppRegistry.registerComponent('MyTestProject', () => React_native);
