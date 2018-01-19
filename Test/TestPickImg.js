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
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    PanResponder
    } from 'react-native';
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
    RecyClerView
    } from '../UIlib';
var {height, width} = Dimensions.get('window');
var NativeImagepicker=require('../NativeModule/imagepicker');
var NativeUtil=require('../NativeModule/NativeUtil');
//var ScrollViewEx = require('../NativeUi/scrollviewex');
import{
    StringText
    } from '../resource';
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.offset=0;
        this.list=[];
        this.count=15;
        this.state = {
            scr:true,
            scrchild:false,
            tach:"auto",
            pictrues:[{uri:"aa"}],
            modalVisible:false,
            groidData:["爽文","修炼","升级","文艺","学习","煽情","搞笑","科技"],
            listData:["爽文","修炼","升级","文艺","学习","煽情","搞笑","科技","爽文","修炼","升级","文艺","学习","煽情","搞笑","科技"],
            offsetTop:0,
        }
        this.offsetY=0;
    }
    componentWillReceiveProps() {
    }

    componentWillMount() {
        this._panResponder=PanResponder.create({
            //要求成为响应者:
            onStartShouldSetPanResponder:this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant:this._handlePanResponderGrant.bind(this),
            onPanResponderMove:this._handlePanResponderMove.bind(this),
            onPanResponderRelease:this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate:this._handlePanResponderEnd.bind(this),
        });
    }
    //当用户单击的时候
    _handleStartShouldSetPanResponder(e,gestureState){
        //AppUtils.showToast("aa");
        return true;
    }
    _handleMoveShouldSetPanResponder(e,gestureState){

        return true;
    }
    //当用户手指触摸屏幕时
    _handlePanResponderGrant(e,gestureState){
        this.tuchY=gestureState.y0;

    }

    direction(offsetY){
        if(offsetY>0){
            //this.refs["SCROLL"].scrollTo({x:0,y:-(offsetY),animated:true});
        }else if(offsetY<0){
            //this.refs["SCROLL"].scrollTo({x:0,y:Math.abs(offsetY),animated:true});
        }else if(Math.abs(offsetY)>=100){
           // this.refs["SCROLL2"].refs["LIST"].scrollTo({x:0,y:this.offsetY,animated:true});
            /*this.refs["SCROLL2"].refs["LIST"].setNativeProps({
                scrollEnabled:true
            });*/
        }
    }
    //当用户按下并移动手指时
    _handlePanResponderMove(e,gestureState){
        this.offsetY+=(gestureState.moveY-this.tuchY);
       this.direction(this.offsetY/2);
        /*if(this.offsetY>=100){
            //this.refs["SCROLL"].scrollTo({x:0,y:this.offsetY,animated:true});
            this.refs["SCROLL2"].refs["LIST"].setNativeProps({
                scrollEnabled:true
            });
            this.refs["SCROLL2"].refs["LIST"].scrollTo({x:0,y:this.offsetY,animated:true});
        }*/
        this.setState({
            txt:JSON.stringify(gestureState.moveY)+"test"+this.offsetY,
        })
    }

    //当用户手指抬起时
    _handlePanResponderEnd(e,gestureState){
        this.tuchUpY=gestureState.y0
        this.offsetY=0;

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    async onPickMultiImage() {
        const images = await NativeImagepicker.pickMultiImage({"count":3, "width": 1280, "height": 1280});
        if (images) {
            this.setState(
                {pictrues:images
                }
            );
        }
        /*this.setState({
            modalVisible:true
        })*/
        //NativeUtil.share("","aa");
    }
    backImage(){
           aa.f();
    }
    renderRow(rowData,sectionID,rowID){
        return(
            <View style={styles.row}>
                <View style={styles.TopImg}/>
                <Text>
                    {rowData}
                </Text>
            </View>
        )
    }
    listRow(rowData,sectionID,rowID){
        return(
            <View ref={"row"} style={styles.row}>
                <View style={styles.TopImg}/>
                <Text>
                    {rowData}
                </Text>
                <Text></Text>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <TobBar
                    middletext={this.state.offsetTop+"测试滚动列表"}
                    backImage={this.backImage.bind(this)}
                    />
                <ScrollView
                    {...this._panResponder.panHandlers}
                    showsVerticalScrollIndicator={false}
                    ref="SCROLL"
                    pointerEvents={this.state.tach}
                    onScroll={(e)=>{
                         var mScrlly=e.nativeEvent.contentOffset.y;
                         /*this.setState({
                               offsetTop:e.nativeEvent.contentOffset.y+"--"+mh,
                         })*/
                         if(e.nativeEvent.contentOffset.y>=100){
                           this.refs["SCROLL"].setNativeProps({
                              scrollEnabled:false
                           });
                           this.refs["SCROLL2"].refs["LIST"].setNativeProps({
                                scrollEnabled:true
                           });
                         }
                         // this.refs["SCROLL"].scrollTo({x:0,y:mScrlly,animated:true});
                    }}
                    scrollEnabled={true/*this.state.scr*/}
                    >
                     <RecyClerView
                        PageSize={4}
                        showType={'GroidView'}
                        listData={this.state.groidData}
                        renderRow={this.renderRow.bind(this)}
                        />
                    <View style={{height:height-126}}>
                        <RecyClerView
                        ref={"SCROLL2"}
                        PageSize={4}
                        showType={'ListView'}
                        listData={this.state.listData}
                        renderRow={this.listRow.bind(this)}
                          onScroll={(e)=>{
                           var m=e.nativeEvent.contentOffset.y;
                           //this.refs["SCROLL"].scrollTo({x:0,y:m,animated:true});
                           if(m<=0){
                             this.refs["SCROLL"].scrollTo({x:0,y:0,animated:true});
                              this.refs["SCROLL"].setNativeProps({
                                 scrollEnabled:true
                              });
                               /*this.refs["SCROLL2"].refs["LIST"].setNativeProps({
                                scrollEnabled:false
                              });*/
                           }
                        }}
                        scrollEnabled={false}
                        />

                        {/*<Text>
                            {StringText.text+""}
                        </Text>*/}
                    </View>
               </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contentContainer:{
        paddingVertical:20,
        height:height,
    },
    TopImg:{
        width:40,
        height:40,
        backgroundColor:"#FA662D",
    },
    row:{
        marginTop:8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:8,
        backgroundColor:"#ffffff",
    },
    img:{
      width:200,
        height:200,
    },
    sty:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        height:200,
        borderRadius:100,
        justifyContent:'center',
        width:200,
        backgroundColor:Color.c_main
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
       // alignItems: 'center',
        backgroundColor: '#F5FCFF',
        //padding:20,
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
