import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Confirmation } from '../screens/Confirmation'
import { Splash } from '../screens/Splash'
import { SignIn } from '../screens/SignIn'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'

export type RootStackParamList = {
  Splash: undefined
  Confirmation: {
    title: string
    message: string
    nextScreenName: 'SignIn' | 'AppTabRoutes'
  }
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

export function AuthRoutes(){
  return (
    <Navigator initialRouteName='Splash' screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Screen name='Splash' component={Splash} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='Confirmation' component={Confirmation} />
    </Navigator>
  )
}