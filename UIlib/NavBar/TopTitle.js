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
    TouchableHighlight,
    ScrollView,
    Dimensions,
    Animated,
    ToastAndroid,
    PanResponder
    } from 'react-native';
import FontSize from '../fontSize';
import Color from '../color';
import { Navigator } from 'react-native-deprecated-custom-components';
var {height, width} = Dimensions.get('window');
export default class React_native extends Component {
    static propTypes = {
        navTitles:PropTypes.any,
    }
    constructor(props) {
        super(props);
        this.widthAVG=0;
        //计算总长度
       this.totalWidth=0;
        for(let i=0;i<this.props.navTitles.length;i++){
            this.totalWidth+=this.props.navTitles[i].length*FontSize.font_main;
        }
        //如果传入的标题个数长度大于 屏幕高度
        if(this.totalWidth>width){
            this.widthAVG=this.totalWidth/this.props.navTitles.length;
        }else{
            this.widthAVG=width/this.props.navTitles.length;
        }
        this.state = {
            moveText:0,
            trans:new Animated.Value(0),
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
    startAnimated(value){//开始动画
        Animated.timing(
            this.state.trans,
            {
                toValue:value,
                duration:10,
            }
        ).start((finish)=>{
                if(finish.finished){
                    //AppUtils.showToast("动画完成");
                }else{
                    //AppUtils.showToast("动画被打断！");
                }
            });
    }
     
    getViewTitle(index,text){
        return (
        <View key={index} style={{width:this.widthAVG}}>
            <TouchableHighlight
                underlayColor="#00000000"
                style={styles.titleTouch}
                onPress={()=>{
                        //屏幕显示个数
                    /*     var scrollto=0;
                         var num=parseInt(width/this.widthAVG)-1;
                        if(index%num==0){
                           scrollto=this.widthAVG*index-this.widthAVG;
                        }else{
                           scrollto=this.widthAVG*index-this.widthAVG;
                        }
                      this.refs["SCROLL"].scrollTo({x:scrollto,y:0,animated:true});
                       this.startAnimated(index);*/
                       this.props.clickIndex(index);
                }}
                >
                 <Text style={styles._font}>{text}</Text>
            </TouchableHighlight>

        </View>
        )
    }
    titleViews(titles){
      var curTitle=[];
       for(let i=0;i<titles.length;i++){
           curTitle[i]=this.getViewTitle(i,titles[i]);
       }
        return curTitle;
    }
    render() {
        return (
          <View>
          <View style={{height:49}}>
          <ScrollView ref={"SCROLL"} showsHorizontalScrollIndicator={false} horizontal={true}  style={{height:45}}>
             <View>
              <View style={styles.container}>
                {this.titleViews(this.props.navTitles)}
              </View>
                 <Animated.View
                     style={[
                       styles._line,
                       {width:this.widthAVG},
                       {
                         transform:[{
				           translateX:this.state.trans.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0,this.widthAVG]
                           })
	                     }]
                       }
                     ]}

                     />
             </View>
          </ScrollView>
          </View>
              <Text>{this.state.text}</Text>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    moreView:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _line:{
        height:4,
        backgroundColor:Color.c_main,
    },
    titleTouch:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },
    _font:{
       fontSize:FontSize.font_main,
    },
    container:{
        backgroundColor:Color.c_bg,
        height:45,
        flexDirection:"row"
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
