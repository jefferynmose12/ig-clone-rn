import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth'
import { UIContext } from '../../context/GlobalContextProvider';

const Header = ({navigation}) => {
    const { setCurrentUser } = useContext(UIContext)

    const auth = getAuth()

    const handleLogout = () => {             
        signOut(auth).then(() => {
            setCurrentUser(null)
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error.message)
        });
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
            <Image
                style={styles.logo}
                source={require('../../assets/header-logo.png')} 
            />
        </TouchableOpacity>

        <View style={styles.iconsCon}>
            <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                <AntDesign name="plussquareo" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="heart" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>11</Text>
                </View>
                <AntDesign name="message1" size={20} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    logo : {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconsCon: {
        flexDirection: 'row',
        gap: 12,
    },
    unreadBadge: {
        position: 'absolute',
        backgroundColor: 'red',
        left: 10,
        bottom: 12,
        width: 15,
        height: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: 600,
        fontSize: 10
    }
})

export default Header