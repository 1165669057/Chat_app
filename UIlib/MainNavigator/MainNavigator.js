/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component,PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    BackHandler,
    ToastAndroid
    } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
//var Navigator=require('react-native-deprecated-custom-components');
import FontSize from '../fontSize';
import Color from '../color';
export default class React_native extends Component {
    static propTypes={
        Obj:PropTypes.any,
    }
    static defaultProps = {

    }
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillReceiveProps(){

    }
    componentWillMount(){
    }
    onBackAndroid(){
        var navigator = this._navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1){
            navigator.pop();
            return true;
        }else{
           // BackHandler.exitApp();

        }
        return false
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
    _renderScene(route,navigator){
        this._navigator=navigator;
        var  Component=route.component;
        return <Component
                {...route.params}
                stu={this.props.stu}
                navigator={navigator}
                index={route.index}
              />
    }
    configureScene(route) {
        //Navigator.SceneConfigs.FloatFromRight
        return Navigator.SceneConfigs.FloatFromRight;
    }
    render(){
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{component:this.props.Obj, index: 0,}}
                    renderScene={this._renderScene.bind(this)}
                    configureScene={this.configureScene.bind(this)}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       // justifyContent: 'center',
       // alignItems: 'center',
        backgroundColor: Color.c_bg,
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
