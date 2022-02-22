import React from 'react'

import LottieView from 'lottie-react-native'
import LoadingCar from '../../assets/load_animated.json'

import {
  Container
} from './styles'

export function LoadAnimation(){
  return (
    <Container>
        <LottieView 
            source={LoadingCar}
            autoPlay
            style={{
                height: 200
            }}
            resizeMode="contain"
            loop
        />
    </Container>
  )
}