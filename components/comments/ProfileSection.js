import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfileSection = ({post}) => {

  const userName = post?.user.charAt(0).toLowerCase() + post?.user.slice(1)

  return (
    <View 
      style={{
        flexDirection: 'row', 
        gap: 7, 
        paddingHorizontal: 10, 
        paddingVertical: 15,
        borderColor: 'grey', 
        borderBottomWidth: 0.5
      }}
    >
      <View>
        <Image 
          source={{
              uri : post?.profilePicture
          }}
          style={{
              height: 35,
              width: 35,
              borderRadius: 50
          }}
        />
      </View>
      <View style={{flex: 1, gap: 6}}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: 600}}>{post?.user && userName}</Text>
        <Text style={{color: 'white', fontSize: 13, lineHeight: 16}}>
          {post?.caption}
        </Text>
      </View>
    </View>
  )
}

export default ProfileSection