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
    Animated,
    View,
    Image
    } from 'react-native';
var {height, width} = Dimensions.get('window');
export default class React_native extends Component {
    static propTypes = {
        childsImgs:PropTypes.any,
        height:PropTypes.any,
        type:PropTypes.any,
    }
    static defaultProps = {
       height:200,
        childsImgs:["yellow","red","blue"],
        type:"view"
    }
    constructor(props) {
        super(props);
        this.state = {
             images:this.props.childsImgs,
             length:3,
            isNeedRun:true,
            offsetX:0,
        }
        this._index=0;
    }
    componentWillReceiveProps(nextProps) {
           if(this.state.images!==this.props.childsImgs){
               this.setState({
                   images:nextProps.childsImgs
               })
           }
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
            images:this.props.childsImgs
        })
         this.timer=setInterval(()=>{
              if(this._index==this.props.childsImgs.length){
                  this._index=0;
              }
              this._scrollView.scrollTo({x:this._index*width,y:0,animated:true})
              this._index++;
          },2000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
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
        var plotting_scale=this._contentOffsetX / width;//得到视图比例
        let curValue=13*plotting_scale;
            if(this._contentOffsetX>(this.props.childsImgs.length-1)*width+width/2){
                this._scrollView.scrollTo({x:0,y:0,animated:true})
                curValue=0;
            }

        this.setState({
            offsetX: curValue,
        });
    }

    setImages(){
        let images = this.state.images.map((value,i) => {
            if(this.props.type=="view"){
                return (
                    <TouchableOpacity
                        underlayColor={"#0000005f"}
                        key={i}
                        onPress={()=>{}}>
                        <View
                            style={{width:width,height:this.props.height}}>
                        </View>
                    </TouchableOpacity>);
            }
            return (
                <TouchableOpacity
                    underlayColor={"#00000000"}
                    key={i}
                    onPress={()=>{}}>
                    <Image
                        source={{uri:value}}
                        style={{width:width,height:this.props.height}}>
                    </Image>
                </TouchableOpacity>);});
       return images;
    }
    point(){
        let points=this.props.childsImgs.map((value,i)=>{
            return(
               <View key={i} style={styles.pointsView}>
               </View>
            )
        })
        return points
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:this.props.height}}>
                <ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    style={[styles.scroll_v,{backgroundColor:this.state.lastColor,}]}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ref={(scrollView) => { this._scrollView = scrollView;}}
                    onScroll={this._onScroll.bind(this)}
                    >
                    <View style={{flexDirection:'row', marginRight:width}}>
                        {this.setImages()}
                    </View>
                 </ScrollView>
                    <View style={styles.smallPoint}>
                        <View style={{flexDirection:'row'}}>
                            {this.point()}
                            <View  style={[styles.pointsViewOn,{left:this.state.offsetX}]}/>
                       </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll_v:{
        width:width,
        height:20,
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
        backgroundColor: '#cccccc',
    },
    pointsView:{
        height:8,
        width:8,
        borderRadius:4,
        marginRight:5,
        backgroundColor: '#ffffff',
    },
    smallPoint:{
        justifyContent: 'center',
        alignItems: 'center',
        height:20,
        width:width,
        position:"absolute",
        flexDirection:"row",
        bottom:12,
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
