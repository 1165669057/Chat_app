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
    View,
    Dimensions
    } from 'react-native';
var NextView=require('../../Test/NextView');
import {
    Color,
    FontSize,
    Action,
    AddressList,
    Button,
    CarouselPage,
    } from '../../UIlib';
import{
    NativeUtil
    }from "../../NativeModule"
 var Home=require("../home/Home");
var Login=require("../login/Login");
var {height, width} = Dimensions.get('window');
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            textColor:"#03A9F4"
        }
        this.imgs=[
            require('./img/bg_intro_1.png'),
             require('./img/bg_intro_2.png')
            ]
    }
    componentWillReceiveProps(){

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }

    fastLogin(){
       // NativeUtil.enter("com.rong.LoginActivity",null)
        Action.replacePush(this,Login);
    }
    onPress(){
        Action.replacePush(this,Home);
    }
    render() {//
        return (
            <View style={styles.container}>
                <CarouselPage
                    ref="CarouselPage"
                    type={"img"}
                    height={height}
                    auto={false}
                    scrollPage={(num)=>{
                             this.setState({
                               index:num
                             })
                    }}
                    pointBottom={75}
                    childsImgs={this.imgs}
                    />
                    <View style={styles.alignsty}>
                    <Button
                        textStyle={{color:this.state.index==0?"#03A9F4":"#EF5350",fontSize:FontSize.font_main}}
                        style={styles.sty}
                        isWithOutLine={false}
                        onPress={this.fastLogin.bind(this)}
                        children="快速登入"
                        />
                    <Button
                            textStyle={{color:this.state.index==0?"#03A9F4":"#EF5350",fontSize:FontSize.font_main}}
                            style={styles.sty}
                            isWithOutLine={false}
                            onPress={this.onPress.bind(this)}
                            children="直接进入"
                            />
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    alignsty:{
        width:width,
        position:"absolute",
        bottom:10,
        flexDirection:"row",
        paddingLeft:12,
        paddingRight:12,
        alignItems: 'center',
    },
    sty:{
        //marginLeft:20,
        marginRight:12,
        width:(width-12*3)/2,
        height:40,
         flex:1,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:"#ffffff"//Color.c_main
    },
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

module.exports=React_native;