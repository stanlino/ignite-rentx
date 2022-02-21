import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'

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
  Content,
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

  function handleNavigateToSheduling() {
    navigate('Sheduling', { car })
  }

  return (
    <Container>
      <Header>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.background_secondary} /> 
        <BackButton onPress={() => goBack()} />
      </Header>
      
      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
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

      </Content>

      <Footer>
        <Button title='Escolha o período do aluguel' onPress={handleNavigateToSheduling} />
      </Footer>

    </Container>
  )
}