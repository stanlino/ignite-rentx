import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export function Routes(){
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    </GestureHandlerRootView>
  )
}