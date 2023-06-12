import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"

const SignUpForm = ({navigation}) => {
  const signFormShema = yup.object().shape({
    email: yup.string().email().required('An email is required'),
    username: yup.string().required().min(3, 'Username required'),
    password: yup.string().required().min(6, 'Your password must have minimum of 6 characters')
  })

  const getRandomProfilePicture = async () => {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    return data.results[0].picture.large
  }

  const onSignUp = async ({ email, username, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if(res) {
        await setDoc(doc(db, "users", res.user.email), {
          owner_uid: res.user.uid,
          username: username,
          email: res.user.email,
          profile_picture: await getRandomProfilePicture()
        })
      }

    } catch (err) {
      Alert.alert(
        'Account already existed',
        'Log in',
        [
          {
            text: 'Ok',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
          {text: 'Sign Up', onPress: () => navigation.push('LoginScreen')}
        ]
      )
    }
  }

  return (
    <Formik
      initialValues={{email : '', username : '', password: ''}}
      onSubmit={(values) => onSignUp(values)}
      validationSchema={signFormShema}
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
                values.username.length < 1 || values.username.length >= 3
                ? '#ccc' 
                : 'red'
              }
            ]}
          >
            <TextInput
              placeholderTextColor='#444'
              placeholder='Username'
              autoCapitalize='none'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
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
          
          <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          <View style={styles.signupCon}>
            <Text>Aleady have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: '#6BB0F5'}}>Log In</Text>
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
      padding: 12,
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
      marginTop: 35
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

export default SignUpForm