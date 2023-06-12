import React, { useContext } from 'react'
import { SignedInStack, SignedOutStack } from './screens/Navigation'
import { UIContext } from './context/GlobalContextProvider'

const AuthNavigation = () => {
  const { currentUser } = useContext(UIContext)
    
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation