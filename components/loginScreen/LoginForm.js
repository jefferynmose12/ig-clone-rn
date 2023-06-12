import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginForm = ({navigation}) => {
  const loginFormShema = yup.object().shape({
    email: yup.string().email().required('An email is required'),
    password: yup.string().required().min(6, 'Your password must have minimum of 6 characters')
  })

  const onLogin = async ({email, password}) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('successful', email, password)
    } catch (err) {
      Alert.alert(
        'Not Exist...',
        'create an account',
        [
          {
            text: 'Ok',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
          {text: 'Sign Up', onPress: () => navigation.push('RegisterScreen')}
        ]
      )
    }
  }

  return (
    <Formik
      initialValues={{email : '', password: ''}}
      onSubmit={(values) => onLogin(values)}
      validationSchema={loginFormShema}
      validateOnMount={true}
    >
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.wrapper}>
          <View 
            style={[styles.inputField, {
              borderColor: 
                values.email.length < 1 || Validator.validate(values.email) 
                ? '#ccc' 
                : 'red'
              }
            ]}
          >
            <TextInput
              placeholderTextColor='#444'
              placeholder='Email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </View>
          <View
            style={[styles.inputField, {
              borderColor: 
                values.password.length < 1 || values.password.length >= 6
                ? '#ccc' 
                : 'red'
              }
            ]}
          >
            <TextInput
              placeholderTextColor='#444'
              placeholder='Password'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          </View>
          <View 
            style={{alignItems: 'flex-end', marginBottom: 30}}
          >
            <Text style={{color: '#6BB0F5'}}>Forgot password</Text>
          </View>
          <Pressable 
            style={styles.button(isValid)} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>

          <View style={styles.signupCon}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('RegisterScreen')}>
              <Text style={{color: '#6BB0F5'}}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5'
    },
    button: (isValid) => ({
      backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 42,
      borderRadius: 4,
    }),
    buttonText: {
        fontWeight: 600,
        fontSize: 20,
        color: '#fff'
    },
    signupCon: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 3,
        width: '100%',
        marginTop: 35
    }
})

export default LoginForm