import { View, Text, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

const Footer = ({singlePost, current, handleAddComments}) => {
    const userName = singlePost?.user.charAt(0).toLowerCase() + singlePost?.user.slice(1)

    const CommentPostShema = yup.object().shape({
        comment: yup.string().min(1, 'No comment').max(2200, 'Comment has reached the character')
    })

    const [keyboardStatus, setKeyboardStatus] = useState('');

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('Keyboard Shown');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handle = (value) => {
        handleAddComments(singlePost, value, current)
    }

  return (
    <View style={{flexDirection: 'row', gap: 8, alignItems: 'center', marginRight: 5, marginBottom: 10}}>
      <View>
        <Image
            source={{
                uri: current?.profilePicture
            }}
            style={{
                height: 45,
                width: 45,
                borderRadius: 50
            }}
        />
      </View>
      <View style={{flex: 1, bottom : 0}}>
        <Formik
            initialValues={{comment : ''}}
            onSubmit={(value,{resetForm}) => {
                handle(value.comment)
                resetForm({values: ''})
            }}
            validationSchema={CommentPostShema}
        >
            {({handleBlur, handleChange, handleSubmit, values}) => (
                <View>
                    <View 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 20,
                            padding: 8,
                            borderWidth: 0.5,
                            borderColor: 'grey',
                            gap: 5,
                            height: 45
                        }}
                    >
                        <TextInput
                            style={{bottom : 0, color : 'white', flex: 1, paddingLeft: 7, paddingBottom: Platform.OS === 'ios' ? 5 : 0}}
                            placeholderTextColor='#444'
                            placeholder={`Add a comment for ${userName}...`}
                            multiline={true}
                            onChangeText={handleChange('comment')}
                            onBlur={handleBlur('comment')}
                            value={values.comment}
                        />
                        {keyboardStatus && (
                            <TouchableOpacity 
                                style={{marginRight: 10}} 
                                onPress={handleSubmit}
                            >
                                <Text style={{color: '#9ACAF7', fontWeight: 600}}>Post</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </Formik>
      </View>
    </View>
  )
}

export default Footer