import React, {Component} from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import color from "../config/color";
import AlbumButton from '../styles/albumButton';
import ReadMore from '@fawazahmed/react-native-read-more';
import {AntDesign, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import ExpoLinking from "expo-linking/src/ExpoLinking";

export default class APIScreen extends Component {
    constructor(props) {
        super(props);

        this.artist = this.props.route.params.artist;
        this.state = {
            loading: true,
            dataSource: [],
            albums: [],
        }
        this.isFavorite = false;
        this.refreshScreen = this.refreshScreen.bind(this)
    }

    linkFacebook = (url) => {
        if(url == null){
            alert("No Facebook account existing.")
        }else{
            let URL = "https://" + url;
            ExpoLinking.openURL(URL);
        }
    }

    linkTwitter = (url) => {
        if(url == null){
            alert("No Twitter account existing.")
        }else{
            let URL = "https://" + url;
            ExpoLinking.openURL(URL);
        }
    }

    linkWebsite = (url) => {
        if(url == null){
            alert("No website existing.")
        }else{
            let URL = "https://" + url;
            ExpoLinking.openURL(URL);
        }
    }



   componentDidMount(){
       const baseUrl = "https://www.theaudiodb.com";
       const endpoint = "/api/v1/json/1/search.php?s=" + this.artist;
       let albumEnd = "/api/v1/json/1/album.php?i=";


       fetch(baseUrl + endpoint)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({

                    dataSource: responseJson['artists'],
                })
            })
           .then(() => {
               for(let i = 0; i < global.favorites.length; i++){
                   //alert(global.favorites[i])
                   if(global.favorites[i].includes(this.artist)){
                       this.isFavorite = true;
                   }
               }
               this.setState({
                   loading: false,
                   artistId: this.state.dataSource.map((info) => {
                       return ( info.idArtist )}),
               })
           })
            .then(() => {
                albumEnd += this.state.artistId
            })
           .then(() => {
               return fetch(baseUrl + albumEnd)
           })
           .then((response1) => response1.json())
           .then((response1Json) => {
               this.setState({
                   albums: response1Json['album'],
               })
           })
           .catch(error=>console.log(error)) //to catch the errors if any

    }


    refreshScreen() {
        this.setState({ lastRefresh: Date(Date.now()).toString() })
    }

    addFavorite(){
        if(this.isFavorite) {

            let inFavorites = this.state.dataSource['0']["strArtist"];

            global.favorites = global.favorites.filter(function (value) {
                return value[0] !== inFavorites;
            });
            alert("Artist was removed from Favorites.");

            this.isFavorite = false;

            this.refreshScreen();

        }else{

            let newFavorite = [];
            newFavorite.push(this.state.dataSource['0']["strArtist"]);
            newFavorite.push(this.artist);
            newFavorite.push(this.state.dataSource['0']['strArtistThumb']);

            alert("Artist was added to your Favorites.");
            global.favorites.push(newFavorite);
            this.isFavorite = true;

            this.refreshScreen();
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
                        {this.state.dataSource.map((info) => {
                            return (
                                <View>
                                    <Image style={styles.profilePic} source={
                                            {
                                                uri: info.strArtistThumb,
                                                width: "100%",
                                                height: "100%",
                                            }
                                        }
                                    />

                                    <Text style={styles.title}>{info.strArtist}</Text>
                                    <View style={styles.informations}>
                                        <Text style={styles.text}>Year of foundation: </Text>
                                        <Text style={styles.text}>{info.intFormedYear}</Text>
                                    </View>

                                    <View style={styles.informations}>
                                        <Text style={styles.text}>Genres: </Text>
                                        <Text style={styles.text}>{info.strGenre}</Text>
                                    </View>
                                    <View style={styles.contacts}>
                                        <TouchableNativeFeedback onPress={() => { this.linkFacebook(info.strFacebook) }}>
                                            <View style={styles.iconfirst}>
                                                <FontAwesome name="facebook-square" size={42} color="black" />
                                            </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback onPress={() => { this.linkTwitter(info.strTwitter) }}>
                                            <View style={styles.icon}>
                                                <AntDesign name="twitter" size={42} color="black" />
                                            </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback onPress={() => { this.linkWebsite(info.strWebsite) }}>
                                            <View style={styles.icon}>
                                                <MaterialCommunityIcons name="web" size={42} color="black" />
                                            </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback onPress={() => { this.addFavorite() }}>
                                            <View style={styles.icon}>
                                                {this.isFavorite ? <AntDesign name="star" size={42} color="black" /> : <AntDesign name="staro" size={42} color="black" />}
                                            </View>
                                        </TouchableNativeFeedback>

                                    </View>
                                    <View>
                                        <Text style={styles.desctext}>Biography:</Text>
                                        {info.strBiographyEN === null ? <Text>Not available</Text> : <ReadMore numberOfLines={4} seeMoreStyle={{color: color.textTitle}} seeLessStyle={{color: color.textTitle}} style={styles.text}>{info.strBiographyEN}</ReadMore> }
                                    </View>

                                </View>
                            )
                        })}



                    </View>
                    <View style={styles.albumContainer}>
                        <Text style={styles.title}>
                            Albums
                        </Text>
                        {this.state.albums.map((info) => {
                            return (
                                <AlbumButton navigation={this.props.navigation} source={info.strAlbumThumb} text={info.strAlbum} id={info.idAlbum}/>

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
        width: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',
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
    informations: {
        flexDirection: 'row',
    },
    desctext: {
        marginBottom: 10,
        fontSize: 16,
    },
    albumContainer: {
        backgroundColor: 'white',
    },
    contacts: {
        borderBottomColor: color.textTitle,
        borderTopColor: color.textTitle,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
        //paddingHorizontal: 20,
    },
    icon: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    iconfirst: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 20,
    },
    loading: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});
