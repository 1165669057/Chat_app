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
  TouchableHighlight,
  View,
  TextInput,
  ToastAndroid,
    ScrollView
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
    ModalDialog,
    } from './UIlib';
var NativeModule=require('./NativeModule/NativeUtil');
import {
    GuidePage,
    Main,
    }from './Page';
var Constant=require("./Constant");
var btntexts=["bookreader","test","ScrollingActivity","ActionBarTest","Share","rong"];
var shareTypes=[Constant.QQ,Constant.WEIXIN,Constant.WEIXIN_CIRCLE];
export default class Chat_app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname:"",
            pwd:"",
            modalVisible:false,
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
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    testModuleButton(){
        let btns=btntexts.map((value,i)=>{
             return(
                 <Button
                     key={i}
                     textStyle={{color:"#ffffff",fontSize:FontSize.font_main}}
                     style={styles.sty}
                     isWithOutLine={false}
                     onPress={()=>{
                            switch (value){
                                 case "bookreader":
                                    NativeModule.enter("com.chat_app.TestActivity");//
                                 break;
                                 case "test":
                                     Action.enterPush(this,NextView);
                                 break;
                                  case "ScrollingActivity":
                                     NativeModule.enter("com.chat_app.ScrollingActivity");
                                 break;
                                   case "ActionBarTest":
                                     NativeModule.enter("ActionBarTest");
                                 break;
                                 case "Share":
                                   this.refs["Modal"].setModalVisible(true);
                                   this.state.modalVisible=!this.state.modalVisible;
                                   break;
                                 case "rong":
                                      NativeModule.enter("com.rong.StartActivity");//
                                 break;
                            }
                     }}
                     children={value}
                     />
             )
        });
        return btns;
    }
    share(){
        var shareview=shareTypes.map((value,i)=>{
            return <Button
                     key={i}
                     onPress={()=>{
                              NativeModule.share(value,"你好世界","随时随地，联动你我，跨空间和时间，移动智能让生活变的简单和快速！","https://www.kancloud.cn/tag/%E7%AE%97%E6%B3%95",
                                            (platform,stu,errMessage)=>{
                                                  ToastAndroid.show(platform,ToastAndroid.LONG);
                                            });
                     }}
                     children={value}
                  />
        });
        return(<View style={styles._share}>
             {shareview}
        </View>)
    }
  render() {
    return (
      <View style={styles.container}>
        <TobBar
            middletext={"选择模块"}
            backImage={this.backImage.bind(this)}
            />
        <View style={[styles._centerv,{marginTop:20,}]}>
            <Text style={{fontSize:FontSize.font_main}}>输入模块名</Text>
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
          <ScrollView>
          <View style={styles._centerv}>
              <Text style={{fontSize:FontSize.font_main}}>模块附带</Text>
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
          {this.testModuleButton()}
          </ScrollView>
          <ModalDialog
              ref="Modal"
              background={"#0000004f"}
              childView={this.share()}
              chooseFinish={(stu)=>{
               }}
              title="提醒"
              content="Virtual DOM 在内存中是以对象的形式存在的，如果想要在这些对象上添加事件，就会非常简单。React 基于 Virtual DOM 实现了一个 SyntheticEvent （合成事件）层，"
              modalVisible={this.state.modalVisible}
              />
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
    _share:{
        height:100,
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
AppRegistry.registerComponent('Chat_app', () => StartApp);
AppRegistry.registerComponent('TestActivity', () => Main);
