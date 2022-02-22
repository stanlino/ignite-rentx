import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'

import { RootStackParamList } from '../../routes/app.routes'

import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import { api } from '../../services/api'
import { CarDTO } from '../../dtos/carDto'

import {
  CardList,
  Container, 
  Header, 
  TotalCars,
} from './styles'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation } : HomeScreenProps){

  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[])

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0) 
    }
  })

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const { navigate } = navigation
  const { colors } = useTheme()

  function handleNavigateToCarDetails(car: CarDTO) {
    navigate('CarDetails', { car })
  }

  function handleNavigateToMyCars() {
    navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCars()
 
  },[])

  return (
    <Container>
      <StatusBar 
        backgroundColor={colors.header} 
        barStyle={'light-content'}
        translucent={false}
      />
      <Header>
        <LogoSvg width={RFValue(108)} height={RFValue(12)} />
        {cars.length > 0 && <TotalCars>Total de {cars.length} carros</TotalCars>}
      </Header>

      <CardList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />
        }
        ListEmptyComponent={() => <Load />}
      />

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 22,
              right: 22
            }
          ]}
        >
          <ButtonAnimated 
            onPress={handleNavigateToMyCars}
            style={[styles.button, { backgroundColor: colors.main }]}
          >
            <Ionicons name='ios-car-sport' size={32} color={colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>

    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})