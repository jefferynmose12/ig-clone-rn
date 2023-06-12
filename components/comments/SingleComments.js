import { View, Text, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const SingleComments = ({comment, pics, username}) => {
  const commentText = comment?.charAt(0).toUpperCase() + comment?.slice(1)

  return (
    <View 
      style={{
        flexDirection: 'row',
        gap: 7, 
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <View>
        <Image
          source={{
            uri : pics
          }}
          style={{
            height: 35,
            width: 35,
            borderRadius: 50
          }}
        />
      </View>
      <View style={{flex: 1, gap: 6}}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: 600}}>{username}</Text>
        <Text style={{color: 'white', fontSize: 13, lineHeight: 16}}>
            {commentText}
        </Text>
      </View>
      <View style={{marginLeft: 5}}>
        <Feather name="heart" size={15} color="white" />
      </View>
    </View>
  )
}

export default SingleComments