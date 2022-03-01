import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'
import Animated, { 
  Extrapolate, 
  interpolate, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue 
} from 'react-native-reanimated'
import { useNetInfo } from '@react-native-community/netinfo'

import { RootStackParamList } from '../../routes/app.stack.routes'
import { CarDTO } from '../../dtos/carDto'
import { api } from '../../services/api'

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
  Footer,
  OfflineInfo
} from './styles'

type CarDetailsProps = StackScreenProps<RootStackParamList, 'CarDetails'>

export function CarDetails({ navigation, route } : CarDetailsProps){

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

  const { navigate, goBack } = navigation
  const { params: { car } } = route

  const { colors } = useTheme()
  const { isConnected } = useNetInfo()

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
    navigate('Scheduling', { car: carUpdated })
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`)
      setCarUpdated(response.data)
    }

    if (isConnected) {
      fetchCarUpdated()
    }
  },[isConnected])

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
              imagesUrl={
                !!carUpdated.photos ? 
                carUpdated.photos : [{ id: car.id, photo: car.thumbnail }]
              }
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
            <Period>{car.period}</Period>
            <Price>{`R$ ${isConnected ? car.price : '...'}`}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            carUpdated.accessories ?
              carUpdated.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryItem(accessory.type)}
                />
              ))
            : null
          }
        </Accessories>

        <About>
          {car.about}
        </About>

      </Animated.ScrollView>

      <Footer>

        <Button 
          title='Escolha o período do aluguel' 
          onPress={handleNavigateToSheduling} 
          enabled={isConnected === true}
        />

        {
          isConnected === false &&
          <OfflineInfo>
            Conecte-se a Internet para visualizar mais detalhes
            e agendar seu carro
          </OfflineInfo>
        }

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