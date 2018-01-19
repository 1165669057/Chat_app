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
    Dimensions,
    Image
    } from 'react-native';
var {height, width} = Dimensions.get('window');
export default class React_native extends Component {
    static propTypes = {
        titles:PropTypes.any,
        heightTopView:PropTypes.any,
        clickTitle:PropTypes.any,
    }
    static defaultProps = {
        heightTopView:40,
        titles:["yellow","red","blue"],
        clickTitle:()=>{},
    }
    constructor(props) {
        super(props);
        this.state = {
            offsetX:0,
            textColorStu:0,
        }

    }

    componentWillReceiveProps() {

    }

    componentWillMount() {

    }
    setOffsetX(value,mIndex){
        this.setState({
             offsetX:parseFloat(width/this.props.titles.length)*value,
            textColorStu:mIndex,
         })
    }
    componentDidMount() {
        this.setOffsetX=this.setOffsetX.bind(this);
    }
    componentWillUnmount() {

    }
    title(){
        let titles=this.props.titles.map((value,i) => {
             return (
                 <TouchableHighlight
                     underlayColor={"#00000000"}
                     key={i}
                     style={{flex:1}}
                     onPress={()=>{this.props.clickTitle(i)}}>
                     <View style={styles.itemTitle}>
                         <Text style={{color:this.state.textColorStu==i?"#ffffff":"#0000005f"}}>{value}</Text>
                     </View>
                 </TouchableHighlight>
             )
        });
        return titles;
    }
    render() {
        return (
          <View style={{height:this.props.heightTopView+20,
           justifyContent: 'center',
           backgroundColor:"#B93221"
           }}>
            <View style={[styles.container,{height:this.props.heightTopView}]}>
                {this.title()}
            </View>
              <View style={[styles.logo,{left:this.state.offsetX,marginLeft:width/this.props.titles.length/2-10}]}>
                  <Image source={require('./img/book_topic_top_arrow_up.png')}style={styles.bottomimg}/>
              </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    bottomimg:{
        width:32/2,height:16/2,
        position:"absolute",
        bottom:0},
    itemTitle:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    logo:{
        width:20,
        height:20,
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        bottom:0,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"row",
        width:width,
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
