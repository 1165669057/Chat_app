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
    View
    } from 'react-native';
import {
    Color,
    FontSize,
    Action,
    AddressList,
    CarouselPage,
    } from '../UIlib';
export default class React_native extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.imgs=[
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515499076081&di=c481f9dca2edd1c150ac5caa259e3f76&imgtype=0&src=http%3A%2F%2Fpic29.photophoto.cn%2F20131204%2F0034034499213463_b.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515499076081&di=b8071e13e223729f44238520114f769e&imgtype=0&src=http%3A%2F%2Fpic23.photophoto.cn%2F20120530%2F0020033092420808_b.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515499076081&di=cad2a42bae19d0ed078dfea2078e2030&imgtype=0&src=http%3A%2F%2Fpic33.nipic.com%2F20130907%2F13534366_092511672176_2.jpg"
            ]
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
            <View style={styles.container}>
                <CarouselPage
                    type={"img"}
                    childsImgs={this.imgs}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       // justifyContent: 'center',
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
