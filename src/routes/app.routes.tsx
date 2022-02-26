import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { Confirmation } from '../screens/Confirmation'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { CarDTO } from '../dtos/carDto'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'
import { SignIn } from '../screens/SignIn'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'

export type RootStackParamList = {
  Splash: undefined
  Home: undefined
  CarDetails: { car: CarDTO }
  Scheduling: { car: CarDTO }
  SchedulingDetails: { car: CarDTO, dates: string[]}
  Confirmation: {
    title: string
    message: string
    nextScreenName: 'SignIn' | 'Home'
  }
  MyCars: undefined
  SignIn: undefined
  SignUpFirstStep: undefined
  SignUpSecondStep: {
    data: {
      name: string
      email: string 
      driverLicense: string
    }
  }
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function AppRoutes(){
  return (
    <Navigator initialRouteName='Splash' screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Screen name='Splash' component={Splash} />
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='Confirmation' component={Confirmation} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='MyCars' component={MyCars} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
    </Navigator>
  )
}