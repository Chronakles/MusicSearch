import React, { Component } from 'react';
import {Text, View, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import color from "../config/color";
import ReadMore from "@fawazahmed/react-native-read-more";
import { MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default class APlbumScreen extends Component {
    constructor(props) {
        super(props);
        this.album = this.props.route.params.album;
        this.state = {
            loading: true,
            albumData: [],
            tracks: [],
        }
    }
    componentDidMount(){
        const baseUrl = "https://www.theaudiodb.com";
        const albumEnd = "/api/v1/json/1/album.php?m=" + this.album;
        const tracksEnd = "/api/v1/json/1/track.php?m=" + this.album;


        fetch(baseUrl + albumEnd)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    albumData: responseJson['album'],
                })
            })
            .then(() => {
                return fetch(baseUrl + tracksEnd)
            })
            .then((response1) => response1.json())
            .then((response1Json) => {
                this.setState({
                    tracks: response1Json['track'],
                })
            })
            .catch(error=>console.log(error)) //to catch the errors if any)






    }

    checkPic(source){
        if(source == null || source === ""){
            return (
                <Image style={styles.profilePic} source={
                    {
                        uri: 'data:image/jpeg;base64,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',
                        width: 200,
                        height: 200,
                    }
                }/>
            )
        }else{
            return(
                <Image style={styles.profilePic} source={
                    {
                        uri: source,
                        width: "100%",
                        height: "100%",
                    }
                }
                />
            )
        }
    }

    render() {
        if(this.state.loading){
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )
        }else{
            return (
                <ScrollView>
                    <View style={styles.container}>

                        {this.state.albumData.map((info) => {
                            return (
                                <View>
                                    { this.checkPic(info.strAlbumThumb) }


                                    <Text style={styles.title}>{info.strAlbum}</Text>
                                    <View style={styles.informations}>
                                        <Text style={styles.text}>Released: </Text>
                                        {info.intYearReleased == null ? <Text>Not available</Text> : <Text style={styles.text}>{info.intYearReleased}</Text> }
                                    </View>
                                    <View style={styles.informations}>
                                        <Text style={styles.text}>Genres: </Text>
                                        {info.strGenre == null ? <Text>Not available</Text> : <Text style={styles.text}>{info.strGenre}</Text> }
                                    </View>

                                    <View>
                                        <Text style={styles.desctext}>Description: </Text>
                                        {info.strDescriptionEN == null ? <Text>Not available.</Text> : <ReadMore numberOfLines={4} seeMoreStyle={{color: color.textTitle}} seeLessStyle={{color: color.textTitle}} style={styles.text}>{info.strDescriptionEN}</ReadMore>}
                                    </View>


                                </View>
                            )
                        })}

                    </View>

                    <View style={styles.container}>
                        <Text style={styles.title}>
                            Tracks
                        </Text>
                        {this.state.tracks.map((info, i) => {
                            return (
                                <View style={styles.tracks}>
                                    <Text style={styles.number}>{i+1}</Text>
                                    <Text style={styles.textTrack}> {info.strTrack}</Text>
                                </View>


                            )
                        })}
                    </View>

                </ScrollView>

            );
        }

    }
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
    },
    profilePic: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 65,
        width: 200,
        height: 200,
    },
    title: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 36,
        fontWeight: 'bold',
        borderRadius: 5,
        color: color.textTitle,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: color.textNormal,
    },
    loading: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    informations: {
        flexDirection: 'row',
    },
    desctext: {
        marginBottom: 10,
        fontSize: 16,
        marginTop: 10,
    },
    tracksContainer: {
        backgroundColor: 'white',
    },
    tracks: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        //alignItems: 'center',
        margin: 5,
        flexDirection: 'row',
    },
    textTrack: {
        fontSize: 20,
        color: color.textNormal,
    },
    number: {
        color: color.textTitle,
        fontSize: 20,
        marginRight: 20,
    },
});