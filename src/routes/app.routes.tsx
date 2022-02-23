import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { CarDTO } from '../dtos/carDto'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'

export type RootStackParamList = {
  Splash: undefined
  Home: undefined
  CarDetails: { car: CarDTO }
  Scheduling: { car: CarDTO }
  SchedulingDetails: { car: CarDTO, dates: string[]}
  SchedulingComplete: undefined
  MyCars: undefined
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function AppRoutes(){
  return (
    <Navigator initialRouteName='Splash' screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Screen name='Splash' component={Splash} />
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingComplete' component={SchedulingComplete} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}