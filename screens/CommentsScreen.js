import { KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import Comments from '../components/comments/Comments'

const CommentsScreen = ({route, navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <StatusBar backgroundColor='black' barStyle='light-content' />
      
      <Comments route={route} navigation={navigation} />
    </SafeAreaView>
  )
}

export default CommentsScreen