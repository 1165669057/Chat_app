var React=require('react-native');
var Button=require('../../modules/button');
var NavPub=require('../../lecture/util/navPub');
var PlatformBool=require('../../lecture/util/platformBool');
var AppUtils = require('../../modules/apputils');
var WordParam=require('./module/WordParam');

var {
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
	 PanResponder,
	 ListView,
 }=React;
 var strChineseFirstPY=WordParam.strChineseFirstPY;
 var ZIMU=[
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N',
  'O','P','Q','R','S','T','U','V','W','X','Y','Z',
 ];
//单个字母模块
var ZimuComponent=React.createClass({
   render(){
     return(
	  <View Style={[styles._alignItems,styles._justifyContent,styles._viewClick]}> 
	    <Text style={{textAlign:'center',fontSize:15,}}>
		    {this.props.text}
		</Text>
	  </View>
	 )
   }
});
//滑动字母模块
var GroupMemberSort=React.createClass({
   mH:parseInt((PlatformBool.HEIGHT-(45+44))/26),//单个高度
   getInitialState(){
     this.state={
	   stu:0,
	   toTop:0,
	 }
	 return this.state;
   },
   componentWillMount(){
       //重写PanResponder
       this._panResponder=PanResponder.create({
	      //要求成为响应者:
	     onStartShouldSetPanResponder:this._handleStartShouldSetPanResponder,
		 onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,
		 onPanResponderGrant:this._handlePanResponderGrant,
		 onPanResponderMove:this._handlePanResponderMove,
		 onPanResponderRelease:this._handlePanResponderEnd,
		 onPanResponderTerminate:this._handlePanResponderEnd,
	   }); 
   }, 
   //高亮显示
   _highlight(){

   },   
   //非高亮显示
   _unHighlight(){
     
   },
   //更新自身的背景状态
   _updateNativeStyles(){
   },
   //当用户单击的时候
   _handleStartShouldSetPanResponder(e,gestureState){
        //AppUtils.showToast("aa");   
        return true;
   },
   _handleMoveShouldSetPanResponder(e,gestureState){
     
	  return true;
   },
   //当用户手指触摸屏幕时
   _handlePanResponderGrant(e,gestureState){

   },
   //当用户按下并移动手指时
   _handlePanResponderMove(e,gestureState){
        var index=parseInt((parseInt(gestureState.moveY)-(45+44))/this.mH);
		this.props.moveTo(ZIMU[index]);
        this.setState({
		   txt:parseInt(gestureState.moveY)-(45+44),
		   stu:ZIMU[index],
		});
		//parseInt(gestureState.moveY/mH);
   },
   //当用户手指抬起时
   _handlePanResponderEnd(e,gestureState){
      clearTimeout(this.longClick);
      this.setState({
	     stu:0,
	  });
   },
	
   _viewCity(){
      var listZimu=[];
      for(let i=0;i<ZIMU.length;i++){
	      listZimu[i]=(
		     <ZimuComponent
			    index={i}
			    key={i}
			    text={ZIMU[i]}
			 />
		  )
	  }
	  return listZimu;
   },
   
   render(){
      return(
	   <View style={this.props.style}>
	    <View style={[styles._viewZimu,]}
		  {...this._panResponder.panHandlers}
		>
		    {this._viewCity()}
			<Text  style={styles.btnText}>{this.state.stu+""}</Text>
		</View>
		   {
		     this.state.stu==0?(<View/>):
		    (<View
			  style={styles.btnSty}
			 >
			   <Text  style={styles.btnText}>{this.state.stu+""}</Text>
			 </View>
			 )
			 }
	   </View>	
	  )
   }
});

var  TestGroup=React.createClass({
   oMultiDiff:WordParam.oMultiDiff,
   dataBlob:{},//数据标识
   sectionIDS:[],//粘性头部
   listData:["1",
             "3",
			 "安全",
			 "本来就是",
			 "同名",
			 "不会",
			 "安全",
          "同名",
		  "这是",
		  "这里",
		  "这样",
		  "这天",
		  "看见",
		  "同样",
		  "转的",
		  "属性",
		  "你好",
		  "原来",
		  "原生模块",
          "原生UI组件",
		  "使用链接库",
		  "在设备上运行",
		  "植入原生应用",
          "在原生和React",
		  "Native间通信",
		  "使用指南(Android)",
		  "原生模块",
          "原生UI组件",
		  "在设备上运行",
		  "植入原生应用",
		  "生成已签名的APK",
		  "调试AndroidUI性能",
		  "从源代码编译React Native",
		  "组件"],//粘性头部下的数据源
   currentData:[],
   useData:[],   
   getInitialState(){
  	  var getSectionData=function(dataBlob,sectionID){
         //规定返回的数据源格式
	     return dataBlob[sectionID];
	  };
	  var getRowData=function(dataBlob,sectionID,rowID){
	     return dataBlob[rowID];
	  };
	  //数据源ID	  
	  var ds = new ListView.DataSource({
	     getRowData:getRowData,
		 getSectionHeaderData:getSectionData,
	     rowHasChanged:(r1, r2) => r1 !== r2,
		 sectionHeaderHasChanged:(s1, s2) => s1 !== s2,
	  });
     this.state={
	    dataSource:ds.cloneWithRowsAndSections([]),
	 }	 
     return this.state;
   },
   componentWillMount(){
	   //重写PanResponder
	   this._panResponder=PanResponder.create({
		   //要求成为响应者:
		   onStartShouldSetPanResponder:this._handleStartShouldSetPanResponder,
		   onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,
		   onPanResponderGrant:this._handlePanResponderGrant,
		   onPanResponderMove:this._handlePanResponderMove,
		   onPanResponderRelease:this._handlePanResponderEnd,
		   onPanResponderTerminate:this._handlePanResponderEnd,
	   });
	   this.sortData();
   },

   componentDidMount(){
	  /* var test='http://piwik.17bangtu.com/piwik.php?' +
		   'url=|http://wx.17bangtu.com/lecture&' +
		   'idsite='+AppUtils.getVar("userid")+'&'+
		   'rec=1';
	   var url="http://piwik.17bangtu.com/piwik.php?url=|http://wx.17bangtu.com/lecture&idsite=1&rec=1&res=1280x1024&urlref=|http://wx.17bangtu.com/lecture"

	    fetch(url).then((response) => response.json())
		   .then((responseText) => {
			   AppUtils.showToast(responseText);
		   }).catch((error) => {
			   this.setState({
				   err:JSON.stringify(error)
			   })

		   });*/
 	   InteractionManager.runAfterInteractions(()=>{ 
	    this.finishData();
	    this.setState({
	     dataSource:this.state.dataSource.cloneWithRowsAndSections(this.dataBlob,this.sectionIDS,this.useData),
	    })
	   });
   },
   
  //构建数据源
   finishData(){
  //这里开始构建数据源,	
	  var rowID=[];
	  var num=0;//
	  for(var i=0;i<this.currentData.length;i++){
	     var sectionName=this.currentData[i];
		 this.sectionIDS[i]=sectionName;
		 this.dataBlob[sectionName]=sectionName;
		 rowID[i]=[];
	     for(var j=0;j<this.listData.length;j++){
		   if(this.currentData[i]==this.makePy(this.listData[j]).toUpperCase()){		   
		     var rowName=this.listData[j];		 
		     rowID[i][num]=rowName;
		     this.dataBlob[rowName]=rowName;
             num++;
		   }         	   
	     }
         num=0;		 
	  }
	  this.useData=rowID;
},
   sortData(){
      var objTag={}; 
	  var ll=0; 
	  for(var i=0;i<this.listData.length;i++){
	      var uni =this.makePy(this.listData[i]).charCodeAt(0);
		  if((uni>=65&&uni<=122)){
	        var headT=this.makePy(this.listData[i]).toUpperCase();
		    if(objTag[headT]){
		      continue;	
		    }else{
		      objTag[headT]=headT;
		    }		   
		    this.currentData[ll]=headT;
            ll++;
		  }else if(uni<=65){
		    this.currentData[ll]="小于A";
		  }
	  }
	  this.currentData.sort();//排序完成
    },
    makePy(str) {
        if (typeof(str) != "string") throw new Error( - 1,"函数makePy需要字符串类型参数!");
        var arrResult = new Array();
        for (var i = 0,len = str.length; i < len; i++) {
            var ch = str.charAt(i);
            arrResult.push(this.checkCh(ch));
        }
        //return this.mkRslt(arrResult);
       var rest = this.mkRslt(arrResult);
        return rest[0][0];
    },
    checkCh(ch) {
        var uni = ch.charCodeAt(0);
        if (uni > 40869 || uni <19968) return ch;
		//ToastAndroid.show(uni+"",ToastAndroid.SHORT);
        return (this.oMultiDiff[uni] ? this.oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
    },
    mkRslt(arr) { 
        var arrRslt = [""];	
        for (var i = 0,len = arr.length; i < len; i++) {
            var str = arr[i];
            var strlen = str.length;
            if (strlen == 1) {
                for (var k = 0; k < arrRslt.length; k++) {
                    arrRslt[k] += str;
                }
            } else {
                var tmpArr = arrRslt.slice(0);
                arrRslt = [];
                for (k = 0; k < strlen; k++) {
                    //复制一个相同的arrRslt
                    var tmp = tmpArr.slice(0);
                    //把当前字符str[k]添加到每个元素末尾
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j] += str.charAt(k);
                    }
                    //把复制并修改后的数组连接到arrRslt上
                    arrRslt = arrRslt.concat(tmp);
                }
            }  
        }
        return arrRslt; 
},
  //返回数据   
   backImage(){
     this.props.navigator.pop();
   },
  renderSectionHeader(sectionData,sectionID){
     return(
	   <View style={[styles.secSty,styles._justifyContent]}>
	       <Text style={[styles._font]}>
		       {sectionData}
		   </Text>
	   </View>
	 )
  },
  _renderRow(rowData,sectionID,rowID){
     return(
	   <View style={[styles._row,styles._alignItems,styles._rowSty]}>
	         <Image
			   style={{width:40,height:40,marginRight:10}}
			   source={require('./images/headimg.png')}
			 />
			 <Text style={[styles._font]}>{rowData}</Text>
	   </View>
	 )
  },
  moveTo(text){
    for(var i=0;i<this.currentData.length;i++){
      if(text==this.currentData[i]){
	    var size=(i+1)*30; 
	    for(var j=0;j<(i+1);j++){	  
		  size+=this.useData[j].length*60;
		}
	   size=size-(this.useData[i].length-1)*60;
	   size=size-(30+this.useData[0].length*60);
	   this.refs["SCROLL"].scrollTo({x:0,y:size,animated:true});
	  }
    }  
  },
  _onChangeVisibleRows(visibleRows, changedRows){
      AppUtils.showToast(visibleRows.length+"");
  },
  render(){
    return(
	   <View style={{flex:1,backgroundColor:"#ffffff"}}  >
		    <NavPub
			  goToLect={()=>{}}
              backImage={this.backImage}
              textMeddile="群成员"
			/>
			<View style={[styles._input,styles._row,styles._alignItems]}>
			   <Image
			      style={{width:38/2,height:38/2,marginRight:4,}}
				  source={require('../../message/pages/images/sousuo.png')}
			   />
			   <TextInput
			     ref={"INPUT"}
			     underlineColorAndroid={'transparent'}
			     style={[styles._font,{flex:1,marginBottom:0.5}]}
			     onChangeText={(text)=>{
				    this.setState({
			          input:text,
			        });
				 }}
				 placeholderTextColor={"#e2e2e2"} 
				 placeholder="搜索"
			     value={this.state.input}
			   /> 
			</View>
		   <Text> {this.state.err}</Text>
            <ListView
				scrollEnabled={true}
				ref={"SCROLL"}
                style={{flex:1}}
			    onScrollEndDrag={(event)=>{
			     //this._handleEndDrag(event,this._scrollView);
			  }}
              onChangeVisibleRows={this._onChangeVisibleRows}			  
			  renderSectionHeader={this.renderSectionHeader}		 
			  dataSource={this.state.dataSource}
			  renderRow={this._renderRow}
			  initialListSize={16}
              pageSize={4}			  
			/>
		   {/*<WebView
				source={{uri:'http://piwik.17bangtu.com/piwik.php?url=|http://wx.17bangtu.com/lecture&idsite=1&rec=1&res=1280x1024&urlref=|http://wx.17bangtu.com/lecture'}}
				/>*/}
             {
			   <GroupMemberSort
			     moveTo={this.moveTo}
			     style={{position:"absolute",top:0,left:0,right:0,bottom:0}}
			   />
			 }			
	   </View>
	)
  },
	//-------------------------------------------分割线---------------------------------------------------------------------------------
	//高亮显示
	_highlight(){

	},
	//非高亮显示
	_unHighlight(){
	},
	//更新自身的背景状态
	_updateNativeStyles(){

	},
	//当用户单击的时候
	_handleStartShouldSetPanResponder(e,gestureState){
		return true;
	},

	_handleMoveShouldSetPanResponder(e,gestureState){
		return true;
	},
    downY:0,
	moveLength:0,
	//当用户手指触摸屏幕时
	_handlePanResponderGrant(e,gestureState){
		  this.downY=gestureState.dx;
	},
	//当用户按下并移动手指时
	_handlePanResponderMove(e,gestureState){
		//var index=parseInt((parseInt(gestureState.moveY)-(45+44))/this.mH);
		//this.moveTo(ZIMU[index]);
		/*this.setState({
			txt:parseInt(gestureState.moveY)-(45+44),
			stu:ZIMU[index],
		});*/
		//parseInt(gestureState.moveY/mH);
		 var heightLength=PlatformBool.HEIGHT+(gestureState.moveY-this.downY);
		this.refs["SCROLL"].scrollTo({x:0,y:heightLength,animated:true});
	},
	//当用户手指抬起时
	_handlePanResponderEnd(e,gestureState){
		clearTimeout(this.longClick);
		this.setState({
			stu:0,
		});
	},
});

var styles=StyleSheet.create({
     secSty:{
	   height:30,
	   paddingLeft:11,
	   paddingRight:11,
	   backgroundColor:PlatformBool.BG,
	 },
	 _input:{
	    paddingLeft:22/2,
		paddingRight:22/2,
	    backgroundColor:"#fdfdfd",
		borderBottomWidth:1,
		borderColor:"#ccc",
		height:88/2,
	 },
     _row:{
	   flexDirection: 'row',
	 },
	
	 _font:{
		fontSize:30/2,
        color:PlatformBool.FONTCOLOR,		
	 },	 
    btnText:{
	    color:'#ffffff',
		fontSize:30,
		fontWeight:"bold",
	},
    _viewZimu:{
	   backgroundColor:"#00000000",
	   height:PlatformBool.HEIGHT,
	   position:"absolute",
	   top:45+88/2,
	   right:0,
	   bottom:0,
	   left:PlatformBool.WIDTH-30,
	   width:30,
	},
	_rowSty:{
	    borderBottomWidth:0.5,
		borderColor:PlatformBool.LINECOLOR,
	    paddingLeft:11,
		paddingRight:11,
		height:60,
	},
	_alignItems:{
	   alignItems:"center", 
	 },
	 _justifyContent:{
	   justifyContent:"center", 
	 },
	 _viewClick:{
		width:60,
		backgroundColor:"#ffffff",
		height:parseInt((PlatformBool.HEIGHT-(45+44))/26),
	 },
     btnSty:{
	   height:80,
	   position:'absolute',
	   top:PlatformBool.HEIGHT/2-40,
	   left:PlatformBool.WIDTH/2-40,
	  
	   width:80,
	   backgroundColor:"#ccc",
	   borderColor:"#ccc",
	   borderRadius:4,
	   alignItems:'center',
	   justifyContent:'center',
	 }
});

