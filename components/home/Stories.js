import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import useGetOwnerDetails from '../../hooks/useGetOwnerDetails'

const Stories = ({postLists}) => {
    const { currentLoggedInUser } = useGetOwnerDetails()
    
    const filterStatusPost = postLists?.filter((post) => post.user !== currentLoggedInUser?.username)

  return (
    <ScrollView horizontal={true}>
        <View style={styles.container}>
            <View style={{marginLeft : 5, alignItems: 'center', gap: 2}}>
                <View
                    style={{
                        height: 75,
                        width: 75,
                        borderRadius: 50,
                        borderColor: 'pink',
                        borderWidth: 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image 
                        source={{ uri: currentLoggedInUser?.profilePicture }} 
                        style={styles.img} 
                    />
                </View>
                <Text style={{color: 'white'}}>Your story</Text>
            </View>
            {filterStatusPost?.map((post, index) => (
                <View key={index} style={{marginLeft : 5, alignItems: 'center', gap: 2}}>
                    <View
                        style={{
                            height: 75,
                            width: 75,
                            borderRadius: 50,
                            borderColor: 'pink',
                            borderWidth: 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image 
                            source={{ uri: post?.profilePicture}} 
                            style={styles.img}
                        />
                    </View>
                    
                    <Text style={{color: 'white'}}>{post?.user.substring(0, 10)}</Text>
                </View>
            ))}
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1.5,
    }
})

export default Stories