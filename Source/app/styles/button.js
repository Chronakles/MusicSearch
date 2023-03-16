import React, {Component} from 'react';
import colors from "../config/color";
import { StyleSheet, View, Text, Image } from 'react-native';
import {TouchableNativeFeedback} from "react-native";

export default class NiceButton extends Component {
    constructor(props){
        super(props);

        this.name = this.props.text;
        this.picture = this.props.picture;
    }
    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("API", {artist: this.props.artist})}>
                <View style={styles.button}>
                    <Image style={styles.image} source={
                        {
                            uri: this.picture,
                            width: "100%",
                            height: "100%",
                        }
                    }/>
                    <Text style={styles.buttonText}>
                        {this.name}
                    </Text>

                </View>
            </TouchableNativeFeedback>






        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingRight: 10,
        marginRight:15,
        marginLeft: 15,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonText:{
        color: colors.textNormal,
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
    },
})