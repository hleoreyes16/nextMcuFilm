import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { useState } from 'react';
import { 
  useFonts,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
} from '@expo-google-fonts/roboto'



const url = "https://www.whenisthenextmcufilm.com/api"

export default function App() {

  const [movieName, setMovieName] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieDaysLeft, setMovieDaysLeft] = useState('');
  const [nextMovie, setNextMovie] = useState('');

  let [fontsLoaded] = useFonts({Roboto_700Bold});
  
  useEffect(() => {
    getData();
  })
  

  function getData(){
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      setMovieName(res.data.title);
      setMoviePoster(res.data.poster_url);
      setMovieDaysLeft(res.data.days_until);
      setNextMovie(res.data.following_production.title);
    })
    .catch((err) => {
      console.log(err);
    })
  }

    if(!fontsLoaded) {
      return <AppLoading/>
    } else{
      return(
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.containerMovie}>
            <Text style={{fontSize: 30, fontFamily: 'Roboto_700Bold'}}>NEXT MCU FILM:</Text>
            <Text style={{fontSize: 25, marginVertical: 5, fontFamily: 'Roboto_700Bold'}}>{movieName}</Text>
            <Text style={{textAlign: 'justify', marginHorizontal: 20, marginVertical: 5, fontSize: 25, fontFamily: 'Roboto_700Bold'}}>DAYS LEFT: {movieDaysLeft}</Text>
            <Image
            source={{uri: moviePoster}}
            style={{height: 500, width: 300, marginVertical: 10, borderRadius: 15}}
            />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Next Movie? </Text>
            <Text style={{color: 'blue', fontSize: 15, fontFamily: 'Roboto_700Bold_Italic'}}>{nextMovie}</Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMovie: {
    flex: 1,
    backgroundColor: '#F0ECEC',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
});
