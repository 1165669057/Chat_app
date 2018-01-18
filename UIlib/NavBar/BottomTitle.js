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
    Image,
    View,
    Dimensions,
    TouchableHighlight
    } from 'react-native';
var {height, width} = Dimensions.get('window');
export default class React_native extends Component {
    static propTypes = {
        navTitles:PropTypes.any,
        clickIndex:PropTypes.any,
        imageUrisOn:PropTypes.any,
        imageUrisOff:PropTypes.any,
    }
    static defaultProps = { //Ä¬ÈÏÖµ
        navTitles:["one","two","three","four","five"],
        imageUrisOn:[],
        imageUrisOff:[],
    }
    constructor(props) {
        super(props);
        this.state ={
            textColor:"#FA662D",
            curIndex:0,
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
    itemView(index,text){
          let itemWidth=width/this.props.navTitles.length;
          /*let curStyle={
              borderRadius:25,
              height:60,
              width:itemWidth,
              position:"absolute",
              bottom:0,
              left:itemWidth*2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:"#FA662D"
          }*/
          return (
             <TouchableHighlight
                 key={index}
                 underlayColor="#00000000"
                 style={[styles.item,{width:itemWidth}]}
                  onPress={()=>{
                    this.props.clickIndex(index);
                    this.setState({
                       curIndex:index,
                    })
                  }}
                 >
              <View style={styles.item}>
                    <Image
                         style={{width:30,height:30}}
                         source={index==this.state.curIndex?this.props.imageUrisOn[index]:this.props.imageUrisOff[index]}
                        />
                    <Text style={{
                       color:index==this.state.curIndex?this.state.textColor:null,

                    }}>{text}</Text>
              </View>
                 </TouchableHighlight>
          )
    }
    getItemView(){
        let item=[];
        for(let i=0;i<this.props.navTitles.length;i++){
            item[i]=this.itemView(i,this.props.navTitles[i]);
        }
        return item;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getItemView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        alignItems: 'center',
        justifyContent: 'center',
       // height:60,
    },
    container: {
       width:width,
        //justifyContent: 'center',
        alignItems: 'center',
        borderTopColor:"#cccccc",
        borderTopWidth:0.5,
        flexDirection:"row",
        paddingTop:5,
        paddingBottom:5,
        //height:60,
        backgroundColor: '#F5FCFF',//#F5FCFF
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
