import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { RootStackParamList } from '../../routes/app.routes'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import { getAccessoryItem } from '../../utils/getAccessoryItem'

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles'

type CarDetailsProps = StackScreenProps<RootStackParamList, 'CarDetails'>

export function CarDetails({ navigation, route } : CarDetailsProps){

  const { navigate, goBack } = navigation
  const { params: { car } } = route

  const { colors } = useTheme()

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleNavigateToSheduling() {
    navigate('Scheduling', { car })
  }

  return (
    <Container>
      <Animated.View style={[
        headerStyleAnimation, 
        styles.header,
        {backgroundColor: colors.background_secondary}
      ]}>
        <Header>
          <StatusBar barStyle={'dark-content'} backgroundColor={colors.background_secondary} /> 
          <BackButton onPress={() => goBack()} />
        </Header>
        
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider 
              imagesUrl={car.photos}
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ 
          paddingHorizontal: 24, 
          paddingTop: 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryItem(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>

      </Animated.ScrollView>

      <Footer>
        <Button title='Escolha o período do aluguel' onPress={handleNavigateToSheduling} />
      </Footer>

    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
  back: {
    marginTop: 24,
  }
})