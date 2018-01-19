
import React, { Component } from 'react';
import  {DeviceEventEmitter} from 'react-native';
import {
	 View,
	 Text,
	 Image,
	 InteractionManager,
	 Animated,
	 TouchableHighlight,
	 StyleSheet,
	 ToastAndroid,
	 TextInput,
	 ScrollView,
	 ListView,
	Dimensions
 } from 'react-native';

var {height, width} = Dimensions.get('window');
 function copy(obj){
    return JSON.parse(JSON.stringify(obj));
 }
//声明一些属性和方法 
var propTypes={ 
   showType:React.PropTypes.oneOf([
     'GroidView',//以groidView方式显示
	 'ListView',//以listView方式显示
   ]),
   PageSize:React.PropTypes.number,//在groidView显示方式下 每行显示的item个数
   listData:React.PropTypes.array,//数据源
   renderRow:React.PropTypes.func,//单个item
	onScroll:React.PropTypes.func,
	onScrollEndDrag:React.PropTypes.func,
	scrollEnabled:React.PropTypes.bool,
}

 var RecyClerView=React.createClass({
    propTypes:propTypes,
    listData:[],
	rowStyle:{},//横向groidView item的view
	typeStyle:{
      flexDirection:'column',
      flexWrap:'wrap'	
	},
	getDefaultProps(){
	  return {
	     showType:'ListView',
		 PageSize:1,
		 listData:[],
		  scrollEnabled:true,
		  onScrollEndDrag:()=>{},
		 onScroll:()=>{},
		 renderRow:function(rowData,sectionID,rowID):Object{
		     return (
			    <View>
				</View>
			 );
		 },
	  } 
	},
	setData(data){
	  this.setState({
	    dataSource:this.state.dataSource.cloneWithRows(data),
	  });
	},
	componentWillReceiveProps(nextProps){
	    // console.log("<<<"+JSON.stringify(nextProps));
		 this.setState({
		      dataSource:this.state.dataSource.cloneWithRows(nextProps.listData),
		 });
	},
    getInitialState(){
	   var ds =new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
	   this.state={
	      stu:0,
		  dataSource:ds,
	   }
	   return this.state;
	},
	componentWillMount(){
	  this.rowStyle={
	     width:width/this.props.PageSize,
		 alignItems:'center',
		 justifyContent:'center',
	  }
	  //this.listData=this.props.listData;
	},
	
	componentWillUnmount(){
	  this.listData=[];
	},
	componentDidMount(){
	  InteractionManager.runAfterInteractions(()=>{
	          this.setState({
		         dataSource:this.state.dataSource.cloneWithRows(this.props.listData),
		      })

	  });
	},
	renderRow(rowData,sectionID,rowID){
	  var ReView;
	  if(this.props.showType=="ListView"){
	      ReView=(
		      <View>
		         {this.props.renderRow(rowData,sectionID,rowID)}
		      </View>
		  )
	  }else if(this.props.showType=="GroidView"){
	      ReView=(
		      <View style={this.rowStyle}>
		         {this.props.renderRow(rowData,sectionID,rowID)}
		      </View>
		  )	       
	  }
	  return ReView
	},
    render(){
	  var sty={};
	  if(this.props.showType=="ListView"){
	      sty=this.typeStyle;
	  }else if(this.props.showType=="GroidView"){
	      sty=styles.list_sty;
	  }
	  return(
		    <ListView
			  ref="LIST"
			  onScroll={this.props.onScroll}
			  onScrollEndDrag={this.props.onScrollEndDrag}
			  keyboardDismissMode={"on-drag"} 

			  dataSource={this.state.dataSource}
			  contentContainerStyle={
				sty
			  }
			  scrollEnabled={this.props.scrollEnabled}
			  renderRow={this.renderRow}			  
			/>
	  )
	},
 });
var styles=StyleSheet.create({
   _view:{
     backgroundColor:'#ffffff',
   },
   list_sty:{
    //justifyContent:'space-around',
	//alignItems:"center",
    flexDirection: 'row',
    flexWrap:'wrap'
	},
	   
})
module.exports=RecyClerView;