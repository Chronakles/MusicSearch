import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import APIScreen from "./app/screens/APIScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AlbumScreen from "./app/screens/AlbumScreen";


let fav1Name = "Coldplay", fav2Name = "Nickelback", fav3Name = "YUNGBLUD", fav4Name = "Lady Gaga", fav5Name = "Kesha";
let fav1Artist = "coldplay", fav2Artist = "nickelback", fav3Artist = "yungblud", fav4Artist = "lady_gaga", fav5Artist = "kesha";
let fav1Pic = "https://www.theaudiodb.com/images/media/artist/thumb/uxrqxy1347913147.jpg", fav2Pic = "https://www.theaudiodb.com/images/media/artist/thumb/vuqrsy1353683231.jpg", fav3Pic = "https://www.theaudiodb.com/images/media/artist/thumb/s92b6h1607121400.jpg", fav4Pic = "https://www.theaudiodb.com/images/media/artist/thumb/vqpvyy1532160561.jpg", fav5Pic ="https://www.theaudiodb.com/images/media/artist/thumb/vxttqw1357659610.jpg";

global.favorites = [
    [fav1Name, fav1Artist, fav1Pic],
    [fav2Name, fav2Artist, fav2Pic],
    [fav3Name, fav3Artist, fav3Pic],
    [fav4Name, fav4Artist, fav4Pic],
    [fav5Name, fav5Artist, fav5Pic]];

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="MyMusicSearch"
                  component={WelcomeScreen}
                  options={{ title: 'MyMusicSearch' }}>
              </Stack.Screen>
              <Stack.Screen
                  name="API"
                  component={APIScreen}
                  options={{ title: 'Artists' }}>
              </Stack.Screen>
              <Stack.Screen
                  name="Album"
                  component={AlbumScreen}
                  options={{ title: 'Album' }}>
              </Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>

  );
}
StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBox: {
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
    },
});
