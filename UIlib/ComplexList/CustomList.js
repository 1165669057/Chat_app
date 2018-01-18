/**
 * Created by Administrator on 2017/10/13.
 */
'use strict';
import React, { Component,PropTypes } from 'react';

import {
    Image,
    LayoutAnimation,//布局出厂动画
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    ToastAndroid,
    RefreshControl,
    View,
    } from  'react-native';
var NativeModules = require('NativeModules');
var {
    UIManager,
} = NativeModules;

var NUM_SECTIONS = 100;
var NUM_ROWS_PER_SECTION = 10;
//---------------------------------------配置LayoutAnimation动画------------------------------------------
var animations = {
    layout: {
        spring: {
            duration: 750,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 0.4,
            },
        },
        easeInEaseOut: {
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        },
    },
};

var layoutAnimationConfigs = [
    animations.layout.spring,
    animations.layout.easeInEaseOut,
];
//---------------------------------------分割结束------------------------------------------

//----------------------------------------这行组件-----------------------------------------
var Thumb = React.createClass({
    getInitialState: function() {
        return {thumbIndex: this._getThumbIdx(), dir: 'row'};
    },
    componentWillMount: function() {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    },
    _getThumbIdx: function(){
        //四舍五入随机数
        return Math.floor(Math.random() * THUMB_URLS.length);
    },
    _onPressThumb: function() {
        var config = layoutAnimationConfigs[this.state.thumbIndex % layoutAnimationConfigs.length];
        LayoutAnimation.configureNext(config);
        this.setState({
            thumbIndex: this._getThumbIdx(),
            dir: this.state.dir === 'row' ? 'column' : 'row',
        });
    },
    render: function() {
        return (
            <TouchableOpacity
                onPress={this._onPressThumb}
                style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
                <Image style={styles.img} source={THUMB_URLS[this.state.thumbIndex]} />
                {this.state.dir === 'column' ?
                    <Text>
                        Oooo, look at this new text!  So awesome it may just be crazy.
                        Let me keep typing here so it wraps at least one line.
                    </Text> :
                    <Text>{this.props.text}</Text>
                }
            </TouchableOpacity>
        );
    }
});
//------------------------------------分割线----------------------------------------------
class CustomList extends Component {
    static info={
        title: 'list',
        description: 'Floating headers & layout animations.'
    }
    constructor(props) {
        super(props);
        //粘性头部
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        //行数据
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        //绑定listView的数据
        var dataSource = new ListView.DataSource({
            getRowData: getRowData,//行数据
            getSectionHeaderData: getSectionData,//粘性头部数据
            rowHasChanged: (row1, row2) => row1 !== row2,//根据每行数据比较判断listView 数据是否改变
            sectionHeaderHasChanged:(s1, s2) =>s1 !== s2,//根据每行粘性头部数据比较 判断数据是否改变
        });
         this.dataBlob = {};//原始比较数据源
         this.sectionIDs = [];//粘性头部索引
         this.rowIDs = [];//每行数据索引
        //注意 这是 初始ListView数据 绑定规则
        this.state={
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            headerPressCount:0,
            refreshing:false,
        }
    }
    //更新Section头部刷新
    updateSectionData(sectionData,sectionID,newData){
        this.dataBlob[sectionID]=newData;
        this.setState({
            dataSource:this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
        });
    }
    //更新RowData每行刷新
    updateRowData(rowData,sectionID,rowID,newData){
        var curText=this.rowIDs[sectionID][rowID]=sectionID+"-"+rowID;
        this.dataBlob[curText]=newData;
        this.setState({
            dataSource:this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
        });
    }
    dealWithData(data){
        var curData=this.props.sectionData;
        if(data){
            curData=data;
        }
        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        for (var ii = 0; ii <curData.length; ii++) {
            this.sectionIDs.push(ii);//每个表头的数据索引
            this.dataBlob[ii]=curData[ii];//真实数据源
            this.rowIDs[ii] = [];
            var childList=this.props.childSetData(ii,curData);
            for (var jj = 0; jj <childList.length; jj++) {
                this.rowIDs[ii].push(ii+"_"+jj);
                this.dataBlob[ii+"_"+jj] =childList[jj]
            }
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
        });
    }//Attempted to assign to readonly property
    componentWillReceiveProps(nextProps) {
             //this.props.sectionData=nextProps.sectionData;
             if(this.props.sectionData==nextProps.sectionData){
             }else{
                this.dealWithData(nextProps.sectionData,nextProps.childSetData);
             }

    }
    componentWillMount() {

    }
    componentDidMount() {
           this.dealWithData();
    }
    componentWillUnmount() {
    }
    //头部单击
    _onPressHeader() {
    }
    //头部布局！
    renderHeader(){
        return this.props.renderHeader();
    }
    renderFooter(){
        return this.props.renderFooter();
    }
    //粘性头部布局
    renderSectionHeader(sectionData, sectionID){
        return  this.props.renderSectionHeader(sectionData, sectionID);
    }
    //每行数据
    renderRow(rowData, sectionID, rowID){
        var curIndex=this.rowIDs[sectionID].indexOf(rowID);
        return this.props.renderRow(rowData,sectionID,curIndex);//<Thumb text={JSON.stringify(rowData)+"-"+sectionID+"-"+rowID}/>;
    }
    stopRefresh(){
        this.setState({
            refreshing:false,
        });
    }
    _onRefresh(){
        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.setState({
            refreshing:true,
        });
        this.props.onRefresh();
    }
    refreshControl(){
        return(
            <RefreshControl
                refreshing={this.state.refreshing}
                enabled={true}
                onRefresh={this._onRefresh.bind(this)}
                colors={["red","yellow","blue"]}
                />
        );
    }
    onEndReached(){
        this.props.onEndReached();
    }

    render() {
        return (
               <View style={{flex:1}}>
                   <ListView
                       dataSource={this.state.dataSource}
                       onChangeVisibleRows={(visibleRows, changedRows) => {
                           console.log("-----------"+{visibleRows, changedRows});
                       }}
                       renderHeader={this.renderHeader.bind(this)}
                       renderFooter={this.renderFooter.bind(this)}
                       renderSectionHeader={this.renderSectionHeader.bind(this)}
                       renderRow={this.renderRow.bind(this)}
                       initialListSize={10}
                       pageSize={5}
                       renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>{
                           var curIndex=this.rowIDs[sectionID].indexOf(rowID);
                         return <View />;
                       }}
                       onEndReached={this.onEndReached.bind(this)}
                       scrollRenderAheadDistance={200}
                       onEndReachedThreshold={50}
                       refreshControl={this.refreshControl()}
                       />
               </View>
        )
    }
}
//组件一些属性
CustomList.propTypes={
    sectionData:PropTypes.any,//粘性头部数据源
    dataRow:PropTypes.any,//行数据源
    childSetData:PropTypes.any,
    onEndReached:PropTypes.any,
    renderRow:PropTypes.any,
    renderHeader:PropTypes.any,
    renderFooter:PropTypes.any,
    renderSectionHeader:PropTypes.any,
    onRefresh:PropTypes.any,
}
//属性初始值
CustomList.defaultProps={
    sectionData:[],
    dataRow:[],
    onEndReached:()=>{},//滑动到底部
    childSetData:()=>{return []},
    renderHeader:()=>{return null},
    renderFooter:()=>{return null},
    onRefresh:()=>{}
}
//样式表
var styles = StyleSheet.create({
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#5890ff',
    },
    header: {//头部样式
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998',
        flexDirection: 'row',
    },
    listview: {
        backgroundColor: '#B0C4DE',
    },
});
module.exports=CustomList;