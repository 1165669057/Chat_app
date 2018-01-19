/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component,PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    InteractionManager,
    Text,
    View,
    ToastAndroid
    } from 'react-native';
import FontSize from '../fontSize';
import Color from '../color';
import { Navigator } from 'react-native-deprecated-custom-components';
require("react-native-deprecated-custom-components");
var TopTitle=require('./TopTitle');
var BottomTitle=require('./BottomTitle');
var ChildView=require("./ChildView");
export default class React_native extends Component {
    static propTypes = {
        navTitles:PropTypes.any, //标题数组
        navigator:PropTypes.any,//最上层页面的导航
        index:PropTypes.any,//默认显示下标
        childViews:PropTypes.any,
        typeShow:PropTypes.any,
        imageUrisOn:PropTypes.any,
        imageUrisOff:PropTypes.any,
    }
    static defaultProps = { //默认值
        navTitles:["one","two","three","four",],
        childViews:[View],
        index:0,
        imageUrisOff:[require('./imgs/weixin1.png'),require('./imgs/friend1.png'),require('./imgs/qq1.png'),require('./imgs/weibo1.png')],
        imageUrisOn:[require('./imgs/weixin2.png'),require('./imgs/friend2.png'),require('./imgs/qq2.png'),require('./imgs/weibo2.png')],
        typeShow:'top',
    }
    constructor(props) {
        super(props);
        this.code=[];
        this.childlist=[];
        if(this.props.navTitles.length!==this.props.childViews.length){
            for(let i=0;i<this.props.navTitles.length;i++){
                if(i<this.props.childViews.length){
                    continue;
                }
                this.props.childViews.push(View);
            }
        }
        for(let i=0;i<this.props.navTitles.length;i++){
            this.code[i]={
                change:i,
            }
        }
        this.state = {}
    }
    componentWillReceiveProps() {
    }
    componentWillMount() {

    }
    componentDidMount(){

    }
    componentWillUnmount() {
    }
    onTabWillFocus(route){
        if(this.TopTitleObj){
            this.TopTitleObj.startAnimated(route.change);
            var  scrollto=this.TopTitleObj.widthAVG*route.change-this.TopTitleObj.widthAVG;
            this.TopTitleObj.refs["SCROLL"].scrollTo({x:scrollto,y:0,animated:true});
        }
        if(this.BottomTitleObj){
           this.BottomTitleObj.setState({
               curIndex:route.change,
            })
        }
    }
    onTabDidFocus(route){
        if (!this.childlist[route.change].state.showStu) {
           // InteractionManager.runAfterInteractions(()=> {
                this.childlist[route.change].setState({
                    showStu: true
                });
           // })
        }
    }
    renderScene(route, navigator){
        this._navigator =navigator;
        var Component=this.props.childViews[route.change];
        return <ChildView ref={(obj)=>{this.childlist.push(obj)}} childView={Component}/>
       //return  <Component navigator={this.props.navigator} />
    }
    clickIndex(index){
        this._navigator.jumpTo(this.code[index]);
        /*if(!this.childlist[index].state.showStu) {
            InteractionManager.runAfterInteractions(()=>{
                this.childlist[index].setState({
                    showStu: true
                });
            })
        }*/
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.typeShow=="top"?<TopTitle
                   ref={(obj)=>{this.TopTitleObj=obj}}
                   clickIndex={this.clickIndex.bind(this)}
                   navTitles={this.props.navTitles}
                   />:null}
                <View style={{flex:1}}>
                    <Navigator
                        style={{flex:1}}
                        ref={(navigator)=>{this._navigator=navigator;}}
                        initialRoute={this.code[this.props.index]}
                        renderScene={this.renderScene.bind(this)}
                        configureScene={this.configureScene.bind(this)}
                        initialRouteStack={this.code}
                        onWillFocus={this.onTabWillFocus.bind(this)}
                        onDidFocus ={this.onTabDidFocus.bind(this)}
                        />
                </View>
                {
                    this.props.typeShow=="bottom"?
                        <BottomTitle
                            navTitles={this.props.navTitles}
                            clickIndex={this.clickIndex.bind(this)}
                            imageUrisOn={this.props.imageUrisOn}
                            imageUrisOff={this.props.imageUrisOff}
                            ref={(obj)=>{this.BottomTitleObj=obj}}
                            />:null
                }
            </View>
        );
    }
    configureScene(route) {
        //Navigator.SceneConfigs.FloatFromRight
        return Navigator.SceneConfigs.HorizontalSwipeJump;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
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
