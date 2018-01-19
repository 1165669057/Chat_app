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
var TestAddressList=require('./TestAddressList');
var TestCarouselPage=require('./TestCarouselPage');
var TestCompleList=require('./TestCompleList');
var TestPickImg=require('./TestPickImg');
import {
    Color,
    FontSize,
    TobBar,
    Button,
    MainNavigator,
    BackHandler,
    Action,
    NavBar,
    AddressList,
    ComplexList
    } from '../UIlib';
var NativeModule=require('../NativeModule/NativeUtil');
var TestModal=require('./TestModal');
var App=require('./App');
class NextView extends Component {
    constructor(props) {
        super(props);
        this.titles=[];
        for(let i=0;i<10;i++){
            this.titles[i]='test'+i;
        }
        this.state = {}
    }
    componentWillReceiveProps() {
    }
    componentWillMount() {

    }
    componentDidMount() {
    }
    componentWillUnmount(){
    }
    backImage(){
        if(this.props.navigator){
            Action.popOver(this);
        }else{
            NativeModule.overFinish("TestActivity");
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TobBar
                    middletext={"testMessage"}
                    backImage={this.backImage.bind(this)}
                    />
                <NavBar
                    navTitles={ this.titles}
                    navigator={this.props.navigator}
                    index={0}
                    typeShow="top"
                    imageUrisOn={null}
                    imageUrisOff={null}
                    childViews={[TestModal,TestCompleList,TestAddressList,App]}
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
class MainApp extends Component{
    constructor(props) {
        super(props);
        this.titles=["文章","讨论","写作","我的"];
        this.state = {}
    }
    render(){
        return (
            <NavBar
                navTitles={ this.titles}
                navigator={this.props.navigator}
                index={0}
                typeShow="bottom"
                childViews={[NextView,TestPickImg,TestAddressList,App]}
                />
        )
    }
}
module.exports=MainApp;
