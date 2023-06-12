import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import NewPostScreen from './NewPostScreen'
import RegisterScreen from './RegisterScreen'
import CommentsScreen from './CommentsScreen'

const stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

const NavigatehncScreen = () => {
  return (
    <stack.Navigator initialRouteName='HomeScreen' screenOptions={screenOptions}>
      <stack.Screen name='HomeScreen' component={HomeScreen} />
      <stack.Screen name='CommentsScreen' component={CommentsScreen} />
    </stack.Navigator>
  )
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='NavigatehncScreen' screenOptions={screenOptions}>
        <stack.Screen name='NavigatehncScreen' component={NavigatehncScreen} />
        <stack.Screen name='NewPostScreen' component={NewPostScreen} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
        <stack.Screen name='LoginScreen' component={LoginScreen} />
        <stack.Screen name='RegisterScreen' component={RegisterScreen} />
      </stack.Navigator>
    </NavigationContainer>
  )
}