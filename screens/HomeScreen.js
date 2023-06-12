import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../components/home/Header'
import { arrayRemove, arrayUnion, collectionGroup, doc, getDocs, orderBy, query, updateDoc} from 'firebase/firestore'
import { db } from '../firebase'
import Posts from '../components/home/Posts'
import Stories from '../components/home/Stories'
import { ScrollView } from 'react-native-gesture-handler'
import BottomTab from '../components/home/BottomTab'
import useGetOwnerDetails from '../hooks/useGetOwnerDetails'
import { UIContext } from '../context/GlobalContextProvider'

const HomeScreen = ({navigation}) => {
  const [postLists, setPostList] = useState([])
  const { currentUser } = useGetOwnerDetails()
  const { handleAddComments } = useContext(UIContext)

  const handleLike = useCallback((post) => {
    const currentStatus = post?.likes_by_users.includes(
      currentUser.email
    )

    updateDoc(doc(db, `users/${post?.owner_email}/posts/${post?.id}`), {
      likes_by_users: currentStatus ? arrayRemove(currentUser?.email) : arrayUnion(currentUser?.email)
    })
  }, [postLists])

  useEffect(()=> {
    const getAllPosts = async() => {
      const querySnapshot = await getDocs(
        collectionGroup(db, 'posts')
      )
      setPostList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
  
    getAllPosts()
  }, [handleLike])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='black' barStyle='light-content' />
      <Header navigation={navigation} />
      <View style={{marginBottom: 10}}>
        <Stories postLists={postLists} />
      </View>
      <View style={{borderColor: 'grey', borderTopWidth: 0.5}} />
      <ScrollView>
        {postLists?.map((post, index) => (
          <Posts key={index} post={post} handleLike={handleLike} navigation={navigation} />
        ))}
      </ScrollView>
      <BottomTab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  }
})

export default HomeScreen