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
    TouchableHighlight,
    View,
    Image
    } from 'react-native';

export default class React_native extends Component {
    static propTypes = {
        middletext: PropTypes.any,
        backImage:PropTypes.any,
        bgcolor:PropTypes.any
    }

    static defaultProps = {
        middletext: "",
        backImage:()=>{},
        bgcolor:"#FA662D",
    }

    constructor(props) {
        super(props);
        this.state = {

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
    render() {
        return (
            <View style={[styles.container,{ backgroundColor:this.props.bgcolor}]}>
                    <TouchableHighlight
                        underlayColor="#00000000"
                        style={{flex:1,paddingLeft:10}}
                        onPress={()=>{this.props.backImage();}}
                        >
                        <Image
                            style={{width:10,height:34/2,}}
                            source={require("./imgs/backwhite.png")}
                            />
                    </TouchableHighlight>
                   <Text style={styles.middle_font}>
                    {this.props.middletext}
                   </Text>
                   <View style={{flex:1}} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height:45,
        alignItems: 'center',

        flexDirection:"row",
    },
    middle_font: {
        fontSize: 20,
        textAlign: 'center',
        flex:2,
        color:"#ffffff",
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


