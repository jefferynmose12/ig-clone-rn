import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { db } from "../../firebase"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import useGetOwnerDetails from '../../hooks/useGetOwnerDetails'

const PLACEHOLDER_IMG = 'https://via.placeholder.com/600x400.jpg'

const uploadPostShema = yup.object().shape({
    imageurl: yup.string().url().required('A URL is required'),
    caption: yup.string().max(2200, 'Caption has reached the character')
})

const FormikPostUploader = ({ navigation }) => {
    const [thumbnail, setThumbnail] = useState(PLACEHOLDER_IMG)
    const { currentLoggedInUser, currentUser } = useGetOwnerDetails()

    const uploadPostFireBase = ({imageurl, caption}) => {
        addDoc(collection(db, `users/${currentUser.email}/posts/`), {
            owner_uid: currentUser.uid,
            user: currentLoggedInUser.username,
            profilePicture: currentLoggedInUser.profilePicture,
            imageurl: imageurl,
            caption: caption,
            owner_email: currentUser.email,
            createdAt: serverTimestamp(),
            likes_by_users: [],
            comments: []
        }).then(() => navigation.goBack())
        .catch((err)=>{
            console.log(err.message)
        })
    }

  return (
    <Formik
        initialValues={{caption : '', imageurl: ''}}
        onSubmit={(values) => uploadPostFireBase(values)}
        validationSchema={uploadPostShema}
        validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
            <View style={{margin : 20}}>
                <View style={styles.post}>
                    <Image 
                        source={{ uri : thumbnail }} 
                        style={{width: 100, height: 100}} 
                    />
                    <TextInput
                        style={{color : 'white', fontSize: 20, flex: 1}}
                        placeholder='Write a caption ...'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                </View>
                
                <View style={{marginVertical: 20}}>
                    <TextInput
                        onChange={(e) => setThumbnail(e.nativeEvent.text)}
                        style={{color : 'white', fontSize: 18}}
                        placeholder='Enter Image Url...'
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageurl')}
                        onBlur={handleBlur('imageurl')}
                        value={values.imageurl}
                    />
                    {errors.imageurl && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                            {errors.imageurl}
                        </Text>
                    )}
                </View>

                <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
            </View>
        )}
    </Formik>
  )
}

const styles = StyleSheet.create({
    post: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12
    }

})

export default FormikPostUploader