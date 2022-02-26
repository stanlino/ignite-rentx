import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '../screens/Home'
import { MyCars } from '../screens/MyCars'

import HomeSvg from '../assets/home.svg'
import CarSvg from '../assets/car.svg'
import People from '../assets/people.svg'
import { useTheme } from 'styled-components';

export type RootBottomTabsParamList = {
  Home: undefined
  Profile: undefined
  MyCars: undefined
};

const { Navigator, Screen } = createBottomTabNavigator<RootBottomTabsParamList>()

export function AppTabRoutes(){

  const { colors } = useTheme()

  return (
    <Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: colors.background_primary
        }
      }}
    >
      <Screen 
        name='Home' 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg 
              width={24}
              height={24}
              fill={color}
            />
          ),
        }}
      />
      <Screen 
        name='MyCars' 
        component={MyCars} 
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg 
              width={24}
              height={24}
              fill={color}
            />
          )
        }}
      />
      <Screen 
        name='Profile' 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => (
            <People 
              width={24}
              height={24}
              fill={color}
            />
          )
        }}
      />
    </Navigator>
  )
}