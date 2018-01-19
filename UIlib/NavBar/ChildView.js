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
    Image,
    View,
    ActivityIndicator
    } from 'react-native';
var ProgressBar = require('ProgressBarAndroid');
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStu:false
        }
    }

    componentWillReceiveProps() {

    }

    componentWillMount() {

    }

    componentDidMount() {
    }
    componentWillUnmount() {
       // this.state.showStu=false
    }
    render() {
        var ChildView=this.props.childView;
        return  this.state.showStu?(
            <View style={styles.container}>
               <ChildView/>
            </View>
        ):
         <View style={styles.container2}>
             <ActivityIndicator
                 size="large"
                 color={"#FA662D"}
                 style={[styles.centering, {backgroundColor: '#ffffff'}]} />
        </View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
       /// backgroundColor: '#F5FCFF',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    container2: {
        flex: 1,
       justifyContent: 'center',
      alignItems: 'center',
         backgroundColor: '#FFFFFF',
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
