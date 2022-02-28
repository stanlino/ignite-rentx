import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Confirmation } from '../screens/Confirmation'
import { SignIn } from '../screens/SignIn'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'

export type RootStackAuthParamList = {
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

const { Navigator, Screen } = createStackNavigator<RootStackAuthParamList>()

export function AuthRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='Confirmation' component={Confirmation} />
    </Navigator>
  )
}