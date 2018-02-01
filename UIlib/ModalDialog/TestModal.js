import React, { Component,PropTypes } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View ,
    StyleSheet,
    TouchableOpacity
    } from 'react-native';
class ModalExample extends Component {
    static propTypes = {
        background:PropTypes.any,
        modalVisible:PropTypes.any,
        childView:PropTypes.any,
        hiddenCallBack:PropTypes.any,
        title:PropTypes.any,
        content:PropTypes.any,
        chooseFinish:PropTypes.any,
    }
    static defaultProps = { //Ĭ��ֵ
        background:"#0000005f",//#0000005f
        modalVisible:false,
        childView:null,
        chooseFinish:()=>{},
        title:"",
        hiddenCallBack:()=>{}
    }
    componentWillReceiveProps(nextProps) {
      /* if(nextProps.modalVisible!==this.state.modalVisible){
              this.setState({
                  modalVisible:nextProps.modalVisible,
              })
        }*/
    }
    constructor(props) {
        super(props);
        this.state = {modalVisible: this.props.modalVisible};
    }
    componentDidMount() {
        this.setState({modalVisible: this.props.modalVisible});
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    okPress(){
        this.setState({modalVisible: false});
        this.props.chooseFinish(true);
    }
    noPress(){
        this.setState({modalVisible: false});
        this.props.chooseFinish(false);
    }
    render() {

        return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                         this.setModalVisible(!this.state.modalVisible);
                         this.props.hiddenCallBack();
                    }}
                    >
                    <View style={[styles.container,{  backgroundColor:this.props.background,}]}>
                        {this.props.childView?this.props.childView:
                              <View style={styles.child}>
                                  <Text style={styles.text}>{this.props.title}</Text>
                                  <Text style={styles.content}>{this.props.content}</Text>
                                  <View style={styles.view}>
                                      <TouchableOpacity style={styles.ok}
                                            onPress={this.okPress.bind(this)}
                                          >
                                          <Text style={styles.text}>确认</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity style={styles.no}
                                                        onPress={this.noPress.bind(this)}
                                          >
                                          <Text style={[styles.text,{color:"#FA662D"}]}>取消</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>
                        }
                    </View>
                </Modal>
        );
    }
}
const styles = StyleSheet.create({
    view:{
        flexDirection:"row",
        justifyContent:'flex-end',
        alignItems: 'center',
        paddingTop:8,
        paddingBottom:8,
    },
    ok:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    no:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        marginLeft:12,
        marginRight:12,
        marginTop:12,
        marginBottom:12,
        color:"#000000",
        fontSize:18,
        textAlign:"center",
    },
    content:{

       paddingLeft:12,
        paddingRight:12,
        fontSize:16,
    },
    child:{
        borderColor:"#cccccc",
        borderWidth:0.5,
        backgroundColor:"#ffffff",
        width:300,
        justifyContent: 'center',
        borderRadius:4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});
module.exports=ModalExample;