import { doc, getDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { UIContext } from '../context/GlobalContextProvider'
import { db } from '../firebase'

function useGetOwnerDetails() {
    const { currentUser } = useContext(UIContext)

    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = async () => {
        const querySnapshot = await getDoc(doc(db, "users", currentUser?.email))
        setCurrentLoggedInUser({
            username: querySnapshot.data().username,
            profilePicture: querySnapshot.data().profile_picture
        })
    }

    useEffect(() => {
        getUsername()
    }, [currentLoggedInUser])

  return { currentLoggedInUser, currentUser }
}

export default useGetOwnerDetails