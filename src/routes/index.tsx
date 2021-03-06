import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useAuth } from '../hooks/auth'

import { AuthRoutes } from './auth.routes'
import { AppStackRoutes } from './app.stack.routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function Routes(){

  const { user } = useAuth()

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <SafeAreaProvider>
          { user.id ? <AppStackRoutes /> : <AuthRoutes /> }
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}