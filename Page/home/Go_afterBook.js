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
var NextView=require('../../Test/NextView')
export default class Go_afterBook extends Component {
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
            <View style={styles.container}>
                {/*<NextView/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // justifyContent: 'center',
       // alignItems: 'center',
       // backgroundColor: '#F5FCFF',
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

module.exports=Go_afterBook;
