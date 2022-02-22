import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from '../../routes/app.routes'

import LogoSvg from '../../assets/splash_logo.svg'
import Svg from './svg'

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'

import {
  Container
} from './styles'
import { StackActions } from '@react-navigation/native'


type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>

export function Splash({ navigation } : SplashScreenProps){

  const { colors } = useTheme()

  const splashAnimation = useSharedValue(0)

  const brandSvgStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(splashAnimation.value, 
        [0, 50], 
        [80, 65],
        Extrapolate.CLAMP
      ),
      width: interpolate(splashAnimation.value, 
        [0, 50], 
        [50, 33],
        Extrapolate.CLAMP
      ),
      transform: [{ translateX: interpolate(splashAnimation.value, 
        [0, 50], 
        [0, 75],
        Extrapolate.CLAMP
      )}]
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, 
        [0, 25, 50], 
        [0, .3, 1],
        Extrapolate.CLAMP
      ),
      transform: [{ translateX: interpolate(splashAnimation.value, 
        [0, 50], 
        [100, 0],
        Extrapolate.CLAMP
      )}]
    }
  })

  const AnimatedBrandSvg = Animated.createAnimatedComponent(Svg)

  function navigateToApp() {
    navigation.dispatch(
      StackActions.replace('Home')
    )
  }

  useEffect(() => {

    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet'
      runOnJS(navigateToApp)()
    })

  },[])

  return (
    <Container>
      
      <StatusBar translucent backgroundColor={colors.header} />

      <AnimatedBrandSvg style={[brandSvgStyle, { position: 'absolute' }]} />

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg 
          width={180}
          height={20}
        />
      </Animated.View>

    </Container>
  )
}

