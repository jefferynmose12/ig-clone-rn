import { View, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import useGetOwnerDetails from '../../hooks/useGetOwnerDetails'

const BottomTab = () => {
  const [ selected, setSelected ] = useState('Home')
  const { currentLoggedInUser } = useGetOwnerDetails()

  const bottomTabIcons = [
    {
      name: 'Home',
      active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
      name: 'Search',
      active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
      name: 'Reels',
      active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
      name: 'Shop',
      active:
        'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png',
    }
  ]

  const handleChange = useCallback((value) => {
    setSelected(value)
  }, [])

  return (
    <View style={{flexDirection: 'row', gap: 10, justifyContent: 'space-around', paddingTop: 15, paddingBottom: 10, paddingHorizontal: 10, borderColor: 'white', borderTopWidth: 0.5}}>
      {bottomTabIcons.map((tab, index) => (
        <View 
          key={index}
        >
          <TouchableOpacity onPress={() => handleChange(tab.name)}>
            <Image
              source={{
                uri: selected === tab.name ? tab.active : tab.inactive
              }}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
      ))}

      
      <TouchableOpacity onPress={() => handleChange('profile')} style={{alignItems: 'center', justifyContent: 'center', gap: 5}}>
        <Image
          source={{
            uri: currentLoggedInUser?.profilePicture
          }}
          style={{height: 30, width: 30, borderRadius: 50}}
        />
        {selected === 'profile' ? (
          <View 
            style={{width: 5, height : 5, backgroundColor: 'pink', borderRadius: 50}} 
          />) : (
          <View 
            style={{width: 5, height : 5, backgroundColor: 'black', borderRadius: 50}} 
          />
        )}
      </TouchableOpacity>
        
      
    </View>
  )
}

export default React.memo(BottomTab)