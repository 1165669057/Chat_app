/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
var PiwikTracker=require('./PiwikTracker');
var NextView=require('./Test/NextView');
import {
    Color,
    FontSize,
    TobBar,
    Button,
    MainNavigator,
    BackHandler,
    Action,
    ComplexList,
    } from './UIlib';
var NativeModule=require('./NativeModule/NativeUtil');
export default class Chat_app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname:"",
            pwd:"",
            text:"",
        }
    }
    componentWillReceiveProps() {
    }
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
   backImage(){
      // BackHandler.exitApp();
       //NativeModule.overFinish("TestActivity");
       BackAndroid.exitApp();
   }
  render() {
    return (
      <View style={styles.container}>
        <TobBar
            middletext={"登入"}
            backImage={this.backImage.bind(this)}
            />
        <View style={[styles._centerv,{marginTop:20,}]}>
            <Text style={{fontSize:FontSize.font_main}}>账号</Text>
            <View style={styles._inputview}>
                <TextInput
                    style={{fontSize:FontSize.font_main}}
                    onChangeText={(text)=>{
                         this.setState({
                         uname:text
                        })
                    }}
                    underlineColorAndroid="transparent"
                    value={this.state.uname}
                    />
            </View>
        </View>
          <View style={styles.line} />
          <View style={styles._centerv}>
              <Text style={{fontSize:FontSize.font_main}}>密码</Text>
              <View style={styles._inputview}>
                  <TextInput
                      style={{fontSize:FontSize.font_main}}
                      secureTextEntry={true}
                      onChangeText={(text)=>{
                        this.setState({
                           pwd:text
                        })
                    }}
                      underlineColorAndroid="transparent"
                      value={this.state.pwd}
                      />
              </View>
          </View>
          <Button
              textStyle={{color:"#ffffff",fontSize:FontSize.font_main}}
              style={styles.sty}
              isWithOutLine={false}
              onPress={this.onPress.bind(this)}
              children="login"
              />
          <Text>{this.state.text}</Text>
      </View>
    );
  }
    onPress(){
        //NativeModule.enter("TestActivity");
        Action.enterPush(this,NextView);
        //Action.enterPush(this,ComplexList);
       //PiwikTracker("http://localhost:8085/login");
        /*fetch('http://172.16.20.253/PhpUseApi/index.php/articleList?paramPage=0').then((response)=>response.json())
            .then((responseText)=>{
                ToastAndroid.show(JSON.stringify(responseText)+"",ToastAndroid.LONG);
            }).catch((error)=>{
                ToastAndroid.show(error.message+"");
            });*/
    }
}
const styles = StyleSheet.create({
    _inputview:{
        flex:1,
    },
    sty:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        height:40,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:Color.c_main
    },
    line:{
        height:0.5,
        marginLeft:10,
    },
    _centerv:{
        height:40,
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#ffffff"
    },
  container: {
    flex: 1,
    backgroundColor:Color.c_bg,
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

class StartApp extends Component{
    render(){
       return (
           <MainNavigator
               Obj={Chat_app}
               />
       )
    }
}
AppRegistry.registerComponent('TestActivity', () => NextView);
AppRegistry.registerComponent('Chat_app', () => StartApp);

