import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import colors from "../config/color";
import Searching from '../styles/SearchBarScreen';
import NiceButton from '../styles/button';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function WelcomeScreen({navigation}) {


    const [refreshing, setRefreshing] = useState(false);
    const [myFavorites, setFavorites] = useState(global.favorites);

    const onRefresh = React.useCallback(() => {
        setFavorites(global.favorites);
        setRefreshing(true);
        wait(10).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            onRefresh();

        });
    }, [navigation]);



    return (
        <View style={styles.container}>
            <View>
                <Searching navigation={navigation}/>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                key = {myFavorites}
            >
                {myFavorites.map((info) => {
                    return(
                        <NiceButton navigation={navigation} text={info[0]} artist={info[1]} picture={info[2]}/>
                    )
                })}
            </ScrollView>
            <Text style={styles.footer}>
                Nikola Bicanic | 11911340
            </Text>
        </View>
    );

}

export default WelcomeScreen;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    footer: {
        paddingTop: 10,
        paddingBottom: 15,
        textAlign: "center",
        color: colors.textNormal,
    },
    searching: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
    }
})