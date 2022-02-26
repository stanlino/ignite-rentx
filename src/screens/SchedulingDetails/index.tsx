import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { Alert, StatusBar } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { format } from 'date-fns'

import { getPlatformDate } from '../../utils/getPlatformDate'

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
import { api } from '../../services/api'


type SchedulingDetailsProps = StackScreenProps<RootStackParamList, 'SchedulingDetails'>

export function SchedulingDetails({ navigation, route } : SchedulingDetailsProps){

  const [loading, setLoading] = useState(false)

  const { colors } = useTheme()

  const { navigate, goBack } = navigation
  const { params: { car, dates } } = route

  const startDate = format(getPlatformDate(new Date(dates[0])), 'dd-MM-yyyy')
  const endDate = format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd-MM-yyyy')

  async function handleConfirmRental() {

    setLoading(true)

    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates
      ]

      await api.post('schedules_byuser', {
        user_id: 2,
        car,
        startDate,
        endDate
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      navigate('Confirmation', {
        nextScreenName: 'Home',
        title: 'Carro alugado!',
        message: 'Agora você só precisa ir \naté a concessionária da RENTX \npegar seu automóvel.'
      })
      
    } catch (error) {
      Alert.alert('Ops', 'Erro ao confirmar agendamento')
      setLoading(false)
    }

  }

  return (
    <Container>
      <Header>
        <StatusBar backgroundColor={colors.background_secondary} barStyle={'dark-content'} />
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
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </Rent>
        </Details>

        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryItem(accessory.type)}
              />
            ))
          }
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
            <DateValue>{startDate}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(18)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{endDate}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${car.price * dates.length}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button 
          loading={loading} 
          enabled={!loading}
          color={colors.success} 
          title='Alugar agora' 
          onPress={handleConfirmRental} 
        />
      </Footer>

    </Container>
  )
}