import React from 'react'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import SpeedSvg from '../../assets/speed.svg'
import AcelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

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
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles'

export function ShedulingDetails(){

  const { colors } = useTheme()

  const { navigate, goBack } = useNavigation<any>()

  function handleNavigateToShedulingComplete() {
    navigate('ShedulingComplete')
  }

  return (
    <Container>
      <Header>
        <StatusBar backgroundColor={colors.background_secondary} barStyle={'dark-content'} />
        <BackButton onPress={() => goBack()} />
      </Header>
      
      <CarImages>
        <ImageSlider 
          imagesUrl={['http://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborguini</Brand>
            <Name>Buracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory 
            name="380km/h"
            icon={SpeedSvg}
          />
          <Accessory 
            name="3.2s"
            icon={AcelerationSvg}
          />
          <Accessory 
            name="800 HP"
            icon={ForceSvg}
          />
          <Accessory 
            name="Consumo"
            icon={GasolineSvg}
          />
          <Accessory 
            name="Auto"
            icon={ExchangeSvg}
          />
          <Accessory 
            name="2 pessoas"
            icon={PeopleSvg}
          />
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>18/06/2021 </DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(18)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>18/06/2021 </DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button color={colors.success} title='Alugar agora' onPress={handleNavigateToShedulingComplete} />
      </Footer>

    </Container>
  )
}