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
    Image,
    Modal,
    TouchableHighlight,
    ToolbarAndroid
    } from 'react-native';
import {
    ScrollViewPage
    } from '../../UIlib';
var Go_afterBook=require('./Go_afterBook');//追书
var Community=require('./Community');//社区
var Discover=require('./Discover');//发现
var Login=require('../login/Login');
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
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
    onActionSelected(index){
           switch(index){
               case 0:
                  this.setState({
                       modalVisible:true,
                   })
                   break;
               case 1:
                   break;
               case 2:
                   break;
           }
    }
    render() {
        return (
            <View style={styles.container}>
               <View style={styles.toolbar}>
                     <Image source={require('./img/home_ab_logo.png')} style={{width:164/2,height:44/2}}/>
                     <View style={{flex:1}}/>
                   <TouchableHighlight
                        onPress={()=>{this.onActionSelected(0)}}
                       >
                   <Image source={require('./img/ic_action_welfare.png')} style={{width:30,height:30,marginRight:20}}/>
                   </TouchableHighlight>
                   <TouchableHighlight
                       onPress={()=>{this.onActionSelected(1)}}
                       >
                   <Image source={require('./img/ic_action_search.png')} style={{width:30,height:30,marginRight:20}}/>
                  </TouchableHighlight>
                 <TouchableHighlight
                     onPress={()=>{this.onActionSelected(2)}}
                     >
                   <Image source={require('./img/ic_action_overflow.png')} style={{width:30,height:35}}/>
                   </TouchableHighlight>
               </View>
                <ScrollViewPage
                    titles={["追书","社区","发现"]}
                    scrollPage={(index,obj)=>{}}
                    pageViews={[Go_afterBook,Community,Discover]}
                    />
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                       this.setState({
                            modalVisible:!this.state.modalVisible
                       })
                    }}
                    >

                    <Login/>

                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:"#B93221",
        paddingTop:10,
        paddingBottom:30,
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:15,
        paddingRight:12,
    },
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