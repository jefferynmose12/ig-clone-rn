import { View, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import LoginForm from '../components/loginScreen/LoginForm'

const img = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={{uri : img, height: 100, width: 100}} />
        </View>
        <LoginForm navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingtop: 60,
      paddingHorizontal: 12,
    },
    logoContainer : {
      alignItems: 'center',
      marginTop: 100
    },
})

export default LoginScreen