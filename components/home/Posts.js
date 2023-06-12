import { View, Text, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGetOwnerDetails from '../../hooks/useGetOwnerDetails';

const Posts = ({post, handleLike, navigation}) => {
    const { currentUser } = useGetOwnerDetails()

    const userName = post?.user.charAt(0).toUpperCase() + post?.user.slice(1)

    const currentStatus = post?.likes_by_users.includes(
        currentUser.email
    )

    const handleShowComment = useCallback(() => {
        if (post?.comments.length >= 1) {
            navigation.navigate('CommentsScreen', post)
        }
    }, [post?.comments, navigation])

    const CommentSection = (post) => {
        if(!post?.comments.length) {
            return null
        }

        if(post?.comments.length === 1) {
            return (
                <TouchableOpacity onPress={handleShowComment}>
                    <Text style={{fontWeight: 400, color: 'gray'}}>
                        View {post?.comments.length} comment
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity onPress={handleShowComment}>
                <Text style={{fontWeight: 400, color: 'gray'}}>
                    View all {post?.comments.length} comments
                </Text>
            </TouchableOpacity>

        )
    }

  return (
    <View style={{marginVertical: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <View 
                style={{
                    height: 45,
                    width: 45,
                    borderRadius: 50,
                    borderColor: 'pink',
                    borderWidth: 1.5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={{ uri: post?.profilePicture }} 
                    style={styles.img}
                />
            </View>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 600}}>{userName}</Text>
        </View>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="white" />
      </View>
      <View style={{marginVertical: 10}}>
        <Image
            source={{ uri: post?.imageurl }} 
            style={styles.big} 
        />
      </View>
      <View style={{marginHorizontal: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <TouchableOpacity onPress={() => handleLike(post)}>
                    {currentStatus ? <FontAwesome name="heart" size={24} color="red" /> : <Feather name="heart" size={24} color="white" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowComment}>
                    <FontAwesome5 name="comment" size={24} color="white" />
                </TouchableOpacity>
                <Feather name="send" size={24} color="white" />
            </View>
            <Feather name="bookmark" size={24} color="white" />
        </View>
        <View style={{marginVertical: 5}}>
            <Text style={{color: 'white', fontWeight: 600}}>{post?.likes_by_users.length} likes</Text>
        </View>
        <View>
            <Text style={{color: 'white', fontWeight: 600, fontSize: 15, lineHeight: 20}}>
                {userName} {''}
                <Text style={{fontWeight: 400}}>
                    {''} {post?.caption}
                </Text>
            </Text>
        </View>
        <View style={{marginVertical: 2}}>
            {CommentSection(post)}
            {post?.comments?.slice(0, 1).map(({comment, username}, index) => (
                <View key={index} style={{marginTop: 2}}>
                    <Text style={{color: 'white', fontWeight: 600, fontSize: 14, lineHeight: 18}}>
                        {username} {''}
                        <Text style={{fontWeight: 400}}>
                            {''} {comment?.charAt(0).toUpperCase() + comment?.slice(1)}
                        </Text>
                    </Text>
                </View>
            ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    img: {
        height: 40,
        width: 40,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1.2,
    },
    big: {
        height: 400,
        objectFit: 'cover',
    }
})

export default React.memo(Posts)