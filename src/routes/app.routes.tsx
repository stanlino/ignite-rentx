import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Sheduling } from '../screens/Sheduling'
import { ShedulingComplete } from '../screens/ShedulingComplete'
import { ShedulingDetails } from '../screens/ShedulingDetails'
import { CarDTO } from '../dtos/carDto'

const { Navigator, Screen } = createStackNavigator()

type RootStackParamList = {
  Home: undefined
  CarDetails: { car: CarDTO }
  Sheduling: undefined
  ShedulingComplete: undefined
  ShedulingDetails: undefined
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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