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
    TouchableOpacity,
    InteractionManager
    } from 'react-native';
import {
    ComplexList
    } from '../UIlib';
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.offset=0;
        this.count=5;
        this.list=[];
        this.state = {
            listData:[],
        }
    }
    componentWillReceiveProps() {

    }
    componentWillMount() {
    }
    getFetchData(){
        for(let i=0;i<this.count;i++){
            this.list[i+this.offset]={a:"a"+i+this.offset,b:["王建","鸟叔"]};
        }
        this.offset+=this.count;
        /*this.setState({
             listData:this.list,
        });*/
        this.refs["ComplexList"].dealWithData(this.list);
        this.refs["ComplexList"].stopRefresh();
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.getFetchData();
        });

    }
    componentWillUnmount() {

    }

    childSetData(index,rowChild){
        return rowChild[index].b;
    }
    renderRow(rowData, sectionID, rowID){
        return <TouchableOpacity
             onPress={()=>{
                      var newRowData="克隆"
                       this.refs["ComplexList"].updateRowData(rowData,sectionID,rowID,newRowData);
                     }
             }
            >
            <View style={styles.row}>
                <Text>{rowData}</Text>
            </View>
        </TouchableOpacity>
    }
    renderSectionHeader(sectionData, sectionID){
        return <TouchableOpacity onPress={()=>{
                      var newData={
                         a:"h",
                         b:sectionData.b
                      }
                     this.refs["ComplexList"].updateSectionData(sectionData,sectionID,newData);
        }
        }><View><Text>{sectionData.a}</Text></View></TouchableOpacity>
    }
    onEndReached(){
         this.getFetchData();
    }

    onRefresh(){
        this.offset=0;
        this.list=[];
        this.getFetchData();
    }

    render() {
        return (
            <View style={styles.container}>
                <ComplexList
                    ref={"ComplexList"}
                    sectionData={this.state.listData}
                    childSetData={this.childSetData.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    onRefresh={this.onRefresh.bind(this)}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    row:{
        flexDirection:"row",
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
