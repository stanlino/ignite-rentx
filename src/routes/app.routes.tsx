import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Sheduling } from '../screens/Sheduling'
import { ShedulingComplete } from '../screens/ShedulingComplete'
import { ShedulingDetails } from '../screens/ShedulingDetails'

const { Navigator, Screen } = createStackNavigator()

export function AppRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='Home' component={Home} />
        <Screen name='CarDetails' component={CarDetails} />
        <Screen name='Sheduling' component={Sheduling} />
        <Screen name='ShedulingComplete' component={ShedulingComplete} />
        <Screen name='ShedulingDetails' component={ShedulingDetails} />
    </Navigator>
  )
}