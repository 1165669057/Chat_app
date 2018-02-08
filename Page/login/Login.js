/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
var IO=require('socket.io-client');
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid
    } from 'react-native';
import {
    Color,
    FontSize,
    Action,
    AddressList,
    Button,
    CarouselPage,
    TobBar
    } from '../../UIlib';
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname:"",
            pwd:"",
        }
    }

    componentWillReceiveProps() {


    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    componentWillUnmount() {//

    }
    loginFetch(){
        var url='http://172.16.20.252:8085/doLogin';
        var formData = new FormData();
        formData.append("uname",this.state.uname);
        formData.append("upwd",this.state.pwd);
        ToastAndroid.show(JSON.stringify(formData),ToastAndroid.LONG);
             fetch(url,{
                 method: 'POST',
                 headers: {"Accept":"text/json"},
                 body: formData,})
            .then((response)=>response.json())
            .then((responseText)=>{
                ToastAndroid.show(JSON.stringify(responseText),ToastAndroid.LONG);
            }).catch((error)=>{
               ToastAndroid.show(error+"--",ToastAndroid.LONG);
            });
    }
    backImage(){
    }
    render() {
        return (
            <View style={styles.container}>
                <TobBar
                    bgcolor={"#03A9F4"}
                    middletext={"登入"}
                    backImage={this.backImage.bind(this)}
                    />
                <View style={[styles._centerv,{marginTop:20,}]}>
                    <Text style={{fontSize:FontSize.font_main}}>用户名:</Text>
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
                    <Text style={{fontSize:FontSize.font_main}}>密{"  "}码:</Text>
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
                    onPress={()=>{
                          this.loginFetch();
                     }}
                    children={"login"}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    line:{
        height:0.5,
        backgroundColor:"#cccccc",
        marginLeft:10,
    },
    sty:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        height:40,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:"#03A9F4"//Color.c_main
    },
    _inputview:{
        flex:1,
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
        // justifyContent: 'center',
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