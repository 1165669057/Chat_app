/**
 * Sample React Native App  //I want do more things
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component,PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    TouchableHighlight,
    Animated,
    View,
    Image
    } from 'react-native';
var {height, width} = Dimensions.get('window');
var TitlesTopView=require('./TitlesTopView');
export default class React_native extends Component {
    static propTypes = {
        titles:PropTypes.any,
        heightTopView:PropTypes.any,
        auto:PropTypes.any,
        pointBottom:PropTypes.any,
        scrollPage:PropTypes.any,
        pageViews:PropTypes.any,
    }
    static defaultProps = {
        heightTopView:40,
        titles:["yellow","red","blue"],
        pageViews:[],
        auto:false,
        pointBottom:12,
        scrollPage:()=>{}
    }

    constructor(props) {
        super(props);
        this.state = {
            images:this.props.titles,
            length:3,
            isNeedRun:true,
            offsetX:0,
        }
        this._index=0;
        this.childPage=[];
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
        var obj=this;
        //重写PanResponder
        this._panResponder=PanResponder.create({
            //要求成为响应者:
            onStartShouldSetPanResponder:this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,
            onPanResponderGrant:this._handlePanResponderGrant.bind(obj),
            onPanResponderMove:this._handlePanResponderMove.bind(obj),
            onPanResponderRelease:this._handlePanResponderEnd.bind(obj),
            onPanResponderTerminate:this._handlePanResponderEnd2.bind(obj),
        });
    }
    componentDidMount(){
        this.setState({
            images:this.props.titles
        });
    }
    componentWillUnmount() {
        this.childPage=[];
    }
    //当用户单击的时候
    _handleStartShouldSetPanResponder(e,gestureState){
        return true;
    }
    _handleMoveShouldSetPanResponder(e,gestureState){
        return true;
    }
    //当用户手指触摸屏幕时
    _handlePanResponderGrant(e,gestureState){
        this.touchPointNum=gestureState.x0;
    }
    //当用户按下并移动手指时
    _handlePanResponderMove(e,gestureState){
    }
    _handlePanResponderEnd2(e,gestureState){

    }
    autoGo(stu,index){

    }
    //当用户手指抬起时
    _handlePanResponderEnd(e,gestureState){
        this.touchPointUp=gestureState.x0;
    }
    _onScroll(e){
        this._contentOffsetX = e.nativeEvent.contentOffset.x;//this._scrollView.contentOffset;
        this._index = Math.round(this._contentOffsetX / width);
        this.props.scrollPage(this._index,this.childPage[this._index]);
        var plotting_scale=parseFloat(this._contentOffsetX / width);//得到视图比例
        let curValue=(width/3)*plotting_scale;
        if(this._contentOffsetX>(this.props.titles.length-1)*width+width/2){
            //this._scrollView.scrollTo({x:0,y:0,animated:true})
            //curValue=0;
        }
        this.titlesTop.setOffsetX(plotting_scale, this._index);
        /*this.titlesTop.setState({
            offsetX: curValue,
        });*/
    }
    setImages(){
        let images = this.props.titles.map((value,i) => {
            if(!this.props.pageViews[i]){
                this.props.pageViews[i]=View;
            }
            var Page=this.props.pageViews[i];
            return (
                    <View key={i} style={{width:width,backgroundColor:value,flex:1}}>
                         <Page ref={(obj)=>{this.childPage[i]=obj}}/>
                    </View>
               );
        });
        return images;
    }

    render() {
        return (
            <View style={styles.container}>
                   <TitlesTopView
                       titles={this.props.titles}
                       heightTopView={this.props.heightTopView}
                       ref={(obj)=>{
                        this.titlesTop=obj;
                      }}
                      clickTitle={(index)=>{
                         this._scrollView.scrollTo({x:width*index,y:0,animated:true})
                      }}
                       />
                    <ScrollView
                        pagingEnabled={true}
                        horizontal={true}
                        style={[styles.scroll_v]}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ref={(scrollView) => { this._scrollView = scrollView;}}
                        onScroll={this._onScroll.bind(this)}
                        >
                        <View style={{flexDirection:'row',}}>
                            {this.setImages()}
                        </View>
                    </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll_v:{
        width:width,
        //height:20,
        flex:1,
    },
    pointsViewOn:{
        height:8,
        width:8,
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        borderRadius:4,
        marginRight:5,
        backgroundColor: '#ffffff',
    },
    pointsView:{
        height:8,
        width:8,
        borderRadius:4,
        marginRight:5,
        backgroundColor: '#0000008f',
    },
    smallPoint:{
        justifyContent: 'center',
        alignItems: 'center',
        height:20,
        width:width,
        position:"absolute",
        flexDirection:"row",

        backgroundColor: '#00000000',
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
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
