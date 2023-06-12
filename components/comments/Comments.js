import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import ProfileSection from './ProfileSection';
import SingleComments from './SingleComments';
import Footer from './Footer';
import useGetOwnerDetails from '../../hooks/useGetOwnerDetails';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { UIContext } from '../../context/GlobalContextProvider';

const Comments = (props) => {
    const { currentLoggedInUser } = useGetOwnerDetails()
    const post = props.route.params
    const { handleAddComments } = useContext(UIContext)

    const [ singlePost, setSinglePost ] = useState(null)

    useEffect(()=> {
        const getSinglePost = async() => {
          const querySnapshot = await getDoc(
            doc(db, 'users', `${post?.owner_email}`, 'posts', `${post?.id}`)
          )
          setSinglePost(querySnapshot.data())
        }
      
        getSinglePost()
    }, [handleAddComments, singlePost])

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={50}
            style={{flex: 1}}
        >
            <>
        <Header {...props} />
        <ProfileSection post={singlePost} />
        
        <ScrollView style={{paddingVertical: 10, marginBottom: 10}}>
            {singlePost?.comments?.map((com, index) => (
                <SingleComments key={index} {...com} />
            ))}
        </ScrollView>
        
        <View style={{borderColor: 'grey', borderTopWidth: 0.2, paddingTop: 15}}>
            <Footer {...props} singlePost={post} current={currentLoggedInUser} handleAddComments={handleAddComments} />
        </View>
        </>
        </KeyboardAvoidingView>
    </View>
  )
}

const Header = ({ navigation }) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
                source={{ uri : 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png' }} 
                style={{ width: 27, height: 27 }} 
            />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Comments</Text>
        <Feather name="send" size={22} color="white" />
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1
    },
    headerContainer: {
        paddingHorizontal: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey', 
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    headerText: {
        color : 'white',
        fontWeight: 700,
        fontSize: 16
    }
})

export default Comments