import React, { Component } from 'react';
import { Modal,ToastAndroid, Text, TouchableHighlight, View ,StyleSheet} from 'react-native';
import {
    Color,
    FontSize,
    TobBar,
    Button,
    MainNavigator,
    BackHandler,
    Action,
    NavBar,
    AddressList,
    ComplexList,
    ModalDialog
    } from '../UIlib';
import {
    ImagePicker,
    NativeUtil,
    RNShare
    } from '../NativeModule';
var Constant=require('../Constant');
class ModalExample extends Component {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

  async  onPress(index){
        switch(index){
            case 0:
                this.setModalVisible(true);
                break;
            case 1:
                const images = await ImagePicker.pickMultiImage({"count":3, "width": 1280, "height": 1280});
                if (images) {
                    this.setState(
                        {pictrues:images
                        }
                    );
                }
                break;
            case 2:
                NativeUtil.share(Constant.QZONE,"你好世界","随时随地，联动你我，跨空间和时间，移动智能让生活变的简单和快速！","https://www.kancloud.cn/tag/%E7%AE%97%E6%B3%95",
                    (platform,stu,errMessage)=>{
                        ToastAndroid.show(platform,ToastAndroid.LONG);
                });
                break;
            case 3:
                NativeUtil.enter("ScrollingActivity");
                break;
            case 4:
                NativeUtil.enter("ActionBarTest");
                break;
        }
    }
    btns(){
       var btn=[];
        var text=["dialog","picker img","share QQ","ScrollingActivity","ActionBarTest"]
        for(let i=0;i<text.length;i++){
            btn[i]= <Button
                key={i}
                textStyle={{color:"#ffffff",fontSize:FontSize.font_main}}
                style={styles.sty}
                isWithOutLine={false}
                onPress={()=>{this.onPress(i)}}
                children={text[i]}
                />
        }
        return btn;
    }
    render() {
        return (
            <View style={{marginTop: 22}}>
                {this.btns()}
                <ModalDialog
                    chooseFinish={(stu)=>{
                    }}
                    title="提醒"
                    content="Virtual DOM 在内存中是以对象的形式存在的，如果想要在这些对象上添加事件，就会非常简单。React 基于 Virtual DOM 实现了一个 SyntheticEvent （合成事件）层，"
                    modalVisible={this.state.modalVisible}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
       // alignItems: 'center',
        backgroundColor: '#F5FCFF',

        marginLeft:50,
    },
    sty:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        height:40,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:Color.c_main
    },
});
module.exports=ModalExample;