import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { Confirmation } from '../screens/Confirmation'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { CarDTO } from '../dtos/carDto'
import { Car } from '../database/models/Car'

import { AppTabRoutes } from './app.tabs.routes'
import { Splash } from '../screens/Splash'

export type RootStackParamList = {
  Splash: {
    nextScreen: string
  }
  AppTabRoutes: undefined
  CarDetails: { car: Car }
  Scheduling: { car: CarDTO }
  SchedulingDetails: { car: CarDTO, dates: string[]}
  Confirmation: {
    title: string
    message: string
    nextScreenName: keyof RootStackParamList
  }
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function AppStackRoutes(){
  return (
    <Navigator 
      initialRouteName='Splash' 
      screenOptions={{ 
        headerShown: false, presentation: 'modal' 
      }}
    >
      <Screen name='Splash' component={Splash} initialParams={{ nextScreen: 'AppTabRoutes' }} />
      <Screen name='AppTabRoutes' component={AppTabRoutes} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='Confirmation' component={Confirmation} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
    </Navigator>
  )
}