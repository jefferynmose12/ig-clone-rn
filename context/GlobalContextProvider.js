import { useState, createContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const UIContext = createContext(null);

function GlobalContextProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)

    const auth = getAuth()

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            }
        })
        return () => unSub()
    },[])

    const handleAddComments = (post, comment, current) => {
        updateDoc(doc(db, `users/${post?.owner_email}/posts/${post?.id}`), {
            comments: arrayUnion({
                email: currentUser?.email,
                comment,
                pics: current?.profilePicture,
                username: current?.username
            })
        }).then(() => {
        })
    }

    const values = {
        currentUser,
        setCurrentUser,
        handleAddComments
    }
    
    return (
        <UIContext.Provider value={values}>
            {children}
        </UIContext.Provider>
    )
}

export default GlobalContextProvider;