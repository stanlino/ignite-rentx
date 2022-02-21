import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Sheduling } from '../screens/Sheduling'
import { ShedulingComplete } from '../screens/ShedulingComplete'
import { ShedulingDetails } from '../screens/ShedulingDetails'
import { CarDTO } from '../dtos/carDto'
import { MyCars } from '../screens/MyCars'

export type RootStackParamList = {
  Home: undefined
  CarDetails: { car: CarDTO }
  Sheduling: { car: CarDTO }
  ShedulingDetails: { car: CarDTO, dates: string[]}
  ShedulingComplete: undefined
  MyCars: undefined
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function AppRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Sheduling' component={Sheduling} />
      <Screen name='ShedulingComplete' component={ShedulingComplete} />
      <Screen name='ShedulingDetails' component={ShedulingDetails} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}